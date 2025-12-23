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
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center pb-16 pt-6">
        <div className="w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <Header />
          <MobileHeader />
        </div>

        <div className="relative z-10 mt-8 w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:items-start">
            <MyInfo />
            <div id="route-outlet" className="w-full">
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
