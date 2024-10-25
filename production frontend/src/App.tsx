import { Route, Routes, useLocation } from "react-router-dom";
import { AppKitProvider } from "./AppKitProvider";
//import Header from "./components/global/Header";
//import Mint from "./pages/Mint";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { AppProvider } from "./utilities/contexts/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
  };

  ScrollToTop();

  AOS.init({
    disable: false,
    startEvent: "DOMContentLoaded",
    initClassName: "aos-init",
    animatedClassName: "aos-animate",
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    offset: 120,
    delay: 0,
    duration: 2500,
    easing: "ease",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  });
  useEffect(() => {
    AOS.init({ mirror: true });
  }, []);

  return (
    <AppKitProvider>
      <AppProvider>
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Intro />} />
            {/*<Route path="/dapp" element={<><Header /><Mint /></>}/>*/}
            <Route path="/home" element={<Home />} />
          </Routes>
          {/* <AudioPlayer /> */}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
        />
      </AppProvider>
    </AppKitProvider>
  );
}

export default App;
