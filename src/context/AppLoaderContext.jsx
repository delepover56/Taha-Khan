import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import fallbackProjects from "@/components/MyProjects";
import { AppLoaderContext } from "@/context/loaderContext";

const PRELOADER_KEY = "portfolio-preloader-ready";

const preloadFonts = () => {
  if (document.fonts && document.fonts.ready) {
    return document.fonts.ready;
  }
  return Promise.resolve();
};

const preloadImage = (src) =>
  new Promise((resolve) => {
    if (!src) {
      resolve();
      return;
    }
    const img = new Image();
    img.src = src;
    if (img.decode) {
      img.decode().then(resolve).catch(resolve);
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    }
  });

const preloadImages = async (sources) => {
  const uniqueSources = Array.from(new Set(sources.filter(Boolean)));
  await Promise.all(uniqueSources.map(preloadImage));
};

const getInitialPreloaderState = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(PRELOADER_KEY) !== "true";
};

export const AppLoaderProvider = ({ children }) => {
  const [projects, setProjects] = useState(fallbackProjects);
  const [projectsStatus, setProjectsStatus] = useState("success");
  const [shouldShowPreloader] = useState(getInitialPreloaderState);
  const appMountedRef = useRef(false);
  const [{ appMountedPromise, resolveAppMounted }] = useState(() => {
    let resolver = () => {};
    const promise = new Promise((resolve) => {
      resolver = resolve;
    });

    return {
      appMountedPromise: promise,
      resolveAppMounted: resolver,
    };
  });
  const [isInitialLoading, setIsInitialLoading] = useState(shouldShowPreloader);
  const [shouldRenderPreloader, setShouldRenderPreloader] =
    useState(shouldShowPreloader);

  useEffect(() => {
    const handlePageHide = () => {
      sessionStorage.removeItem(PRELOADER_KEY);
    };

    window.addEventListener("beforeunload", handlePageHide);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("beforeunload", handlePageHide);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      const fontsPromise = preloadFonts();
      if (isMounted) {
        setProjects(fallbackProjects);
        setProjectsStatus("success");
      }
      const imageSources = [
        "/Images/myAvatar.webp",
        ...fallbackProjects.map((project) => project.image),
      ];

      await Promise.all([
        fontsPromise,
        preloadImages(imageSources),
        appMountedPromise,
      ]);

      if (!isMounted) return;

      if (shouldShowPreloader) {
        setIsInitialLoading(false);
        sessionStorage.setItem(PRELOADER_KEY, "true");
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [appMountedPromise, shouldShowPreloader]);

  const dismissPreloader = () => {
    setShouldRenderPreloader(false);
  };

  const markAppMounted = useCallback(() => {
    if (appMountedRef.current) return;
    appMountedRef.current = true;
    resolveAppMounted();
  }, [resolveAppMounted]);

  const value = useMemo(
    () => ({
      isInitialLoading,
      shouldRenderPreloader,
      dismissPreloader,
      markAppMounted,
      projects,
      projectsStatus,
    }),
    [
      isInitialLoading,
      shouldRenderPreloader,
      projects,
      projectsStatus,
      markAppMounted,
    ]
  );

  return (
    <AppLoaderContext.Provider value={value}>
      {children}
    </AppLoaderContext.Provider>
  );
};
