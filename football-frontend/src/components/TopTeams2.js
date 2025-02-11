import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TopTeams2() {
  const { minWins } = useParams(); // Capture minWins from URL parameters
  const [teams, setTeams] = useState([]); // State to store the list of teams

  useEffect(() => {
    // Function to fetch top teams data from the backend
    const fetchTopTeams = async () => {
      try {
        // Send a GET request to the backend with the minimum wins parameter
        const response = await axios.get(`http://localhost:5000/topTeams/${minWins}`);
        console.log('Top Teams data:', response.data); // Log data for debugging
        setTeams(response.data); // Update teams state with the fetched data
      } catch (error) {
        console.error('Error fetching top teams:', error); // Log any errors
        alert('Error fetching top teams'); // Notify the user if there's an error
      }
    };

    if (minWins) fetchTopTeams(); // Only fetch data if minWins parameter is provided
  }, [minWins]); // Effect dependency on minWins to re-fetch data if minWins changes

  return (
    <div className="form-container">
      <h2 className="form-header">Top Teams with at least {minWins} Wins</h2>
      {/* Conditional rendering based on whether teams data is available */}
      {teams.length > 0 ? (
        teams.map((team, index) => (
          <p key={index}>{team.Team} - Wins: {team.Win}</p> // Display each team’s name and wins
        ))
      ) : (
        <p className="no-data">No teams found with at least {minWins} Wins.</p> // Message if no teams meet the criteria
      )}
    </div>
  );
}

export default TopTeams2;