import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('Login API Response:', data);

      setEmail('');
      setPassword('');
      if (data === 'successful login') {
        alert('Login successful');
      } else if (data ==='user does not exist') {
        alert('User does not exist. Create an account.');
      } else {
        alert('Invalid email or password');
      }
      
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const [pets, setPets] = useState([]);
  // useEffect(() => {
  //   // Fetch data from your database/API
  //   fetch('http://localhost:5000/api/createacc')
  //     .then(response => response.json())
  //     .then(data => setPets(data))    ////////////////////////////
  //     .catch(error => console.error('Error fetching pets:', error));
  // }, []);
  const formContainerStyle = {
    backgroundColor: '#f7f7f7',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const labelStyle = {
    marginBottom: '10px',
  };

  const inputStyle = {
    padding: '8px',
    marginBottom: '15px',
    width: '250px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#c68c53',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };

  return (
    <div>
      <h2></h2>
      <form onSubmit={handleSubmit} style={formContainerStyle}>
        <h2>Login</h2>
        <div style={formStyle}>
          <label style={labelStyle}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
          </label>
          <label style={labelStyle}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </label>
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </div>
      </form>
      {/* <Link to="/create_account">
        <button type="button">
          Create account
        </button>
      </Link> */}
    </div>
  );
};

export default Login;
