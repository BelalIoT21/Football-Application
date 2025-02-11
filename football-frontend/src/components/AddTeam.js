import React, { useState } from 'react';
import axios from 'axios';

function AddTeam() {
  // State to hold the form data for a new team
  const [teamData, setTeamData] = useState({
    Team: '',
    GamesPlayed: '',
    Win: '',
    Draw: '',
    Loss: '',
    GoalsFor: '',
    GoalsAgainst: '',
    Points: '',
    Year: ''
  });

  // Update the teamData state when input fields change
  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  // Handle form submission to send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      // Send a POST request to add a new team with the data
      await axios.post('http://localhost:5000/addTeam', teamData);
      alert('Team added successfully!');
      e.target.reset();
    } catch (error) {
      console.error(error);
  
      // Check if the error has a response and display the specific error message
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Validation Error: ${error.response.data.error}`);
      } else {
        alert('Error adding team');
      }
    }
  };
  

  return (
    <div className="form-container">
      <h2 className="form-header">Add Team Information</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="Team" placeholder="Team Name" onChange={handleChange} required className="form-input" />
        <input type="number" name="GamesPlayed" placeholder="Games Played" onChange={handleChange} className="form-input" />
        <input type="number" name="Win" placeholder="Wins" onChange={handleChange} className="form-input" />
        <input type="number" name="Draw" placeholder="Draws" onChange={handleChange} className="form-input" />
        <input type="number" name="Loss" placeholder="Losses" onChange={handleChange} className="form-input" />
        <input type="number" name="GoalsFor" placeholder="Goals For" onChange={handleChange} className="form-input" />
        <input type="number" name="GoalsAgainst" placeholder="Goals Against" onChange={handleChange} className="form-input" />
        <input type="number" name="Points" placeholder="Points" onChange={handleChange} className="form-input" />
        <input type="number" name="Year" placeholder="Year" onChange={handleChange} className="form-input" />
        <button type="submit" className="form-button">Add Team</button>
      </form>
    </div>
  );
}

export default AddTeam;