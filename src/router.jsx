import { createBrowserRouter } from "react-router";
import App from "@/App";
import About from "@/pages/About";
import Resume from "@/pages/Resume";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <About /> },
      { path: "/resume", element: <Resume /> },
      { path: "/projects", element: <Projects /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
