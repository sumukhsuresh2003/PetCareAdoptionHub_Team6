import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Volunteer = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [availability, setAvailibility] = useState('');
  const [training, setTraining] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [showPets, setShowPets] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name || !phone || !profession || !availability || !training || !phone.match(/^[789]\d{9}$/) || !name.match(/^[a-zA-Z\s]+$/) || !profession.match(/^[a-zA-Z\s]+$/) || !availability.match(/^[a-zA-Z\s]+$/)|| !training.match(/^[a-zA-Z\s]+$/)) {
      alert('Please fill in all fields correctly. All fields are required. ');
      return;
    }
    else
      alert('Volunteer Application successfully created');
    try {
      //const userId = Math.floor(Math.random() * 1000); // Generate a random user ID

      const { data } = await axios.post(
        'http://localhost:5000/api/volunteer',
        { name, phone, profession, availability, training },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));
      // Update state with response data if needed
      // setEmail(data); // This line might need adjustment based on the API response

      // Reset the form after processing (if needed)

      setName('');
      setPhone('');
      setProfession(' ');
      setAvailibility(' ');
      setTraining('');
  

    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  const togglePets = () => {
    setShowPets(!showPets);
  };
  const [vol, setVol] = useState([]);
  useEffect(() => {
     fetch('http://localhost:5000/api/volunteer')
      .then(response => response.json())
      .then(data => setVol(data))    ////////////////////////////
      .catch(error => console.error('Error fetching volunteers:', error));
  }, []);
  const volunteerOpportunityStyle = {
    marginTop: '20px',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    
  };

  const volunteerTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  };

  const volunteerInfoStyle = {
    marginBottom: '5px',
    color: '#666',
  };

  return (
    <div>
    <div>
<h1>Volunteer Opportunity:</h1>
<button onClick={togglePets}style={buttonStyle}>View Volunteering Opportunity</button>
      {showPets && (
<div>
          {vol.map((volunteer, index) => (
            <div key={index} style={volunteerOpportunityStyle}>
              <h2 style={volunteerTitleStyle}>{volunteer.name}</h2>
              <p style={volunteerInfoStyle}>Contact: {volunteer.contact}</p>
              <p style={volunteerInfoStyle}>Profession: {volunteer.profession}</p>
              <p style={volunteerInfoStyle}>Availability: {volunteer.availability}</p>
              <p style={volunteerInfoStyle}>Training: {volunteer.training}</p>
            </div>
          ))}
</div>)}</div>
<h2></h2>
      <div style={formContainerStyle}>
      <h2>Apply here to Volunteer</h2>
        <form style={formStyle} onSubmit={handleSubmit}>
          <label style={labelStyle}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Phone Number:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Profession:
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Availability:
            <input
              type="text"
              value={availability}
              onChange={(e) => setAvailibility(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Training:
            <input
              type="text"
              value={training}
              onChange={(e) => setTraining(e.target.value)}
              style={inputStyle}
            />
          </label>
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Volunteer;
