import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AverageGoals2() {
  const { year, minGoals } = useParams(); // Capture year and minGoals from URL parameters
  const [teams, setTeams] = useState([]); // State to hold the list of teams
  const [averageGoals, setAverageGoals] = useState(null); // State to hold the average goals for the year

  // useEffect to fetch teams data when year or minGoals changes
  useEffect(() => {
    const fetchAverageGoals = async () => {
      try {
        // Send a GET request to the backend to retrieve teams data
        const response = await axios.get(`http://localhost:5000/averageGoals/${year}/${minGoals}`);
        console.log('Average Goals data:', response.data); // Log data for debugging
        setTeams(response.data.teams); // Update teams state with the fetched data
        setAverageGoals(response.data.averageGoals); // Set the average goals value
      } catch (error) {
        console.error('Error fetching average goals:', error); // Log any errors
        alert('Error fetching average goals');
      }
    };

    // Fetch data only if both year and minGoals are present
    if (year && minGoals) fetchAverageGoals();
  }, [year, minGoals]); // Depend on year and minGoals URL parameters

  return (
    <div className="form-container">
      {/* Display a heading with the year and minGoals values */}
      <h2 className="form-header">
        Teams with an Average Goals For greater than {minGoals} in {year}
      </h2>

      {/* Display the average goals at the top if available */}
      {averageGoals !== null && (
        <div className="average-goals">
          <h3>Average Goals For: {averageGoals}</h3>
        </div>
      )}

      {/* Conditional rendering based on whether teams data is available */}
      {teams.length > 0 ? (
        teams.map((team, index) => (
          <div key={index} className="stats-box">
            <p>{team.Team} - Goals For: {team.GoalsFor}</p>
          </div>
        ))
      ) : (
        <p className="no-data">No teams found</p> // Message if no data is found
      )}
    </div>
  );
}

export default AverageGoals2;
