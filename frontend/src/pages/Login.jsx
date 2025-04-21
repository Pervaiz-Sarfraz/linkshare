import React, { useState } from 'react';
import { login } from '../functionality/Api';
import { Link, useNavigate } from 'react-router-dom';
import { useMessage } from '../context/MessageContext';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const { setMessage } = useMessage();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(email, password); 
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("email", res.data.email); 
      localStorage.setItem("user_id", res.data.id);
      onLogin();
      setMessage("you are logged In now !")
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        {error && <p className="auth-error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
