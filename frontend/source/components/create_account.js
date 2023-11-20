import React, { useState } from 'react';
import axios from 'axios';

const CreateAcc = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !fname || !city || !username) {
      alert('Please fill in all fields correctly. All fields are required.');
      return;
    } else alert('User account created successfully!');

    try {
      const userId = Math.floor(Math.random() * 1000);

      const { data } = await axios.post(
        'http://localhost:5000/api/createacc',
        { userId, email, password, fname, lname, city },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));
      // Reset the form after processing (if needed)
      setEmail('');
      setPassword('');
      setFname('');
      setLname('');
      setUsername('');
      setCity('');
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        <h2>Create Account</h2>
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
            First Name:
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Last Name:
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
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
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAcc;
