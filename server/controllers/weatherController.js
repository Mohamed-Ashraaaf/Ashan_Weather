const axios = require('axios');

const API_KEY = 'c102208abd50205398f59195afc89ead';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast';

exports.getWeatherByCity = async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Change to 'imperial' for Fahrenheit
      },
    });

    const weatherData = {
      cityName: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      weatherDescription: response.data.weather[0].description,
      windSpeed: response.data.wind.speed,
      sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(),
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

exports.getWeatherForecast = async (req, res) => {
  const { city } = req.query;

  try {
    // Fetch weather forecast data from the API
    const response = await axios.get(FORECAST_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Change to 'imperial' for Fahrenheit
        cnt: 3, // Specify the number of days for the forecast (e.g., 5 for the next 5 days)
      },
    });

    // Process and send the forecast data as JSON
    const forecastData = response.data.list.map((item) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temperature: item.main.temp,
      description: item.weather[0].description,
    }));

    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather forecast data' });
  }
};