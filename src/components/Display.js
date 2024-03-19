import React from "react";
import weather from "../images/clear.png";
import data from "../data/commentData"; // Import the data file

const Display = ({ currentTemp, shortForecast }) => {
  // Find the closest match to the short forecast in the data array
  const matchingData = data.reduce((closestMatch, item) => {
    if (shortForecast.toLowerCase().includes(item.class) && (!closestMatch || item.class.length > closestMatch.class.length)) {
      return item;
    }
    return closestMatch;
  }, null);
  console.log(matchingData);

  return (
    <div>
      <p className="text-2xl text-center font-bold pb-2">
        {matchingData ? matchingData.body : "It's fine for now, stay home"}
      </p>
      <div className="flex justify-center items-center bg-blue-100 p-6">
        <div className="flex items-center">
          <div>
            {/* Use the matching image */}
            <img src={matchingData ? require(`../images/${matchingData.image}`).default : weather} alt="weather img" />
          </div>
          <div className="ml-4">
            <p className="text-center text-sm uppercase font-semibold pb-2">
              Seattle, WA
            </p>
            <p className="text-5xl font-bold text-center pb-2">{currentTemp}°</p>
            <p className="text-center text-sm uppercase font-semibold">{shortForecast}</p>
            <div className="flex gap-4 justify-center">
              <p>H:48°</p>
              <p>L:41°</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;

