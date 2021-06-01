function formatDate(now) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2" id="weekly-weather">
      <div class="forecast-date">${formatDay(day.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt="rain"
         class="forecast-icon"
          width="60"
              />
         <div class="forecast-temp">
         <span class="forecast-min-temp">${Math.round(day.temp.min)}</span>
          / <span class="forecast-max-temp">${Math.round(day.temp.max)}</span>°C
      </div>
       </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apikey = "85890638d00975101c866cb82a4d3716";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  celcius.classList.add("active");
  celcius.classList.remove("inactive");
  fahrenheit.classList.add("inactive");
  fahrenheit.classList.remove("active");
  celciusTemp = response.data.main.temp;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celciusTemp);

  let minTemperature = document.querySelector("#today-min-temperature");
  minTemperature.innerHTML = Math.round(response.data.main.temp_min);

  let maxTemperature = document.querySelector("#today-max-temperature");
  maxTemperature.innerHTML = Math.round(response.data.main.temp_max);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let wind = document.querySelector("#windspeed");
  wind.innerHTML = Math.round((response.data.wind.speed * 60 * 60) / 1000);

  let icon = document.querySelector("#current-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let lastUpdate = document.querySelector("#current-date-time");
  let now = new Date();
  lastUpdate.innerHTML = formatDate(now);

  getForecast(response.data.coord);
}

function search(city) {
  let apikey = "85890638d00975101c866cb82a4d3716";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  axios.get(apiUrl).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apikey = "85890638d00975101c866cb82a4d3716";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  celcius.classList.add("inactive");
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  fahrenheit.classList.remove("inactive");
  let fahrenheitTemp = Math.round((celciusTemp * 9) / 5 + 32);
  let tempElement = document.querySelector("#current-temperature");
  tempElement.innerHTML = fahrenheitTemp;
}

function showCelcius(event) {
  event.preventDefault();

  celcius.classList.add("active");
  celcius.classList.remove("inactive");
  fahrenheit.classList.add("inactive");
  fahrenheit.classList.remove("active");
  let tempElement = document.querySelector("#current-temperature");
  tempElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let submit = document.querySelector("form");
submit.addEventListener("submit", submitCity);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentLocation);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", showCelcius);

search("Basel");
