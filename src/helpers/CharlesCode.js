function MakeHTTP(url, reply) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      reply(xhr.response);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
}

function WriteOut(str) {
  document.getElementById("output").innerHTML += "<p>" + str + "</p>";
}

function getMinMaxAndData(periods, field) {
  var minp = 10000;
  var maxp = -10000;
  var values = [];

  var fieldSections = field.split(".");
  if (fieldSections == undefined) fieldSections = [field];

  for (var i = 0; i < periods.length; i++) {
    var obj = periods[i];
    for (f in fieldSections) {
      obj = obj[fieldSections[f]];
    }
    let p = parseInt(obj);
    values.push(p);
    if (p < minp) minp = p;
    if (p > maxp) maxp = p;
  }
  return [minp, maxp, values];
}

var forecastData = null;
var icons = [];
var iconTimeout = null;
function gotImage() {
  if (iconTimeout == null)
    iconTimeout = setTimeout(function () {
      HourlyForecast(null);
    }, 100);
}

function HourlyForecast(data) {
  var firstRender = false;
  if (data != null) {
    firstRender = true;
    forecastData = data;
    icons = [];
  } else {
    data = forecastData;
  }

  iconTimeout = null;

  let periods = data.properties.periods;
  //WriteOut( JSON.stringify( periods ) );
  //console.log( data );

  var canvas = document.getElementById("outputCanvas");
  var width = canvas.width;
  var height = canvas.height;
  var sper = width / periods.length;

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var lines = [
    "temperature",
    "probabilityOfPrecipitation.value",
    "dewpoint.value",
    "relativeHumidity.value",
    "windSpeed",
  ];
  var friendlyNames = ["Â°F", "% percip", "dewpoint", "humidity", "windspeed"];
  var forceMinMax = [false, true, false, true, false];
  var lineStyles = ["black", "blue", "skyblue", "green", "grey"];

  var graphHeight = height - 100;
  var margin = 50;
  var datas = [];
  for (var line = 0; line < lines.length; line++) {
    datas.push(getMinMaxAndData(periods, lines[line]));
  }

  if (firstRender) {
    for (var i = 0; i < periods.length; i += 2) {
      let icon = new Image();
      icon.src = periods[i].icon;
      icon.onload = gotImage;
      icon.opos = i;
      icons.push(icon);
    }
  }

  for (var i = 0; i < icons.length; i++) {
    let icon = icons[i];
    if (!icon.width) continue;
    let data = datas[0];
    let p = data[2][icon.opos];
    let y = ((data[1] - p) / (data[1] - data[0])) * graphHeight + margin;
    let rtx = Math.sin(i * 32.45) * 6.28;
    let tx = icon.opos * sper;
    let ty = y + 1;
    ctx.translate(tx, ty);
    ctx.rotate(rtx);
    ctx.drawImage(icon, -icon.width / 2, -icon.height / 2);
    ctx.rotate(-rtx);
    ctx.translate(-tx, -ty);
  }

  for (var line = 0; line < lines.length; line++) {
    var friendlyName = friendlyNames[line];
    ctx.strokeStyle = lineStyles[line];

    ctx.beginPath();
    let data = datas[line];

    if (forceMinMax[line]) {
      data[0] = 0;
      data[1] = 100;
    }

    for (var i = 0; i < periods.length; i++) {
      let p = data[2][i];
      let x = i * sper;
      let y = ((data[1] - p) / (data[1] - data[0])) * graphHeight + margin;

      if (i == 0) ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.moveTo(0, margin - 2);
    ctx.lineTo(width, margin - 2);
    ctx.stroke();
    ctx.font = "48px serif";
    ctx.strokeText(data[1], line * 200, margin - 4);
    ctx.stroke();

    ctx.moveTo(0, height - margin + 2);
    ctx.lineTo(width, height - margin + 2);
    ctx.stroke();
    ctx.font = "48px serif";
    ctx.strokeText(data[0], line * 200, height - 4);
    ctx.stroke();

    ctx.font = "24px serif";
    ctx.strokeText(friendlyName, line * 200 + 50, height - 20);
    ctx.stroke();
  }
}

function Forecast(data) {
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");
  tbl.border = 1;
  var periods = data.properties.periods;

  var tr = document.createElement("tr");
  var name = document.createElement("th");
  name.innerHTML = "Time";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Period";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "isDaytime";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Temperature";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Percipitation %";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Dewpoint";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Humidity %";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Wind Speed";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Wind Direction";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Short Forecast";
  tr.appendChild(name);
  var name = document.createElement("th");
  name.innerHTML = "Detialed Forecast";
  tr.appendChild(name);
  tblBody.appendChild(tr);

  for (var pid in periods) {
    var p = periods[pid];
    var tr = document.createElement("tr");
    var name = document.createElement("td");
    name.innerHTML = p.startTime + "<br>" + p.endTime;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.name;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.isDaytime;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.temperature + p.temperatureUnit;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.probabilityOfPrecipitation.value;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = ((p.dewpoint.value * 9) / 5 + 32).toFixed(0);
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.relativeHumidity.value;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.windSpeed;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.windDirection;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.shortForecast;
    tr.appendChild(name);
    var name = document.createElement("td");
    name.innerHTML = p.detailedForecast;
    tr.appendChild(name);
    tblBody.appendChild(tr);
  }

  tbl.appendChild(tblBody);
  document.getElementById("Forecast").appendChild(tbl);
}

function GotWeatherGrid(data) {
  WriteOut(JSON.stringify(data.properties.forecastHourly));
  console.log(data);
  MakeHTTP(data.properties.forecastHourly, HourlyForecast);
  MakeHTTP(data.properties.forecast, Forecast);
}

function GotLatLong(data) {
  let geo = data.locations[0].feature.geometry;
  WriteOut("Is at: " + geo.y + ", " + geo.x);

  MakeHTTP(
    "https://api.weather.gov/points/" + geo.y + "," + geo.x,
    GotWeatherGrid,
  );
}
