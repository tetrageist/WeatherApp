// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App2 from './App2'; // Import App2 instead of App
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <App2 />
    </React.StrictMode>,
    document.getElementById('root')
);

// src/Weather.js
import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';

dotenv.config();

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = process.env.REACT_APP_WEATHERBIT_API_KEY;
    const city = 'Bellevue, WA'; // Replace with the desired city

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [apiKey, city]);

    return (
        <div>
            <h2>Weather Information</h2>
            {weatherData && (
                <div>
                    <p>Temperature: {weatherData.data[0].temp}°C</p>
                    <p>Conditions: {weatherData.data[0].weather.description}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    );
};

export default Weather;