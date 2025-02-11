import React, { useState } from 'react';
import axios from 'axios';

function DeleteTeam() {
  // State to hold the name of the team to be deleted
  const [team, setTeam] = useState('');

  // Handle form submission to send delete request to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    console.log('Team to delete:', team); // Log the team name for debugging
    try {
      // Send a POST request to delete the specified team
      await axios.post('http://localhost:5000/deleteTeam', { Team: team });
      alert('Team deleted successfully!'); // Notify user of success
    } catch (error) {
      console.error(error); // Log any errors that occur
      alert('Error deleting team'); // Notify user if an error occurs
    } finally {
      // Reset the form input by clearing the state
      setTeam(''); // Clear the team state value regardless of success or failure
    }
  };

  return (
    <div className="form-container">
    <h2 className="form-header">Delete Team</h2>
    <form onSubmit={handleSubmit} className="form">
      {/* Input field for entering the team name to delete */}
      <input
        type="text"
        value={team}
        placeholder="Team Name"
        onChange={(e) => setTeam(e.target.value)} // Update team state on input change
        required
        className="form-input"
      />
      <button type="submit" className="form-button">Delete Team</button> {/* Submit button to delete team */}
    </form>
    </div>
  );
}

export default DeleteTeam;