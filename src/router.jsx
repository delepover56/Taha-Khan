import { Navigate, createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
import App from "@/App";

const About = lazy(() => import("@/pages/About"));
const Resume = lazy(() => import("@/pages/Resume"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const withFallback = (element) => <Suspense fallback={null}>{element}</Suspense>;

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: withFallback(<About />) },
      {
        path: "/resume",
        element: withFallback(<Resume />),
      },
      {
        path: "/portfolio",
        element: withFallback(<Portfolio />),
      },
      {
        path: "/projects",
        element: <Navigate to="/portfolio" replace />,
      },
      {
        path: "/contact",
        element: withFallback(<Contact />),
      },
    ],
  },
  {
    path: "*",
    element: withFallback(<NotFound />),
  },
]);
