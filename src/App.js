import "./App.css";
import Search from "./components/Search";
import WeatherComponent from "./components/WeatherComponent";
import React, { useState, useEffect } from "react";

function App() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div>
      <h1 className="title text-3xl bg-blue-100 text-primary p-6 text-center">
        weatherApp&reg;
      </h1>
      <p className="p-6"> hello, maybe we put a field here for city name?</p>
      <Search />
      <WeatherComponent
        longitude={location.longitude}
        latitude={location.latitude}
      />
      <div className="p-6 flex justify-around font-semibold border rounded-xl shadow">
        <div>The weather today</div>
        <div>60 degrees</div>
      </div>
    </div>
  );
}

export default App;
