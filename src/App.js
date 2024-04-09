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
  
    // let weatherComponent = <WeatherComponent longitude={location.longitude} latitude={location.latitude}/>;
  
  return (
    <div className='bg-dark h-screen'>
      <h1 className="title text-3xl bg-lightdark border-b border-gray-700 text-primary p-6 text-center">
        weatherApp&reg;
      </h1>
      <Search setLocation={setLocation} />
      <WeatherComponent location={location}/>
      {/* <div className="p-6 flex justify-around font-semibold border rounded-xl shadow">
        <div>The weather today</div>
        <div>60 degrees</div>
      </div> */}
    </div>
  );
}

export default App;
