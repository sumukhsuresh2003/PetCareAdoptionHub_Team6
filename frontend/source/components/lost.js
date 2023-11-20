import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Lost = () => {
  const shoot = (a) => {
    alert(a);}
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [colour, setColour] = useState('');
  const [features, setFeatures] = useState('');
  const [tags, setTags] = useState('');
  const [lastseen, setLastseen] = useState('');
  const [lastseendate, setLastseendate] = useState('');
  const [dets, setDets] = useState('');



  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmitLost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isDateInFuture = (dateString) => {
      const currentDate = new Date();
      const enteredDate = new Date(dateString);
      return enteredDate > currentDate;
    };
    if (isDateInFuture(lastseendate)||!name ||!age>0|| !phone || !type || !age ||!email ||!breed ||!colour ||!features ||!tags ||!lastseen ||!lastseendate || !phone.match(/^[789]\d{9}$/) || !name.match(/^[a-zA-Z\s]+$/)) {
      alert('Please fill in all fields correctly. Everything except \'addition details\' is required ');
      return;
    }
    else
      alert('Lost Pet successfully reported');
    try {
      //const userId = Math.floor(Math.random() * 1000); // Generate a random user ID

      const { data } = await axios.post(
        'http://localhost:5000/api/lost',
        { name, email, age, breed, colour, features, tags, lastseen, lastseendate, dets },
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
      setEmail('');
      setName('');
      setLastseen('');
      setAge(' ');
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
  const [pets, setPets] = useState([]);
  const [showPets, setShowPets] = useState(false);
  useEffect(() => {
    // Fetch data from your database/API
    fetch('http://localhost:5000/api/lost')
      .then(response => response.json())
      .then(data => setPets(data))    ////////////////////////////
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  const formContainerStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '20px auto',
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
    width: '300px',
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
  const lostPetsContainerStyle = {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const petCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  };

  const petTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  };

  const petInfoStyle = {
    marginBottom: '5px',
    color: '#666',
  };
  
    
  
    const togglePets = () => {
      setShowPets(!showPets);
    };
  return (
    <div>
      <h2></h2>
      <button onClick={togglePets}style={buttonStyle}>Show Lost Pets</button>
      {showPets && (
         <div>
      
      <div style={lostPetsContainerStyle}>
      <h1>Lost Pets</h1>
        {pets.map((pet, index) => (
          
          <div key={index} style={petCardStyle}>
            <h2 style={petTitleStyle}>{pet.name}</h2>
            <p style={petInfoStyle}>Age: {pet.age}</p>
            <p style={petInfoStyle}>Breed: {pet.breed}</p>
            <p style={petInfoStyle}>Email: {pet.email}</p>
            <p style={petInfoStyle}>Color: {pet.colour}</p>
            <p style={petInfoStyle}>Features: {pet.features}</p>
            <p style={petInfoStyle}>Tag: {pet.tags}</p>
            <p style={petInfoStyle}>Last Seen: {pet.lastseen}</p>
            <p style={petInfoStyle}>Last Seen Date: {pet.lastseendate}</p>
            <p style={petInfoStyle}>Description: {pet.dets}</p>
          </div>
        ))}
      </div>
     </div>)}


      
      <form onSubmit={handleSubmitLost} style={formContainerStyle}>
      
        <div style={formStyle}>
        <h2>Report Lost and found</h2>
      <label>
        Reporter's Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />

      <label>
        Reporter's Phone Number:
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </label>
      <br />

      <label>
        Reporter's Email Address:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />

      <label>
        Pet Type (dog/cat):
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
      </label>
      <br />

      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <br />

      <label>
        Breed:
        <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
      </label>
      <br />

      <label>
        Color:
        <input type="text" value={colour} onChange={(e) => setColour(e.target.value)} />
      </label>
      <br />

      <label>
        Distinctive Features:
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </label>
      <br />

      <label>
        Collar/Tags:
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>
      <br />

      <label>
        Last Seen Location:
        <input
          type="text"
          value={lastseen}
          onChange={(e) => setLastseen(e.target.value)}
        />
      </label>
      <br />

      <label>
        Date and Time:
        <input type="datetime-local" value={lastseendate} onChange={(e) => setLastseendate(e.target.value)} />
      </label>
      <br />

      <label>
        Additional Details:
        <textarea
          value={dets}
          onChange={(e) => setDets(e.target.value)}
        ></textarea>
      </label>
      <br />

      <button type="submit" style={buttonStyle}>Submit</button>
      </div>
    </form>


    </div>
  );
};

export default Lost;
