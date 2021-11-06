let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

document.querySelector(".days").innerHTML = weekdays[now.getDay()];
function currenttime(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let time = document.querySelector(".time");
time.innerHTML = currenttime(now);

function currentyear(getFullYear) {
  let year = now.getFullYear();
  let month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let months = month[now.getMonth()];
  let dates = now.getDate();
  if (dates < 10) {
    dates = `0${dates}`;
  }
  return `${year}/${months}/${dates}`;
}
let dat = document.querySelector(".date");
dat.innerHTML = currentyear(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayforecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let forecastHTML =
        forecastHTML +
        `<div class="col-2">
  <div class="weatherforecastdate">${formatDay(forecastDay.dt)}</div>
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="" width="42" />
<div class="weatherforecasttemp"><span class="weatherforecastmax">${Math.round(
          forecastDay.temp.max
        )}°</span>
<span class="weatherforecastmin">${Math.round(forecastDay.temp.min)}°</span>
</div>
</div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getforecast(coordinates) {
  let ApiKey = "f02bf8b085f29f8504d48daf88ff0017";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${ApiKey}&unite=metric`;
  axios.get(ApiUrl).then(displayforecast);
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  let cloudy = document.querySelector(".cloud");
  cloudy.innerHTML = response.data.weather[0].main;
  document.querySelector("#feellike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let temp = document.querySelector(".temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let iconelement = document.querySelector("#icon");
  iconelement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconelement.setAttribute("alt", response.data.weather[0].description);
  getforecast(response.data.coord);
  celisusetemp = response.data.main.temp;
}

function searchcity(city) {
  let ApiKey = "f02bf8b085f29f8504d48daf88ff0017";
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
  axios.get(Url).then(showTemperature);
}
function findcity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchcity").value;
  searchcity(city);
}
searchcity("Tehran");
function displaycelisius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celisusetemp);
  fahrenhietlink.classList.remove("active");
  celisuselink.classList.add("active");
}
let celisuselink = document.querySelector("#celsiuse");
celisuselink.addEventListener("click", displaycelisius);

function displayfahrenhiet(event) {
  event.preventDefault();
  let fahrenhiettemp = (celisusetemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(fahrenhiettemp);
  celisuselink.classList.remove("active");
  fahrenhietlink.classList.add("active");
}

let fahrenhietlink = document.querySelector("#fahrenhite");
fahrenhietlink.addEventListener("click", displayfahrenhiet);

let form = document.querySelector("#searchcity");
form = addEventListener("submit", findcity);
