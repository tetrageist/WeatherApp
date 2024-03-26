import "./App.css";
import Search from "./components/Search";
import WeatherComponent from "./components/WeatherComponent";
import React, { useState, useEffect } from "react";

function App() {
  const [location, setLocation] = useState({});

 // const updateLocation = (lat, long) => { setLocation( lat, long ); }

  const updateLocation = (updatedState) => {
    console.log ("NEW STATE!\n");
    console.log( updatedState );
    setLocation( updatedState );
//    console.log( location );
//    console.log( location.longitude );
//    console.log( location.latitude );
//   setLocation(prevState => ({
//      ...prevState,
//      ...updatedState
//    }));
//    console.log( location.longitude );
//    console.log( location.latitude );
    
  };


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
  
  let weatherComponent = <WeatherComponent longitude={location.longitude} latitude={location.latitude}/>;
  
  return (
    <div>
      <h1 className="title text-3xl bg-blue-100 text-primary p-6 text-center">
        weatherApp&reg;
      </h1>
      <p className="p-6"> hello, maybe we put a field here for city name?</p>
      <WeatherComponent location={location}/>
      <Search updateLocation={updateLocation} />
      <div className="p-6 flex justify-around font-semibold border rounded-xl shadow">
        <div>The weather today</div>
        <div>60 degrees</div>
      </div>
    </div>
  );
}

export default App;
