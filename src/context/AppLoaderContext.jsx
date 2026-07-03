import { useCallback, useEffect, useMemo, useState } from "react";
import projectsData from "@/data/projectsData.json";
import sideInfoBox from "@/data/sideInfoBox.json";
import { AppLoaderContext } from "@/context/loaderContext";

const CRITICAL_ASSET_TIMEOUT_MS = 600;

const getCriticalImageSources = () =>
  Array.from(new Set(["/favicon.png", sideInfoBox.profile.avatarSrc].filter(Boolean)));

const waitForImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;

    if (image.decode) {
      image.decode().then(resolve).catch(resolve);
    }
  });

const waitForCriticalAssets = () =>
  Promise.all(getCriticalImageSources().map(waitForImage));

const withTimeout = (promise, timeoutMs) =>
  Promise.race([
    promise,
    new Promise((resolve) => {
      window.setTimeout(resolve, timeoutMs);
    }),
  ]);

export const AppLoaderProvider = ({ children }) => {
  const [projects] = useState(projectsData);
  const [projectsStatus] = useState("success");
  const [isRouteReady, setIsRouteReady] = useState(false);
  const [areAssetsReady, setAreAssetsReady] = useState(false);
  const isPreloaderVisible = !isRouteReady || !areAssetsReady;
  const markRouteReady = useCallback(() => {
    setIsRouteReady(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    withTimeout(
      waitForCriticalAssets(),
      CRITICAL_ASSET_TIMEOUT_MS
    ).then(() => {
      if (isMounted) setAreAssetsReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      isPreloaderVisible,
      markRouteReady,
      projects,
      projectsStatus,
    }),
    [isPreloaderVisible, markRouteReady, projects, projectsStatus]
  );

  return (
    <AppLoaderContext.Provider value={value}>
      {children}
    </AppLoaderContext.Provider>
  );
};
