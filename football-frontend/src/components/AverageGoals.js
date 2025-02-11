import React, { useState } from 'react';
import axios from 'axios';

function AverageGoals() {
  const [year, setYear] = useState('');            // State for year
  const [minGoals, setMinGoals] = useState('');     // State for minimum goals
  const [teams, setTeams] = useState([]);           // State to hold teams data
  const [averageGoals, setAverageGoals] = useState(null); // State to hold average goals
  const [submitted, setSubmitted] = useState(false);  // State to track form submission

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark form as submitted
    try {
      // Send GET request to fetch teams and average goals data
      const response = await axios.get(`http://localhost:5000/averageGoals/${year}/${minGoals}`);
      
      // Update teams and averageGoals state
      setTeams(response.data.teams);         // Teams from backend response
      setAverageGoals(response.data.averageGoals); // Average goals from backend response
    } catch (error) {
      console.error('Error fetching average goals:', error);
      alert('Error fetching average goals');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">
        Teams with an Average Goals For greater than {minGoals || '...'} in {year || '...'}
      </h2>

      {/* Display the average goals at the top if available */}
      {averageGoals !== null && (
        <div className="average-goals">
          <h3>Average Goals For: {averageGoals}</h3>
        </div>
      )}

      {/* Styled form to input year and minimum average goals */}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="number"
          name="year"
          placeholder="Year (e.g., 2022)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="form-input"
        />
        <input
          type="number"
          name="minGoals"
          placeholder="Minimum Average Goals (e.g., ...)"
          value={minGoals}
          onChange={(e) => setMinGoals(e.target.value)}
          required
          className="form-input"
        />
        <button type="submit" className="form-button">Get Teams</button>
      </form>

      {/* Display the teams or a message if no teams are found */}
      {submitted && (
        teams.length > 0 ? (
          <div className="stats-box">
            {teams.map((team, index) => (
              <p key={index} className="stats-item">{team.Team} - Goals For: {team.GoalsFor}</p>
            ))}
          </div>
        ) : (
          <div className="stats-box">
            <p className="no-data">No teams found</p>
          </div>
        )
      )}
    </div>
  );
}

export default AverageGoals;
