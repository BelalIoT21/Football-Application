# Football Application

A full-stack web application for managing and visualizing football data. This project combines a React frontend with an Express.js backend and MongoDB database to provide a comprehensive football data management system.

## 🚀 Features

- **📊 Data Visualization**: Interactive and user-friendly presentation of football statistics and information
- **💾 Data Persistence**: Robust data storage using MongoDB for scalable data management
- **📁 CSV Upload**: Import football data directly from CSV files for easy data migration
- **⚛️ Modern Frontend**: React-based user interface with responsive design
- **🔧 RESTful API**: Express.js backend providing scalable and maintainable API endpoints
- **🔄 Real-time Updates**: Dynamic data updates and synchronization between frontend and backend

## 🛠️ Tech Stack

### Frontend
- **React.js**: Modern JavaScript framework for building user interfaces
- **Axios**: HTTP client for API communication
- **CSS3**: Styling and responsive design

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Fast and minimalist web framework
- **Mongoose**: MongoDB object modeling for Node.js
- **CORS**: Cross-Origin Resource Sharing middleware

### Database
- **MongoDB**: NoSQL document database for flexible data storage

### Additional Tools
- **csvtojson**: CSV to JSON conversion for data import
- **dotenv**: Environment variable management

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 14 or higher - [Download here](https://nodejs.org/)
- **npm**: Node Package Manager (included with Node.js)
- **MongoDB**: Database server - [Download here](https://www.mongodb.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/BelalIoT21/Football-Application.git
cd Football-Application
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd football-backend

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `football-backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/FootballDB
PORT=5000
NODE_ENV=development
```

### 4. Database Configuration

Ensure MongoDB is running on your system, then modify `database.js` for environment variables:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FootballDB');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
```

### 5. Start the Backend Server

```bash
# From football-backend directory
node server.js
```

The backend server will start on `http://localhost:5000`

### 6. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd football-frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will start on `http://localhost:3000`

## 📁 Project Structure

```
Football-Application/
├── football-backend/
│   ├── server.js              # Main server file
│   ├── database.js            # MongoDB connection
│   ├── footballSchema.js      # Mongoose schema
│   ├── uploadCSV.js          # CSV upload functionality
│   ├── football.csv          # Sample data file
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables
├── football-frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API service calls
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   ├── public/
│   ├── package.json         # Frontend dependencies
│   └── README.md
└── README.md                # This file
```

## 🔧 Configuration Options

### Database Connection
- **Default**: `mongodb://localhost:27017/FootballDB`
- **Environment Variable**: Set `MONGODB_URI` in `.env` file
- **Custom Configuration**: Modify `database.js` for different connection settings

### Port Configuration
- **Backend Default**: Port 5000
- **Frontend Default**: Port 3000
- **Custom Port**: Set `PORT` in `.env` file

### CORS Configuration
The backend is configured to accept requests from `http://localhost:3000`. To modify:

```javascript
// In server.js
app.use(cors({
    origin: ['http://localhost:3000', 'your-frontend-domain.com']
}));
```

## 📊 API Endpoints

### Football Data Endpoints

```bash
# Get all football data
GET /api/football

# Get specific football record
GET /api/football/:id

# Create new football record
POST /api/football

# Update football record
PUT /api/football/:id

# Delete football record
DELETE /api/football/:id
```

### CSV Upload
```bash
# Upload CSV file
POST /api/upload-csv
```

## 💾 CSV Data Format

Ensure your CSV file matches the schema structure. Example format:

```csv
team_name,player_name,position,goals,assists,matches_played
Manchester United,Bruno Fernandes,Midfielder,15,12,30
Arsenal,Bukayo Saka,Winger,10,8,28
Liverpool,Mohamed Salah,Forward,20,5,32
```

## 🎯 Usage Examples

### Frontend Component Example
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FootballData() {
    const [footballData, setFootballData] = useState([]);
    
    useEffect(() => {
        fetchFootballData();
    }, []);
    
    const fetchFootballData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/football');
            setFootballData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    return (
        <div>
            {footballData.map(item => (
                <div key={item._id}>
                    <h3>{item.team_name}</h3>
                    <p>{item.player_name} - {item.position}</p>
                </div>
            ))}
        </div>
    );
}
```

### Backend API Example
```javascript
// Get all football data
app.get('/api/football', async (req, res) => {
    try {
        const data = await Football.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
```

## 🧪 Testing

### Manual Testing
1. **Backend API**: Use Postman or curl to test API endpoints
2. **Frontend**: Navigate through the application interface
3. **Database**: Verify data persistence in MongoDB

### Testing Commands
```bash
# Test backend endpoint
curl http://localhost:5000/api/football

# Check database connection
mongo FootballDB --eval "db.footballdata.find().limit(5)"
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud database
2. Update `MONGODB_URI` environment variable
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy to platforms like Netlify, Vercel, or AWS S3

## 🤝 Contributing

We welcome contributions to improve this football application!

### How to Contribute
1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes:**
   ```bash
   git commit -m "Add: Amazing new feature"
   ```
5. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex functionality
- Test your changes thoroughly
- Update documentation as needed
- Ensure responsive design principles

### Areas for Contribution
- **Enhanced Data Visualization**: Charts and graphs
- **Advanced Filtering**: Search and filter capabilities
- **User Authentication**: Login and user management
- **Real-time Updates**: WebSocket integration
- **Mobile Optimization**: Improved mobile experience
- **Performance Optimization**: Caching and optimization
- **Testing**: Unit and integration tests

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list | grep mongodb  # macOS
```

**Port Already in Use**
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000  # Windows
```

**CORS Errors**
- Ensure frontend URL is added to CORS configuration
- Check that both servers are running

**Dependencies Issues**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

License not specified. Please contact the repository owner for licensing information.

## 🙏 Acknowledgments

This project uses the following open-source technologies:

- **[Express.js](https://expressjs.com/)**: Fast, unopinionated web framework for Node.js
- **[React](https://reactjs.org/)**: JavaScript library for building user interfaces
- **[MongoDB](https://www.mongodb.com/)**: Document-based NoSQL database
- **[Mongoose](https://mongoosejs.com/)**: Elegant MongoDB object modeling for Node.js
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client
- **[csvtojson](https://www.npmjs.com/package/csvtojson)**: CSV to JSON conversion library

## 📞 Support

For questions, issues, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/BelalIoT21/Football-Application/issues)
- **Documentation**: Check this README for common questions
- **Community**: Join discussions in the repository

---

**Happy Coding! ⚽** 

Built with ❤️ for football enthusiasts and developers alike.
