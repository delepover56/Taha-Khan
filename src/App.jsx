import { Outlet, useLocation } from "react-router";
import Background from "@/components/background";
import MobileHeader from "@/components/layout/mobileHeader.jsx";
import MyInfo from "@/components/layout/MyInfo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToOutlet from "@/components/ScrollToOutlet";
import AppPreloader from "@/components/AppPreloader";
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
      <Background />
      <AppPreloader />
      <ScrollToOutlet />
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center pb-12 pt-4 xxs:pt-5 xs:pt-6 lg:pt-8 xl:pt-10">
        <div className="w-full max-w-[1320px] px-4 xs:px-5 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
          <Header />
          <MobileHeader />
        </div>

        <div className="relative z-10 mt-6 w-full max-w-[1320px] px-4 xs:px-5 sm:px-6 lg:mt-8 lg:px-8 2xl:max-w-[1600px]">
          <div className="flex min-w-0 flex-col gap-2 md:gap-8 lg:flex-row lg:items-start">
            <div className="min-w-0 w-full lg:w-[352px] lg:shrink-0 lg:self-stretch xl:w-[380px] 2xl:w-[420px]">
              <MyInfo />
            </div>
            <div id="route-outlet" className="min-w-0 w-full lg:flex-1">
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
        </div>

        <Footer />
      </main>
    </>
  );
}

export default App;
