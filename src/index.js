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

function displayForecast() {
  let forecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2" id="weekly-weather">
      <div class="forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/10d@2x.png"
          alt="rain"
         class="forecast-icon"
          width="60"
              />
         <div class="forecast-temp">
         <span class="forecast-min-temp">8</span>
          / <span class="forecast-max-temp">14</span>°C
      </div>
       </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
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
displayForecast();
