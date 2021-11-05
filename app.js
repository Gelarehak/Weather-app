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

function showTemperature(response) {
  console.log(response.data);
}

function searchcity(city) {
  let ApiKey = "f02bf8b085f29f8504d48daf88ff0017";
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
  axios.get(Url).then(showTemperature);
}
function findcity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchcity").value;
  searchcity(city);
}
searchcity("Tehran");
