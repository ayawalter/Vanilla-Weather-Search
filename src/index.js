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

function showWeather(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

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
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apikey = "85890638d00975101c866cb82a4d3716";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apikey}`;
  axios.get(apiUrl).then(showWeather);
}

let lastUpdate = document.querySelector("#current-date-time");
let now = new Date();
lastUpdate.innerHTML = formatDate(now);

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);
