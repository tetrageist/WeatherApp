import React from "react";
import weather from "../images/clear.png";
import OhioTempDiff from "./OhioTempDiff";

const Display = ({ currentTemp, shortForecast }) => {
  return (
    <div>
      <p className="text-2xl text-center font-bold pb-2">
        It's fine for now, stay home
      </p>
      <div className="flex justify-center items-center bg-blue-100 p-6">
        <div className="flex items-center">
          <div>
            <img src={weather} alt="weather img" />
          </div>
          <div className="ml-4">
            <p className="text-center text-sm uppercase font-semibold pb-2">
              Seattle, WA
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
            <OhioTempDiff localTemp={currentTemp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
