import { callWeatherApi } from "../helpers/CallWeatherApi";
import React, { useState, useEffect } from "react";

export default function _({ localTemp }) {
  let [diff, setDiff] = useState(null);

  useEffect(() => {
    async function getDiff() {
      const response = await callWeatherApi(39.9613011, -83.0019235);
      let ohioTemp = response[0].properties.periods[0].temperature;
      return localTemp - ohioTemp;
    }

    getDiff().then((x) => setDiff(x));
  }, [localTemp]);

  return (
    <div>
      Your current temp is {diff} degrees hotter than ohio (its all ohio)
    </div>
  );
}
