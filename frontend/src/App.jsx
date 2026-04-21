import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import JobList     from "./pages/JobList";
import JobDetail   from "./pages/JobDetail";
import AddCompanyPage from "./pages/AddCompanyPage";
import AddJobPage  from "./pages/AddJobPage";
import ApplyPage   from "./pages/ApplyPage";
import Header      from "./comp/Header";
import Login       from "./pages/Login";
import Register    from "./pages/Register";
import Job         from "./pages/Job";
import Company     from "./pages/Company";
import MyApplications from "./pages/MyApplications";
import JobAbout    from "./comp/JobAbout";
import Footer      from "./comp/Footer";
import Message     from "./comp/Message";
import Loader      from "./comp/Loader";
import SavedJob    from "./pages/SavedJobs";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function AnimatedRoutes({ onLogout }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"            element={<motion.div {...pageVariants}><JobList /><JobAbout /></motion.div>} />
        <Route path="/jobs/:id"    element={<motion.div {...pageVariants}><JobDetail /></motion.div>} />
        <Route path="/add-company" element={<motion.div {...pageVariants}><AddCompanyPage /></motion.div>} />
        <Route path="/add-job"     element={<motion.div {...pageVariants}><AddJobPage /></motion.div>} />
        <Route path="/jobs"        element={<motion.div {...pageVariants}><Job /></motion.div>} />
        <Route path="/companies"   element={<motion.div {...pageVariants}><Company /></motion.div>} />
        <Route path="/applications" element={<motion.div {...pageVariants}><MyApplications /></motion.div>} />
        <Route path="/jobs/:id/apply" element={<motion.div {...pageVariants}><ApplyPage /></motion.div>} />
        <Route path="/saved"       element={<motion.div {...pageVariants}><SavedJob /></motion.div>} />
        <Route path="/login"       element={<motion.div {...pageVariants}><Login /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading]   = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoggedIn(!!localStorage.getItem("access"));
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Router>
      <Message />

      {!isLoggedIn ? (
        <div className="main-container">
          <div className="auth-container">
            <AnimatePresence mode="wait">
              {isRegistering ? (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Register onRegister={() => setIsRegistering(false)} />
                  <p className="auth-switch">
                    Already have an account?{" "}
                    <button onClick={() => setIsRegistering(false)}>Sign In</button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Login onLogin={() => setIsLoggedIn(true)} />
                  <p className="auth-switch">
                    Don't have an account?{" "}
                    <button onClick={() => setIsRegistering(true)}>Create one</button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <>
          <Header onToggleTheme={toggleTheme} currentTheme={theme} />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;