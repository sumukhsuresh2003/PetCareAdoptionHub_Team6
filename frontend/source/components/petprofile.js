import React, { useState } from 'react';
import axios from 'axios';

const PetProfile = () => {
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [dets, setDets] = useState('');
  const [name, setName] = useState('');
  const [colour, setColour] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

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

  const handleSubmitFound = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //const petId = Math.floor(Math.random() * 1000);
    // Validation checks
    if (
      !name ||
      !breed ||
      !colour ||
      !type ||
      age <= 0 ||
      isNaN(parseInt(age)) ||
      !name.match(/^[a-zA-Z\s]+$/) ||
      !breed.match(/^[a-zA-Z\s]+$/) ||
      !colour.match(/^[a-zA-Z\s]+$/) ||
      !type.match(/^[a-zA-Z\s]+$/)
    ) {
      alert('Please fill in all fields correctly. Age should be a number greater than 0, and Name, Breed, and Color should contain only alphabets. Everything except description is required.');
      setIsLoading(false);
      return;
    }
    else{
    alert('Pet Profile successfully created');}

    try {
      const petId = Math.floor(Math.random() * 999) + 1;
 // Generate a random user ID

      const { data } = await axios.post(
        'http://localhost:5000/api/petprofile',
        { petId, name, age, type, breed,  colour, dets },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));
      
      // Reset the form after processing
      setName('');
      setAge('');
      setBreed('');
      setColour('');
      setDets('');

      alert('Pet Profile successfully created!');
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2> </h2>
    <div style={formContainerStyle}>
      <h2>Create Pet Profile</h2>
      <form style={formStyle} onSubmit={handleSubmitFound}>
      
        <label style={labelStyle}>
          Pet's Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Pet Type (dog/cat):
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Breed:
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Color:
          <input
            type="text"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Distinctive Features:
          <input
            type="text"
            value={dets}
            onChange={(e) => setDets(e.target.value)}
            style={inputStyle}
          />
        </label>

        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div></div>
  );
};

export default PetProfile;
