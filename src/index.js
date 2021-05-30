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
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
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
