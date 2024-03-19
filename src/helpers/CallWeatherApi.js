export const callWeatherApi = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`,
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data = await response.json();
  const forecastURL = data.properties.forecastHourly;
  const gridURL = data.properties.forecast;
  const forecastResponse = await fetch(forecastURL);
  const gridResponse = await fetch(gridURL);
  if (!forecastResponse.ok || !gridResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return [await forecastResponse.json(), await gridResponse.json()];
};
