import { callWeatherApi } from "../helpers/CallWeatherApi";
import React, { useState, useEffect } from "react";

export default function _({ localTemp }) {
  let [diff, setDiff] = useState(null);
  let lastTempLocal = useState(null);

  useEffect(() => {
    async function computeLocalDiff() {
      if( lastTempLocal == localTemp ) return;
      lastTempLocal = localTemp;
      const response = await callWeatherApi(39.9613011, -83.0019235);
      let ohioTemp = response[0].properties.periods[0].temperature;
      setDiff( localTemp - ohioTemp );
    }

	computeLocalDiff();
  }, [localTemp]);

  return (
    <div>
      Your current temp is {diff} degrees hotter than ohio (its all ohio)
    </div>
  );
}
