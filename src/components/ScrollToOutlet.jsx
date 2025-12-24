import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

export default function ScrollToOutlet() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    if (navigationType !== "PUSH") return;

    requestAnimationFrame(() => {
      const outlet = document.getElementById("route-outlet");

      if (outlet) {
        outlet.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [pathname, navigationType]);

  return null;
}
