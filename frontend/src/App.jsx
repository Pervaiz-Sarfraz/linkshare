import React, { useState } from "react";
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
import Footer from "./comp/footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isLoggedIn) {
    return (
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
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Search />
              <JobList />
              <JobAbout/>
              <Footer/>
            </>
          }
        />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/add-company" element={<AddCompanyPage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/companies" element={<Company />} />
        <Route path="/applications" element={< MyApplications/>} />
        <Route path="/jobs/:id/apply" element={<ApplyPage />} />
      </Routes>
    </Router>
  );
}

export default App;