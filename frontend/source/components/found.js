import React, { useState } from 'react';
import axios from 'axios';

const Found = () => {
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [email, setEmail] = useState('');
  const [dets, setDets] = useState('');
  const [features, setFeatures] = useState('');
  const [tags, setTags] = useState('');
  const [lastseen, setLastseen] = useState('');
  const [lastseendate, setLastseendate] = useState('');
  const [name, setName] = useState('');
  const [colour, setColour] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmitFound = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isDateInFuture = (dateString) => {
      const currentDate = new Date();
      const enteredDate = new Date(dateString);
      return enteredDate > currentDate;
    };
    if (
      isDateInFuture(lastseendate) ||
      !name ||
      !features ||
      !tags ||
      !lastseen ||
      !colour ||
      !type ||
      !phone ||
      !type.match(/^[a-zA-Z\s]+$/) ||
      !breed.match(/^[a-zA-Z\s]+$/) ||
      !colour.match(/^[a-zA-Z\s]+$/) ||
      !features.match(/^[a-zA-Z\s]+$/) ||
      !tags.match(/^[a-zA-Z\s]+$/) ||
      !lastseen.match(/^[a-zA-Z\s]+$/) ||
      !lastseendate ||
      !phone.match(/^[789]\d{9}$/) ||
      !name.match(/^[a-zA-Z\s]+$/)
    ) {
      alert('Please fill in all fields correctly. All fields are required.');
      return;
    } else alert('Found Pet successfully reported');

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/found',
        { phone, type, breed, colour, features, tags, lastseen, lastseendate },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log(JSON.stringify(data, null, 4));

      setEmail('');
      setName('');
      setLastseen('');
      setBreed(' ');
      setColour('');
      setDets('');
      setFeatures('');
      setLastseendate('');
      setPhone('');
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
      <h2> </h2>
      <form onSubmit={handleSubmitFound} style={formContainerStyle}>
        <h2>Report Found Pet</h2>
        <div style={formStyle}>
          <label style={labelStyle}>
            Reporter's Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
        Reporter's Phone Number:
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle}/>
      </label>
      <br />

      <label style={labelStyle}>
        Pet Type (dog/cat):
        <input type="text" value={type} onChange={(e) => setType(e.target.value)}style={inputStyle} />
      </label>
      <br />

      <label style={labelStyle}>
        Breed:
        <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)}style={inputStyle} />
      </label>
      <br />

      <label style={labelStyle}>
        Color:
        <input type="text" value={colour} onChange={(e) => setColour(e.target.value)} style={inputStyle}/>
      </label>
      <br />

      <label style={labelStyle}>
        Distinctive Features:
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}style={inputStyle}
        />
      </label>
      <br />

      <label style={labelStyle}>
        Collar/Tags:
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}style={inputStyle} />
      </label>
      <br />

      <label style={labelStyle}>
        Last Seen Location:
        <input
          type="text"
          value={lastseen}
          onChange={(e) => setLastseen(e.target.value)}style={inputStyle}
        />
      </label>
      <br />

      <label style={labelStyle}>
        Date and Time:
        <input type="datetime-local" value={lastseendate} onChange={(e) => setLastseendate(e.target.value)} style={inputStyle}/>
      </label>
      <br />

          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Found;
