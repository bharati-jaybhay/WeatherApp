const apikey = "3ffdca5caf68f30e123241dcb4821fcc";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

function checkweather(city = "mumbai") {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiurl + city + `&appid=${apikey}`, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
      } else if (xhr.status == 200) {
        const data = JSON.parse(xhr.responseText);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
          weathericon.src = "img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
          weathericon.src = "img/clear.png";
        } else if (data.weather[0].main == "Rain") {
          weathericon.src = "img/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
          weathericon.src = "img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
          weathericon.src = "img/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
      }
    }
  };

  xhr.send();
}

searchBtn.addEventListener("click", () => {
  checkweather(searchBox.value);
});

checkweather();