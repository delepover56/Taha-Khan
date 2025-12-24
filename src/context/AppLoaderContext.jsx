import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import fallbackProjects from "@/components/MyProjects";

const AppLoaderContext = createContext(null);

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
  const shouldShowPreloaderRef = useRef(getInitialPreloaderState());
  const appMountedRef = useRef(false);
  const appMountedPromiseRef = useRef(null);
  const appMountedResolverRef = useRef(null);
  const [isInitialLoading, setIsInitialLoading] = useState(
    shouldShowPreloaderRef.current
  );
  const [shouldRenderPreloader, setShouldRenderPreloader] = useState(
    shouldShowPreloaderRef.current
  );

  if (!appMountedPromiseRef.current) {
    appMountedPromiseRef.current = new Promise((resolve) => {
      appMountedResolverRef.current = resolve;
    });
  }

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
    const shouldShowPreloader = shouldShowPreloaderRef.current;

    const loadProjects = async () => {
      setProjectsStatus("loading");
      try {
        const response = await fetch("/data/projects.json", {
          cache: "force-cache",
        });
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }
        const data = await response.json();
        if (isMounted) {
          setProjects(data);
          setProjectsStatus("success");
        }
        return data;
      } catch (error) {
        if (isMounted) {
          setProjects(fallbackProjects);
          setProjectsStatus("error");
        }
        return fallbackProjects;
      }
    };

    const bootstrap = async () => {
      const fontsPromise = preloadFonts();
      const projectData = await loadProjects();
      const imageSources = [
        "/Images/myAvatar.webp",
        ...projectData.map((project) => project.image),
      ];

      await Promise.all([
        fontsPromise,
        preloadImages(imageSources),
        appMountedPromiseRef.current,
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
  }, []);

  const dismissPreloader = () => {
    setShouldRenderPreloader(false);
  };

  const markAppMounted = useCallback(() => {
    if (appMountedRef.current) return;
    appMountedRef.current = true;
    if (appMountedResolverRef.current) {
      appMountedResolverRef.current();
    }
  }, []);

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

export const useAppLoader = () => {
  const context = useContext(AppLoaderContext);
  if (!context) {
    throw new Error("useAppLoader must be used within AppLoaderProvider");
  }
  return context;
};
