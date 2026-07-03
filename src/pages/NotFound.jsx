import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import Background from "@/components/background";
import RouteSEO from "@/components/RouteSEO";
import { GradientText, SpotlightCard, StarBorder } from "@/components/reactbits";
import { fadeUp, staggerContainer, staggerItem } from "@/animations/motionPresets";

const NotFound = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const containerVariants = staggerContainer(shouldReduceMotion, 0.04, 0.08);
  const itemVariants = staggerItem(shouldReduceMotion);
  const initialState = shouldReduceMotion ? "show" : "hidden";

  const handleHomeClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    navigate("/", { replace: true });
  };

  return (
    <>
      <RouteSEO path="/404" />
      <a
        href="#not-found-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-xl focus:border focus:border-[#00ff5e88] focus:bg-[#06180f] focus:px-4 focus:py-3 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00ff5e66]"
      >
        Skip to page content
      </a>
      <Background />
      <main
        id="not-found-content"
        aria-labelledby="not-found-heading"
        className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-10 xs:px-5 sm:px-6"
      >
        <motion.div
          variants={containerVariants}
          initial={initialState}
          animate="show"
          className="w-full max-w-xl"
        >
          <SpotlightCard
            className="border-[#00ff5e36] bg-[#07100bcc] p-6 text-center shadow-[0_22px_56px_rgba(0,0,0,0.58)] backdrop-blur-xl xxs:p-7 sm:p-9"
            spotlightColor="rgba(0, 255, 94, 0.2)"
          >
            <motion.p
              variants={itemVariants}
              className="poppins type-caption uppercase tracking-[0.45em] text-[#7feaa0]"
            >
              404
            </motion.p>

            <motion.h1
              id="not-found-heading"
              variants={fadeUp(shouldReduceMotion)}
              className="merienda mt-3 text-3xl leading-tight text-white xs:text-4xl sm:text-5xl"
            >
              <GradientText>Page Not Found</GradientText>
            </motion.h1>

            <motion.span
              variants={itemVariants}
              className="mx-auto mt-4 block h-[2px] w-20 rounded-full bg-[#00ff5e66]"
            />

            <motion.p
              variants={itemVariants}
              className="poppins type-body mx-auto mt-5 max-w-md leading-relaxed text-[#c7ffd8]"
            >
              This link may be broken, moved, or typed incorrectly. Head back
              home and keep exploring from a clean starting point.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-7 flex justify-center"
            >
              <StarBorder
                href="/"
                onClick={handleHomeClick}
                className="poppins-semibold type-button w-full max-w-[220px] justify-center uppercase tracking-[0.26em] transition-colors duration-200 hover:text-white xs:max-w-none xs:w-auto cursor-pointer"
                contentClassName="w-full px-6 py-3"
              >
                Back Home
              </StarBorder>
            </motion.div>
          </SpotlightCard>
        </motion.div>
      </main>
    </>
  );
};

export default NotFound;
