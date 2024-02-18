function displayTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.temperature.current);

  let temperatureElement = document.querySelector(".main-temp-value");
  let cityElement = document.querySelector(".city-name");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector(".weather-icon");
  let currentDateElement = document.querySelector("#current-date");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url}>`;
  currentDateElement.innerHTML = unixTimeToRealTime(response.data.time);
  getForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "48faoe8ab18e23t93c002654f81bbf6e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function unixTimeToRealTime(unixTimestamp) {
  const timestampInMilliseconds = unixTimestamp * 1000;
  const date = new Date(timestampInMilliseconds);

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    //hour: "numeric",
    //minute: "numeric",
  };

  return date.toLocaleString(undefined, options);
}

function getForecast(city) {
  let apiKey = "48faoe8ab18e23t93c002654f81bbf6e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="row">
        <div class="col-2">
            <div class="weather-forecast-date">${unixTimeToRealTime(
              day.time
            )}</div>
            <div>
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" />
        </div>
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperatures-max"> High: ${Math.round(
              day.temperature.maximum
            )}° </span> <br>
            <span class="weather-forecast-temperature-min">Low: ${Math.round(
              day.temperature.minimum
            )}° </span>
        </div>
        </div>
        </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
getForecast("Ottawa");
