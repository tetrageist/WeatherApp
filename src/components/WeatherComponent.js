import React, { useState, useEffect } from 'react';
import Display from './Display';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const getWeatherData = async (latitude, longitude) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      const forecastURL = data.properties.forecastHourly;
      const gridURL = data.properties.forecast;
      const forecastResponse = await fetch(forecastURL);
      const gridResponse = await fetch(gridURL);
      if (!forecastResponse.ok || !gridResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const forecastData = await forecastResponse.json();
      const gridData = await gridResponse.json();
      setWeatherData({ forecast: forecastData.properties.periods, grid: gridData.properties.periods });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  // Get the current forecast period
  const currentForecast = weatherData.forecast[0];
  const currentGrid = weatherData.grid[0];

  return (
    <div>
    <Display currentTemp={currentForecast.temperature} shortForecast={currentForecast.shortForecast}/>
      <h2>Current Weather Details</h2>
      <ul>
        <li><strong>Temperature:</strong> {currentForecast.temperature} {currentForecast.temperatureUnit}</li>
        <li><strong>Probability of Precipitation:</strong> {currentForecast.probabilityOfPrecipitation.value} {currentForecast.probabilityOfPrecipitation.unit}</li>
        <li><strong>Dewpoint:</strong> {currentForecast.dewpoint.value} {currentForecast.dewpoint.unit}</li>
        <li><strong>Relative Humidity:</strong> {currentForecast.relativeHumidity.value} {currentForecast.relativeHumidity.unit}</li>
        <li><strong>Wind Speed:</strong> {currentForecast.windSpeed}</li>
        <li><strong>Wind Direction:</strong> {currentForecast.windDirection}</li>
        <li><strong>Short Forecast:</strong> {currentForecast.shortForecast}</li>
        <li><strong>Detailed Forecast:</strong> {currentForecast.detailedForecast}</li>
      </ul>
    </div>
  );
};

export default WeatherComponent;



