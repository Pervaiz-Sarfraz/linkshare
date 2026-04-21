import React, { useState } from "react";
import { register } from "../functionality/Api";
import { useMessage } from "../context/MessageContext";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function Register({ onRegister }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { setMessage }          = useMessage();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password);
      setMessage("Account created! You can now sign in. 🚀");
      onRegister();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join the LinkShare community today</p>
          </div>

          <form onSubmit={handleRegister} className="form-container" style={{ padding: 0, background: 'transparent', border: 'none', boxShadow: 'none' }}>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}
              >
                {error}
              </motion.div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <FiMail style={{
                  position: 'absolute', left: '1.25rem', top: '50%',
                  transform: 'translateY(-50%)', color: 'var(--brand)',
                  pointerEvents: 'none', fontSize: '1.1rem'
                }} />
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: '3rem' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <FiLock style={{
                  position: 'absolute', left: '1.25rem', top: '50%',
                  transform: 'translateY(-50%)', color: 'var(--brand)',
                  pointerEvents: 'none', fontSize: '1.1rem'
                }} />
                <input
                  id="password"
                  className="form-input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Choose a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: '1rem', top: '50%',
                    transform: 'translateY(-50%)', background: 'none',
                    border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
                  }}
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="search-button"
              style={{ width: '100%', padding: '1.25rem' }}
              disabled={loading}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? <div className="loader" style={{ width: '20px', height: '20px', margin: '0 auto' }} /> : 'Create Account'}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <a href="/login" onClick={(e) => { e.preventDefault(); onRegister(); }}>Sign In</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
