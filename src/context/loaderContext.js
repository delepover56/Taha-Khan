import { createContext, useContext } from "react";

export const AppLoaderContext = createContext(null);

export const useAppLoader = () => {
  const context = useContext(AppLoaderContext);

  if (!context) {
    throw new Error("useAppLoader must be used within AppLoaderProvider");
  }

  return context;
};
