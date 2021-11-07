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

function currentyear(getFullYear) {
  let month = [
    "Jan",
    "Fen",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let months = month[now.getMonth()];
  let dates = now.getDate();
  if (dates < 10) {
    dates = `0${dates}`;
  }
  return `${months}-${dates}`;
}
let dat = document.querySelector(".date");
dat.innerHTML = currentyear(now);

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
      forecastHTML =
        forecastHTML +
        `<div class="btn-group-vertical">
        <span class="col-12" id="tablerow">
        <div class="row">
        <span class="col-5">
  <span class="weatherforecastdate">${formatDay(forecastDay.dt)}</span>
  </span>
  <span class="col-5">
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="" width="45" class="weatherimg" /></span>
<span class="col-1"><span class="weatherforecasttemp"><span class="weatherforecastmax">${Math.round(
          forecastDay.temp.max
        )}°</span></span>
<span class="col-1"><span class="weatherforecastmin">${Math.round(
          forecastDay.temp.min
        )}°</span></span>
</span>
</div>
</span>
<hr />
</div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getforecast(coordinates) {
  let ApiKey = "f02bf8b085f29f8504d48daf88ff0017";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${ApiKey}&units=metric`;
  axios.get(ApiUrl).then(displayforecast);
}

function showTemperature(response) {
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
  celisusetemp = response.data.main.temp;
  let temp = document.querySelector(".temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
  let iconelement = document.querySelector("#icon");
  iconelement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconelement.setAttribute("alt", response.data.weather[0].description);
  getforecast(response.data.coord);
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

function displayfahrenhiet(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  celisuselink.classList.remove("active");
  fahrenhietlink.classList.add("active");
  let fahrenhiettemp = (celisusetemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenhiettemp);
}

function displaycelisius(event) {
  event.preventDefault();
  celisuselink.classList.add("active");
  fahrenhietlink.classList.remove("active");
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round(celisusetemp);
}

let celisusetemp = null;

let form = document.querySelector("#searchcity");
form = addEventListener("submit", findcity);

let fahrenhietlink = document.querySelector("#fahrenhite");
fahrenhietlink.addEventListener("click", displayfahrenhiet);

let celisuselink = document.querySelector("#celsiuse");
celisuselink.addEventListener("click", displaycelisius);

searchcity("Tehran");
