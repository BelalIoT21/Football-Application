import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TeamStats2() {
  const { year } = useParams(); // Get the year parameter from the URL
  const [stats, setStats] = useState(null); // State to store the stats data

  useEffect(() => {
    // Function to fetch stats data from the backend
    const fetchStats = async () => {
      try {
        // Send a GET request to fetch stats for the specified year
        const response = await axios.get(`http://localhost:5000/stats/${year}`);
        console.log('Stats data received:', response.data); // Log data for debugging
        setStats(response.data); // Set the stats data in state
      } catch (error) {
        console.error('Error fetching stats:', error); // Log any errors
        alert('Error fetching stats'); // Notify the user if there's an error
      }
    };

    if (year) fetchStats(); // Only fetch data if the year parameter is present
  }, [year]); // Run this effect whenever the year changes

  return (
    <div className="form-container">
      <h2 className="form-header">Teams Stats for {year}</h2>

      {stats && stats.length > 0 ? (
        <div className="stats-box">
          {stats.map((team, index) => (
            <div key={index} className="stats-item">
              <strong>Team:</strong> {team._id} <br />
              <strong>Games:</strong> {team.totalGames} <br />
              <strong>Wins:</strong> {team.totalWin} <br />
              <strong>Draws:</strong> {team.totalDraw}
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

export default TeamStats2;