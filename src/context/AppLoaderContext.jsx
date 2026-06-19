import { useCallback, useEffect, useMemo, useState } from "react";
import projectsData from "@/data/projectsData.json";
import sideInfoBox from "@/data/sideInfoBox.json";
import { AppLoaderContext } from "@/context/loaderContext";

const getImageSources = () =>
  Array.from(
    new Set([
      "/favicon.svg",
      sideInfoBox.profile.avatarSrc,
      ...projectsData.flatMap((project) => [
        project.image,
        ...(Array.isArray(project.tech) ? project.tech : []),
      ]),
    ].filter(Boolean))
  );

const waitForWindowLoad = () => {
  if (typeof window === "undefined") return Promise.resolve();
  if (document.readyState === "complete") return Promise.resolve();

  return new Promise((resolve) => {
    window.addEventListener("load", resolve, { once: true });
  });
};

const waitForFonts = () => {
  if (typeof document === "undefined" || !document.fonts?.ready) {
    return Promise.resolve();
  }

  return document.fonts.ready.catch(() => undefined);
};

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

const waitForPortfolioAssets = () =>
  Promise.all(getImageSources().map(waitForImage));

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

    Promise.all([
      waitForWindowLoad(),
      waitForFonts(),
      waitForPortfolioAssets(),
    ]).then(() => {
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
