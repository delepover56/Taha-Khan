import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToOutlet() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth >= 1024) return;

    requestAnimationFrame(() => {
      const outlet = document.getElementById("route-outlet");

      if (outlet) {
        outlet.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [pathname]);

  return null;
}
