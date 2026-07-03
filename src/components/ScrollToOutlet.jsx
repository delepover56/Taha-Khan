import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";
import { useReducedMotion } from "motion/react";

export default function ScrollToOutlet() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    if (navigationType !== "PUSH") return;

    requestAnimationFrame(() => {
      const outlet = document.getElementById("route-outlet");

      if (outlet) {
        outlet.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  }, [pathname, navigationType, shouldReduceMotion]);

  return null;
}
