import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Loader from "./components/ui/StartAnimation";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Error from "./pages/Error";

// import Clarity from "@microsoft/clarity";

// const projectId = "q09r24hzf3";
// Clarity.init(projectId);

const RemoveTrailingSlash = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname.endsWith("/")) {
      navigate(location.pathname.slice(0, -1), { replace: true });
    }
  }, [location, navigate]);

  return null; // This component doesn't render anything
};

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center w-screen items-center font-montserrat-bold bg-[#101010] text-white h-[calc(100vh-30px)]">
          <Loader />
        </div>
      ) : (
        <Router>
          <ScrollToTop />
          <RemoveTrailingSlash />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
