import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTeam from './components/AddTeam';
import UpdateTeam from './components/UpdateTeam';
import DeleteTeam from './components/DeleteTeam';
import TeamStats from './components/TeamStats';
import TeamStats2 from './components/TeamStats2';
import TopTeams from './components/TopTeams';
import TopTeams2 from './components/TopTeams2';
import AverageGoals from './components/AverageGoals';
import AverageGoals2 from './components/AverageGoals2';
import Slider from './Slider';  

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Slider />} />

        <Route path="/add-team" element={<AddTeam />} />
        <Route path="/update-team" element={<UpdateTeam />} />
        <Route path="/delete-team" element={<DeleteTeam />} />
        <Route path="/team-stats" element={<TeamStats />} />
        <Route path="/team-stats/:year" element={<TeamStats2 />} />
        <Route path="/top-teams" element={<TopTeams />} />
        <Route path="/top-teams/:minWins" element={<TopTeams2 />} />
        <Route path="/average-goals" element={<AverageGoals />} />
        <Route path="/average-goals/:year/:minGoals" element={<AverageGoals2 />} />
      </Routes>
    </Router>
  );
}

export default App;
