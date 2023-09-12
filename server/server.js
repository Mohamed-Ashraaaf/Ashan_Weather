const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Add this line to enable CORS for all routes

// Set up Express middleware
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoURI = 'mongodb://127.0.0.1:27017/weather_app';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// server.js (continued)
// Import weather controller
const weatherController = require('./controllers/weatherController');

// API routes
app.get('/api/weather', weatherController.getWeatherByCity);

app.get('/api/forecast', weatherController.getWeatherForecast);