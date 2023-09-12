// WeatherIcon.js
import React from 'react';
import './WeatherIcon.css';

const WeatherIcon = ({ condition }) => {
  let iconClass = '';

  switch (condition) {
    case 'Clear':
      iconClass = 'sunny';
      break;
    case 'Clouds':
      iconClass = 'cloudy';
      break;
    default:
      iconClass = 'default';
  }

  return <div className={`weather-icon ${iconClass}`} />;
};

export default WeatherIcon;