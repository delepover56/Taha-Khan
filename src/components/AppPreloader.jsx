import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { GradientText } from "@/components/reactbits";
import { useAppLoader } from "@/context/loaderContext";

const AppPreloader = () => {
  const { isPreloaderVisible } = useAppLoader();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isPreloaderVisible && (
        <motion.div
          key="app-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050a08] px-5"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,94,0.13),_transparent_48%),linear-gradient(180deg,_rgba(0,255,94,0.06),_rgba(5,10,8,0)_42%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#00ff5e88] to-transparent"
          />

          <motion.div
            initial={shouldReduceMotion ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
            className="relative z-10 w-full max-w-sm rounded-3xl border border-[#00ff5e38] bg-[#07100bcc] p-6 text-center shadow-[0_22px_54px_rgba(0,0,0,0.62),0_0_36px_rgba(0,255,94,0.08)] backdrop-blur-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center xs:h-16 xs:w-16 sm:h-[68px] sm:w-[68px]">
              <img
                src="/favicon.svg"
                alt="Taha Khan site logo"
                className="h-full w-full object-contain"
              />
            </div>

            <h2 className="merienda type-h3 mt-5 text-white">
              <GradientText>Taha Khan</GradientText> Portfolio
            </h2>
            <p className="poppins type-body-sm mt-3 text-[#c7ffd8]">
              <span>Loading</span>
              <span aria-hidden="true" className="inline-flex w-5 justify-start text-[#00ff5e]">
                <span>.</span>
                <span className="animate-[loadingDotTwo_1.2s_steps(1,end)_infinite]">.</span>
                <span className="animate-[loadingDotThree_1.2s_steps(1,end)_infinite]">.</span>
              </span>
              <span className="sr-only">Loading portfolio assets</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppPreloader;
