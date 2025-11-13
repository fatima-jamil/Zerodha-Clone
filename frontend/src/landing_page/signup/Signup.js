import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false); // Show Sign Up by default
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    password: '',
    accountNumber: '',
    ifscCode: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3002/api/auth/login' : 'http://localhost:3002/api/auth/signup';
    try {
      const res = await axios.post(url, formData);
      localStorage.setItem('token', res.data.token); // Store the token
      
      window.location.href = `http://localhost:3001`; // Redirect to Dashboard app

    } catch (err) {
      setError(err.response.data.message); // Handle error from API
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="ifscCode">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              placeholder="IFSC Code"
              value={formData.ifscCode}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button className="switch-button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Signup;
