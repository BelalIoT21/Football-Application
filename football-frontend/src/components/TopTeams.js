import React, { useState } from 'react';
import axios from 'axios';

function TopTeams() {
  const [minWins, setMinWins] = useState('');
  const [teams, setTeams] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setMinWins(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const response = await axios.get(`http://localhost:5000/topTeams/${minWins}`);
      if (response.data.length === 0) {
        setTeams([]);
      } else {
        setTeams(response.data);
      }
    } catch (error) {
      console.error('Error fetching top teams:', error);
      alert('Error fetching top teams');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Top Teams with more than {minWins || '...'} Wins</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="number"
          name="minWins"
          placeholder="Minimum Wins (e.g., 10)"
          value={minWins}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="form-button">Get Top Teams</button>
      </form>

      {submitted && (
        teams.length > 0 ? (
          <div className="stats-box">
            <h2 className="form-header">Top Teams with more than {minWins} Wins</h2>

            <table className="stats-table">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Games Played</th>
                  <th>Wins</th>
                  <th>Draws</th>
                  <th>Losses</th>
                  <th>Goals For</th>
                  <th>Goals Against</th>
                  <th>Points</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={index}>
                    <td>{team.Team}</td>
                    <td>{team.GamesPlayed}</td>
                    <td>{team.Win}</td>
                    <td>{team.Draw}</td>
                    <td>{team.Loss}</td>
                    <td>{team.GoalsFor}</td>
                    <td>{team.GoalsAgainst}</td>
                    <td>{team.Points}</td>
                    <td>{team.Year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="stats-box">
            <p className="no-data">No teams found with more than {minWins} Wins.</p>
          </div>
        )
      )}
    </div>
  );
}

export default TopTeams;
