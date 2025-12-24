import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
import App from "@/App";

const About = lazy(() => import("@/pages/About"));
const Resume = lazy(() => import("@/pages/Resume"));
const Projects = lazy(() => import("@/pages/Projects"));
const Contact = lazy(() => import("@/pages/Contact"));

const withFallback = (element) => (
  <Suspense fallback={null}>{element}</Suspense>
);

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: withFallback(<About />) },
      { path: "/resume", element: withFallback(<Resume />) },
      { path: "/projects", element: withFallback(<Projects />) },
      { path: "/contact", element: withFallback(<Contact />) },
    ],
  },
]);
