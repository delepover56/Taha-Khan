// src/App.jsx
import { Outlet } from "react-router"; // v7
import Background from "@/components/background";
import MobileHeader from "@/components/layout/mobileHeader.jsx";
import MyInfo from "@/components/layout/MyInfo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToOutlet from "@/components/ScrollToOutlet";


function App() {
  return (
    <>
      <Background />
      <ScrollToOutlet />
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center pb-12 pt-4 xxs:pt-5 xs:pt-6 lg:pt-8 xl:pt-10">
        <div className="w-full max-w-[1320px] px-4 xs:px-5 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
          <Header />
          <MobileHeader />
        </div>

        <div className="relative z-10 mt-6 w-full max-w-[1320px] px-4 xs:px-5 sm:px-6 lg:mt-8 lg:px-8 2xl:max-w-[1600px]">
          <div className="grid min-w-0 grid-cols-1 gap-2 md:gap-8 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] 2xl:grid-cols-[400px_1fr] lg:items-start">
            <MyInfo />
            <div id="route-outlet" className="min-w-0 w-full">
              <Outlet />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

export default App;
