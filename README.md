# Football Application

Football full stack application.

## Key Features & Benefits

*   **Data Visualization:** Presents football data in a user-friendly format.
*   **Data Persistence:** Stores football data in a MongoDB database.
*   **CSV Upload:** Allows uploading football data from a CSV file.
*   **Frontend Interface:** Provides a React-based frontend for interacting with the data.
*   **Backend API:**  Utilizes Express.js to create a robust and scalable API.

## Prerequisites & Dependencies

Before running this application, ensure you have the following installed:

*   **Node.js:** Version 14 or higher.  Download from [nodejs.org](https://nodejs.org/).
*   **npm:** Node Package Manager (usually included with Node.js).
*   **MongoDB:**  Install and run a MongoDB server. Download from [mongodb.com](https://www.mongodb.com/).

## Installation & Setup Instructions

Follow these steps to get the application up and running:

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/BelalIoT21/Football-Application.git
    cd Football-Application
    ```

2.  **Backend Setup:**

    ```bash
    cd football-backend
    npm install
    ```

    *   **Create `.env` file (optional):** Although the provided `database.js` connects to `mongodb://localhost:27017/FootballDB`, it's best practice to use environment variables. Create a `.env` file in the `football-backend` directory and add the following:

        ```
        MONGODB_URI=mongodb://localhost:27017/FootballDB
        ```

    *   **Modify `database.js` (if using `.env`):**

        ```javascript
        const mongoose = require('mongoose');
        require('dotenv').config(); // Add this line

        const connectDB = async () => {
          try {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FootballDB');
            console.log('MongoDB connected');
          } catch (error) {
            console.error('MongoDB connection failed:', error.message);
          }
        };

        module.exports = connectDB;
        ```

3.  **Start the Backend Server:**

    ```bash
    node server.js
    ```

    The backend server will start on port 5000.

4.  **Frontend Setup:**

    ```bash
    cd ../football-frontend
    npm install
    ```

5.  **Start the Frontend Development Server:**

    ```bash
    npm start
    ```

    The frontend application will typically start on `http://localhost:3000`.

## Usage Examples & API Documentation

*   **CSV Upload:**
    *   The `uploadCSV.js` script reads data from `football.csv` and loads it into the MongoDB database when the backend server starts.
    *   Ensure the `football.csv` file is located in the `football-backend` directory. The structure of the CSV should match the schema defined in `footballSchema.js`.
*   **API Endpoints:**
    *   The backend provides endpoints to fetch and potentially manipulate football data (implementation details are not fully present in the provided snippets).  Example (based on structure):
        *   `GET /api/football`:  Returns all football data.  (Endpoint needs to be implemented in `server.js`)

## Configuration Options

*   **Database Connection:**  The `database.js` file contains the MongoDB connection string. You can modify it to connect to a different database instance. The preferred method would be to use environment variables for the MongoDB URI, as described in the Installation section.
*   **Port Configuration:** The backend server runs on port 5000. You can change the port by modifying the `PORT` variable in `server.js`.
*   **CORS Origin:**  The backend uses CORS to allow requests from the frontend. The `cors` middleware is configured to allow requests from `http://localhost:3000`.  Adjust this if your frontend is running on a different port or domain.

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive commit messages.
4.  Submit a pull request.

## License Information

License not specified.

## Acknowledgments

*   This project uses the following open-source libraries:
    *   Express.js
    *   Mongoose
    *   cors
    *   csvtojson
    *   axios
