const csv = require('csvtojson');
const FootballData = require('./footballSchema');
const path = require('path');

const loadCSVtoMongoDB = async () => {
  try {
    const filePath = path.join(__dirname, 'football.csv');
    const footballDataArray = await csv().fromFile(filePath);

    await FootballData.insertMany(footballDataArray);
    console.log('CSV data imported successfully');
  } catch (error) {
    console.error('Error importing CSV data:', error.message);
  }
};

module.exports = loadCSVtoMongoDB;
