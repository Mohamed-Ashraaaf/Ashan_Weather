import React from 'react';
import { Card } from 'react-bootstrap';
import WeatherIcon from './WeatherIcon';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return <div>No weather data available</div>;
  }

  return (
    <Card className="weather-card">
      <Card.Body>
        <Card.Title>{weather.cityName}</Card.Title>
        <WeatherIcon condition={weather.weatherDescription} />
        <div className="weather-info">
          <p className="weather-description">{weather.weatherDescription}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity ?? 'N/A'}%</p>
          <p>Sunrise: {weather.sunrise ?? 'N/A'}</p>
          <p>Sunset: {weather.sunset ?? 'N/A'}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;