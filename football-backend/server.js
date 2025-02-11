const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database');
const FootballData = require('./footballSchema');
const loadCSVtoMongoDB = require('./uploadCSV');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:3000', // Allow only requests from your frontend
}));

app.use(bodyParser.json());

connectDB();
loadCSVtoMongoDB();

function validateTeamData(data) {
  const GamesPlayed = Number(data.GamesPlayed);
  const Win = Number(data.Win);
  const Draw = Number(data.Draw);
  const Loss = Number(data.Loss);
  const GoalsFor = Number(data.GoalsFor);
  const GoalsAgainst = Number(data.GoalsAgainst);
  const Points = Number(data.Points);
  const Year = Number(data.Year);

  if ([GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year].some(isNaN)) {
    return { error: 'All numerical fields must be valid numbers.' };
  }

  if (GamesPlayed !== (Win + Draw + Loss)) {
    return { error: 'GamesPlayed must equal the sum of Win, Draw, and Loss.' };
  }

  if (GoalsFor < 0 || GoalsAgainst < 0) {
    return { error: 'GoalsFor and GoalsAgainst must be non-negative numbers.' };
  }

  return null;
}


// 1.5 
app.post('/addTeam', async (req, res) => {
  const validationError = validateTeamData(req.body);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  try {

    const teamData = new FootballData(req.body);
    await teamData.save();

    res.status(201).send('Team data added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 1.6 
app.post('/updateTeam', async (req, res) => {
  const validationError = validateTeamData(req.body);
  if (validationError) {
    return res.status(400).send(validationError); 
  }

  const { Team, ...updateData } = req.body;
  try {

    const updated = await FootballData.findOneAndUpdate({ Team }, updateData, { new: true });

    if (!updated) return res.status(404).send('Team not found');
    res.send('Team data updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 1.8 
app.post('/deleteTeam', async (req, res) => {
  const { Team } = req.body;
  try {

    const deleted = await FootballData.findOneAndDelete({ Team });


    if (!deleted) return res.status(404).send('Team not found');
    res.send('Team data deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 1.7 
app.get('/stats/:year', async (req, res) => {
  const year = parseInt(req.params.year); // Get the year from the request parameters
  try {

    const stats = await FootballData.aggregate([
      { $match: { Year: year } },
      { 
        $group: { 
          _id: "$Team", 
          totalGames: { $sum: "$GamesPlayed" },
          totalDraw: { $sum: "$Draw" },
          totalWin: { $sum: "$Win" }
        }
      }
    ]);


    res.json(stats); // Send back the stats data as JSON
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 1.9 
app.get('/topTeams/:wins', async (req, res) => {
  const minWins = parseInt(req.params.wins);
  try {

    const teams = await FootballData.find({ Win: { $gt: minWins } }).limit(10);


    res.json(teams);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// 2.0
app.get('/averageGoals/:year/:minGoals', async (req, res) => {
  const year = parseInt(req.params.year); 
  const minGoals = parseFloat(req.params.minGoals);

  try {

    const teams = await FootballData.aggregate([
      { $match: { Year: year } }, 
      {
        $group: {
          _id: "$Team", 
          avgGoalsFor: { $avg: "$GoalsFor" }, 
          data: { $first: "$$ROOT" } 
        }
      },
      { $match: { avgGoalsFor: { $gt: minGoals } } }, 
      { $replaceRoot: { newRoot: "$data" } } 
    ]);

    
    const totalGoals = teams.reduce((sum, team) => sum + team.GoalsFor, 0);
    const averageGoals = teams.length > 0 ? (totalGoals / teams.length) : 0;

    
    res.json({
      averageGoals: averageGoals, 
      teams: teams 
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});