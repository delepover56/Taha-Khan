import { Outlet, useLocation } from "react-router";
import Background from "@/components/background";
import MobileHeader from "@/components/layout/mobileHeader.jsx";
import MyInfo from "@/components/layout/MyInfo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToOutlet from "@/components/ScrollToOutlet";
import AppPreloader from "@/components/AppPreloader";
import RouteSEO from "@/components/RouteSEO";
import { useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { fadeUp, transitionSlow } from "@/animations/motionPresets";

function App() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const pageVariants = useMemo(
    () => fadeUp(shouldReduceMotion, transitionSlow),
    [shouldReduceMotion]
  );
  const initialState = shouldReduceMotion ? "show" : "hidden";

  return (
    <>
      <RouteSEO />
      <a
        href="#route-outlet"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-xl focus:border focus:border-[#00ff5e88] focus:bg-[#06180f] focus:px-4 focus:py-3 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-[#00ff5e66]"
      >
        Skip to main content
      </a>
      <Background />
      <AppPreloader />
      <ScrollToOutlet />
      <div
        className="relative z-10 flex min-h-screen w-full flex-col items-center pb-12 pt-4 xxs:pt-5 xs:pt-6 lg:pt-8 xl:pt-10"
      >
        <div className="w-full max-w-[1320px] px-4 xs:px-5 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
          <Header />
          <MobileHeader />
        </div>

        <main
          id="main-content"
          className="relative z-10 mt-6 w-full max-w-[1320px] px-4 xs:px-5 sm:px-6 lg:mt-8 lg:px-8 2xl:max-w-[1600px]"
        >
          <div className="flex min-w-0 flex-col gap-6 md:gap-8 lg:flex-row lg:items-start">
            <div className="min-w-0 w-full lg:w-[352px] lg:shrink-0 lg:self-stretch xl:w-[380px] 2xl:w-[420px]">
              <MyInfo />
            </div>
            <div
              id="route-outlet"
              tabIndex={-1}
              className="min-w-0 w-full scroll-mt-28 focus:outline-none lg:flex-1"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={location.pathname}
                  variants={pageVariants}
                  initial={initialState}
                  animate="show"
                  exit="exit"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
