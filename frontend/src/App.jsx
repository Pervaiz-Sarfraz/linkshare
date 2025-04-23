import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import AddCompanyPage from "./pages/AddCompanyPage";
import AddJobPage from "./pages/AddJobPage";
import ApplyPage from "./pages/ApplyPage";
import Search from "./comp/Search";
import Header from "./comp/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Job from "./pages/Job";
import Company from "./pages/Company";
import MyApplications from "./pages/MyApplications";
import JobAbout from "./comp/JobAbout";
import Footer from "./comp/Footer";
import Message from './comp/Message';
import Loader from "./comp/Loader";
import SavedJob from "./pages/SavedJobs";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const hasToken = !!localStorage.getItem("access");
      setIsLoggedIn(hasToken);
      setIsLoading(false);

    };

    const timer = setTimeout(checkAuthStatus, 1000);
    
    return () => clearTimeout(timer);
  }, []); 

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <Message />
      {!isLoggedIn ? (
        <div className="main-container">
          <div className="auth-container">
            {isRegistering ? (
              <>
                <Register onRegister={() => setIsRegistering(false)} />
                <p>
                  Already have an account?{" "}
                  <button onClick={() => setIsRegistering(false)}>Login</button>
                </p>
              </>
            ) : (
              <>
                <Login onLogin={() => setIsLoggedIn(true)} />
                <p>
                  Don't have an account?{" "}
                  <button onClick={() => setIsRegistering(true)}>Register</button>
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div className="main-content">
          <Routes>
            <Route path="/" element={<><JobList /><JobAbout /></>} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/add-company" element={<AddCompanyPage />} />
            <Route path="/add-job" element={<AddJobPage />} />
            <Route path="/jobs" element={<Job />} />
            <Route path="/companies" element={<Company />} />
            <Route path="/applications" element={<MyApplications />} />
            <Route path="/jobs/:id/apply" element={<ApplyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/saved" element={<SavedJob />} />
          </Routes>
          </div>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;