import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import WeatherCard from './WeatherCard';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState('metric'); // 'metric' corresponds to Celsius

  // Function to get weather data by city name
  const getWeatherByCity = useCallback(async (cityName) => {
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${cityName}&units=${unit}`);
      console.log('Weather Response:', response.data);
      setWeatherData(response.data);

      // Fetch weather forecast data
      const forecastResponse = await axios.get(`http://localhost:5000/api/forecast?city=${cityName}&units=${unit}`);
      console.log('Forecast Response:', forecastResponse.data);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch weather data. Please check your input and try again.');
    }
  }, [unit]);

  useEffect(() => {
    // Try to get the user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Fetch weather data using user's geolocation coordinates
        axios
          .get(`http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}&units=${unit}`)
          .then((response) => {
            console.log('Weather Response:', response.data);
            setCity(`${response.data.name}, ${response.data.sys.country}`);
            setWeatherData(response.data);
          })
          .catch((error) => {
            console.error('Error:', error);
            setError('Failed to fetch weather data for your location.');
          });
      });
    } else {
      // Geolocation not available, you can provide a fallback mechanism here
    }
    // eslint-disable-next-line
  }, [unit]);

  useEffect(() => {
    // Add an initial load of weather data here if needed
    getWeatherByCity();
  }, [getWeatherByCity]);

  return (
    <div className="app-container">
      <h1>Mesho Weather</h1>
      <p className="project-description">For anyone interested in weather</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (city) {
            getWeatherByCity(city);
          }
        }}
      >
        <label>
          Enter City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      <div className="unit-conversion">
        <button onClick={() => setUnit('metric')}>Celsius</button>
        <button onClick={() => setUnit('imperial')}>Fahrenheit</button>
      </div>
      {weatherData && (
        <div className="weather-card-container">
          <WeatherCard weather={weatherData} unit={unit} />
        </div>
      )}
      {error && <p>{error}</p>}
      {forecastData.length > 0 && (
        <div className="forecast-container">
          <h2>Weather Forecast for the Next Few Days</h2>
          <div className="forecast-cards">
            {forecastData.map((day, index) => (
              <WeatherCard key={index} weather={day} unit={unit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;