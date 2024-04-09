import React from "react";
import weather from "../images/clear.png";
import OhioTempDiff from "./OhioTempDiff";

const Display = ({ currentTemp, shortForecast,  probabilityOfPrecipitation,
  dewpoint,
  humidity,
  windspeed,
  winddir }) => {
  return (
    <div className='bg-lightdark text-white border border-gray-700'>
      
      <div className="flex justify-center items-center p-6">
        <div className="flex flex-wrap items-center justify-center">
          <div>
            <img src={weather} alt="weather img" />
          </div>
          <div className="ml-4">
            <p className="text-center text-sm uppercase font-semibold pb-2">
              where the heck are you?
            </p>
            <p className="text-5xl font-bold text-center pb-2">
              {currentTemp}°
            </p>
            <p className="text-center text-sm uppercase font-semibold">
              {shortForecast}
            </p>
            <div className="flex gap-4 justify-center">
              <p>H:48°</p>
              <p>L:41°</p>
            </div>
            <p className="text-2xl text-center font-bold pb-2">
        The weather always sucks here.
      </p>
            <OhioTempDiff localTemp={currentTemp} />
          </div>
        </div>
      </div>
      {/* {probabilityOfPrecipitation}
  {dewpoint}
  {humidity}
  {windspeed}
  {winddir} */}
    </div>
  );
};

export default Display;
