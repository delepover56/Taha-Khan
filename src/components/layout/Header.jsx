import { memo, useCallback } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  fadeDown,
  hoverGlow,
  staggerContainer,
  staggerItem,
} from "@/animations/motionPresets";

const MENU_ITEMS = [
  { to: "/", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const headerVariants = fadeDown(shouldReduceMotion);
  const listVariants = staggerContainer(shouldReduceMotion, 0.05, 0.06);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";

  const handleClick = useCallback((event, to) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(to);
  }, [navigate]);

  return (
    <motion.header
      variants={headerVariants}
      initial={initialState}
      animate="show"
      className="sticky top-0 z-[100] hidden w-full items-center justify-between rounded-2xl border border-[#00ff5e26] bg-[#0a120db8] px-5 py-3 backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.45)] lg:flex xl:px-6 xl:py-4"
    >
      <NavLink
        to="/"
        onClick={(event) => handleClick(event, "/")}
        className="group flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08]"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl shadow-[0_0_14px_rgba(0,255,94,0.18)] transition-all duration-300 group-hover:shadow-[0_0_22px_rgba(0,255,94,0.35)] group-hover:border-[#00ff5e88]">
          <img src="./favicon.png" alt="Logo" className="h-full w-full" />
        </div>

        <div className="leading-tight">
          <p className="merienda text-xl text-[#00ff5e] transition-colors duration-200 group-hover:text-white xl:text-2xl">
            Taha Khan
          </p>
        </div>
      </NavLink>


      <nav>
        <motion.ul
          variants={listVariants}
          initial={initialState}
          animate="show"
          className="flex items-center gap-4"
        >
          {MENU_ITEMS.map((item) => (
            <motion.li
              key={item.to}
              variants={itemVariants}

              className="flex"
            >
              <NavLink
                to={item.to}
                onClick={(event) => handleClick(event, item.to)}
                className={({ isActive }) =>
                  [
                    "rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff5e66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a08] xl:px-5 xl:py-2.5 xl:text-[11px]",
                    isActive
                      ? "border-[#00ff5e88] bg-[#00ff5e1a] text-white shadow-[0_0_18px_rgba(0,255,94,0.25)]"
                      : "border-transparent text-[#9fffbf] hover:border-[#00ff5e55] hover:bg-[#00ff5e12] hover:text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      <motion.div
        variants={fadeDown(shouldReduceMotion)}
        className="flex items-center gap-2 rounded-full border border-[#00ff5e2e] bg-[#07180f] px-4 py-2"
      >
        <span className="h-2 w-2 rounded-full bg-[#00ff5e] shadow-[0_0_8px_rgba(0,255,94,0.6)] animate-[glowPulse_2.8s_ease-in-out_infinite]" />
        <span className="poppins text-[10px] uppercase tracking-[0.26em] text-[#9fffbf] xl:text-[11px]">
          Open to work
        </span>
      </motion.div>
    </motion.header>
  );
};

export default memo(Header);
