import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  fadeDown,
  fadeIn,
  hoverGlow,
  slideLeft,
  staggerContainer,
  staggerItem,
} from "@/animations/motionPresets";

const MENU_ITEMS = [
  { to: "/", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const headerVariants = fadeDown(shouldReduceMotion);
  const overlayVariants = fadeIn(shouldReduceMotion);
  const menuVariants = slideLeft(shouldReduceMotion);
  const listVariants = staggerContainer(shouldReduceMotion, 0.05, 0.06);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";

  const menuItems = useMemo(() => MENU_ITEMS, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClick = useCallback(
    (to) => {
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(to);
    },
    [navigate]
  );

  const handleNavItemClick = useCallback(
    (event) => {
      const to = event.currentTarget.getAttribute("data-to");
      if (to) {
        handleClick(to);
      }
    },
    [handleClick]
  );

  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const handleOverlayClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  const activeLabel = useMemo(() => {
    const current = menuItems.find((item) => item.to === location.pathname);
    return current?.label ?? "Menu";
  }, [location.pathname, menuItems]);

  const handleBrandClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  }, [navigate]);

  return (
    <motion.header
      variants={headerVariants}
      initial={initialState}
      animate="show"
      className="sticky top-0 z-[120] w-full lg:hidden"
    >
      <div className="flex items-center justify-between rounded-2xl border border-[#00ff5e26] bg-[#0a120db8] px-4 py-3 backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.45)] xs:px-5 xs:py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBrandClick}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00ff5e33] bg-[#06180f] shadow-[0_0_16px_rgba(0,255,94,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08]"
            aria-label="Go to home"
          >
            <img src="./favicon.png" alt="Logo" className="h-6 w-6" />
          </button>
          <div className="leading-tight">
            <p className="merienda text-lg text-[#00ff5e] xs:text-xl">
              Taha Khan
            </p>
            <p className="poppins text-[9px] uppercase tracking-[0.28em] text-[#9fffbf]">
              {activeLabel}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu-panel"
          onClick={toggleMenu}
          className="flex h-11 w-11 flex-col items-center justify-center rounded-xl border border-[#00ff5e44] bg-[#06180f] transition-all duration-300 hover:border-[#00ff5e] hover:bg-[#00ff5e1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08]"
        >
          <span
            className={[
              "block h-[2px] w-5 rounded-full bg-[#00ff5e] transition-all duration-300",
              isOpen ? "translate-y-[7px] rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[2px] w-5 rounded-full bg-[#00ff5e] transition-all duration-300",
              isOpen ? "opacity-0" : "my-[5px]",
            ].join(" ")}
          />
          <span
            className={[
              "block h-[2px] w-5 rounded-full bg-[#00ff5e] transition-all duration-300",
              isOpen ? "-translate-y-[7px] -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial={initialState}
            animate="show"
            exit="exit"
            onClick={handleOverlayClick}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            variants={menuVariants}
            initial={initialState}
            animate="show"
            exit="exit"
            id="mobile-menu-panel"
            className="fixed right-0 top-0 z-50 flex h-full w-[82vw] max-w-[320px] flex-col border-l border-[#00ff5e26] bg-[#0a110d] px-5 pb-6 pt-[calc(env(safe-area-inset-top)+20px)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="merienda text-xl text-[#00ff5e]">
                  Menu
                </p>
                <p className="poppins text-[10px] uppercase tracking-[0.28em] text-[#9fffbf]">
                  Navigate
                </p>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#00ff5e44] bg-[#06180f] text-xs uppercase tracking-[0.25em] text-[#9fffbf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
                </svg>
              </button>
            </div>

            <motion.nav
              variants={listVariants}
              initial={initialState}
              animate="show"
              className="flex flex-col gap-3"
            >
              {menuItems.map((item) => (
                <motion.div key={item.to} variants={itemVariants} className="w-full">
                  <NavLink
                    to={item.to}
                    data-to={item.to}
                    onClick={handleNavItemClick}
                    className={({ isActive }) =>
                      [
                        "group relative block w-full rounded-xl border px-4 py-3",
                        "text-left text-[11px] uppercase tracking-[0.2em]",
                        "transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08]",
                        "flex items-center justify-between",
                        isActive
                          ? "border-[#00ff5e88] bg-[#00ff5e1a] text-white shadow-[0_0_18px_rgba(0,255,94,0.22)]"
                          : "border-[#00ff5e1f] text-[#9fffbf] hover:border-[#00ff5e55] hover:bg-[#00ff5e12] hover:text-white",
                      ].join(" ")
                    }
                  >
                    {/* Active indicator (ONLY active, not hover) */}
                    <span
                      className={[
                        "absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-[#00ff5e]",
                        "opacity-0 transition-opacity duration-300",
                        location.pathname === item.to ? "opacity-100" : "",
                      ].join(" ")}
                    />

                    <span className="pl-2">{item.label}</span>

                    {/* Optional arrow to make it feel more “premium” */}
                    <span className="text-[#00ff5e66] group-hover:text-[#00ff5e] transition-colors duration-300">
                      ›
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>


            <motion.div
              variants={fadeDown(shouldReduceMotion)}
              className="mt-auto rounded-2xl border border-[#00ff5e26] bg-[#0b120d] p-4 text-center"
            >
              <p className="poppins text-[10px] uppercase tracking-[0.28em] text-[#9fffbf]">
                Open to work
              </p>
              <p className="merienda text-base text-white">
                Lets build something
              </p>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default memo(MobileHeader);
