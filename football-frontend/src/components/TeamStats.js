import React, { useState } from 'react';
import axios from 'axios';

function TeamStats() {
  // State for storing the year input and the stats data
  const [year, setYear] = useState(''); // Holds the year input by the user
  const [stats, setStats] = useState(null); // Holds the team stats data returned by the backend

  // Update the year state when the input value changes
  const handleChange = (e) => {
    setYear(e.target.value);
  };

  // Handle form submission to fetch stats data from the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      // Send a GET request to the backend with the year parameter
      const response = await axios.get(`http://localhost:5000/stats/${year}`);
      console.log('Stats data received:', response.data); // Log data for debugging
      setStats(response.data); // Store the stats data in state
    } catch (error) {
      console.error('Error fetching stats:', error); // Log any errors for debugging
      alert('Error fetching stats'); // Notify user if an error occurs
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Get Team Stats</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Input field for the year */}
        <input
          type="number"
          name="year"
          placeholder="Enter Year"
          value={year}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="form-button">Get Stats</button>
      </form>

      {/* Display stats in a box format */}
      {stats && stats.length > 0 ? (
        <div className="stats-box">
          <h2 className="stats-header">Team Stats for {year}</h2>
          {stats.map((team, index) => (
            <div key={index} className="stats-item">
              <p><strong>Team:</strong> {team._id}</p>
              <p><strong>Games:</strong> {team.totalGames}</p>
              <p><strong>Wins:</strong> {team.totalWin}</p>
              <p><strong>Draws:</strong> {team.totalDraw}</p>
            </div>
          ))}
        </div>
      ) : stats && stats.length === 0 ? (
        <div>
          <p className="no-data">No data found for the selected year.</p>
        </div>
      ) : null}
    </div>
  );
}

export default TeamStats;