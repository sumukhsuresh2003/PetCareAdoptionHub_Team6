import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Adopt() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [adoptionForm, setAdoptionForm] = useState({
    email: '',
    name: '',
    petId: '',
    petName: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPetIdValid, setIsPetIdValid] = useState(false);
  useEffect(() => {
    fetch('http://localhost:5000/api/adopt')
      .then((response) => response.json())
      .then((data) => setPets(data))
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);
  // const checkPetId = async () => {
  //   try {
  //     const response = await fetch(`/api/checkPetId?petId=${adoptionForm.petId}`);
  //     const contentType = response.headers.get('content-type');
  
  //     if (!response.ok) {
  //       throw new Error('Server Error');
  //     }
  
  //     if (!contentType || !contentType.includes('application/json')) {
  //       // Handle specific error case of HTML response
  //       console.error('Received unexpected HTML response');
  //       // Perform actions or display messages appropriate for HTML error response
  //       return;
  //     }
  
  //     const data = await response.json();
  //     setIsPetIdValid(data.exists);
  //   } catch (error) {
  //     console.error('Error checking petId:', error);
  //     // Handle error scenarios, update state, or display an error message to the user
  //   }
  // };
  
  
  

  const handleSearch = () => {
    const filteredPets = pets.filter((pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPets(filteredPets);
  };

  const handleAdoptionFormToggle = () => {
    setShowAdoptionForm(!showAdoptionForm);
    setError('');
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdoptionForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmitAdoptionForm = async (e) => {
    e.preventDefault();
  if (adoptionForm.petId<0|| adoptionForm.petId>1000){
    alert('petId should be between 1 and 999');
  } 
  else{
    alert('Adoption application successfully submitted');
  }
    try {
      // checkPetId()
      const { data } = await axios.post(
        'http://localhost:5000/api/adopt',
        adoptionForm,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      setSuccessMessage(data.message);
      setAdoptionForm({
        email: '',
        name: '',
        petId: '',
        petName: '',
      });
      setShowAdoptionForm(false);
      setError('');
      
    } catch (err) {
      setError(err.message);
      setSuccessMessage('');
    }
  };
  

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Adopt Pets!</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search for pet names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '8px 16px',
              backgroundColor: '#c68c53',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            Search
          </button>
        </div>
        <button
          onClick={handleAdoptionFormToggle}
          style={{
            padding: '8px 16px',
            backgroundColor: '#c68c53',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
          Adoption Form
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {pets.map((pet, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '5px',
              width: '300px',
            }}
          >
            <h2 style={{ marginTop: '0', marginBottom: '5px' }}>{pet.name}</h2>
            <p>ID: {pet.petId}</p>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>
            <p>Description: {pet.dets}</p>
          </div>
        ))}
      </div>

      {showAdoptionForm && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            zIndex: '999',
          }}
        >
          <form onSubmit={handleSubmitAdoptionForm}>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={adoptionForm.email}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
            </label>
            <br />
            
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={adoptionForm.name}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
            </label>
            <br />
            <label>
              Pet ID:
              <input
                type="text"
                name="petId"
                value={adoptionForm.petId}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
            </label>
            <br />
            <label>
              Pet Name:
              <input
                type="text"
                name="petName"
                value={adoptionForm.petName}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
            </label>
            <br />
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#c68c53',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease-in-out',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Adopt;
