
var cityInputEl = $("#city-input")
var searchBtn = $(".search-button")
var cityList = $(".city-history-list")
var resultsContainer = $("#weather-container")
var apiKey = "a423367b058d27c22f68ab307a3b9726";

var currentCity = "";
var lastCity = "";



var getWeather = (event) => {
  var city = cityInputEl.val();
  currentCity = city;

  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" +"&appid=" + apiKey;
  console.log(apiUrl);
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        alert('Error' + response.statusText);
      }
      return response;
    })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // Save city to local storage
      saveCity(city);
      cityList.text("");

      //Create icon for current weather 
      var currentIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

      // setting time and timezone with moment js 
      var currentTimezone = response.timezone;
      var currentTimezoneHrs = currentTimezone / 60 / 60;
      var currentMoment = moment.unix(response.dt).utc().utcOffset(currentTimezoneHrs);

      // render city list 
      renderCity();

      //obtain 5 day forecast 
      getFiveDayForecast(event);

      //Weather results display for searched cities 
      //city name,
      //the date, 
      //an icon representation of weather conditions, 
      //the temperature,
      //the humidity, 
      //the wind speed
      var currentWeather = `
  <h2> ${response.name} ${currentMoment.format("(DD/MM/YYYY)")}<img src="${currentIcon}"></h2>
  <ul class= "weatherList">
  <li>Temperature: ${response.main.temp}&#8451;</li>
  <li>Humidity: ${response.main.humidity}%</li>
  <li>Wind Speed: ${response.wind.speed}m/s</li>
  </ul> `;
      //Appending the display to html
      $("#current-weather").append(currentWeather);

    })
};

var getFiveDayForecast = (event) => {
  var city = cityInputEl.val();
  var fivedayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + apiKey;

  fetch(fivedayUrl)
    .then((response) => {
      if (!response.ok) {
        alert ('Error' + response.statusText);
      }
      return response;
    })
    .then((response) => {
      return response.json();
    })

    .then((response) => {
     var fiveDayWeather = `
     <h3>5-Day Forecast:</h3>
     <div id="fiveDayForecast" class="d-inline-flex flex-wrap">`;
     
      for (let i = 0; i < response.list.length; i++) {
        var cityData = response.list[i];
        var dayTime = cityData.dt;
        var cityTimeZone = response.city.timezone;
        var cityTimeZoneHrs = cityTimeZone / 60 / 60;
        var cityMoment = moment.unix(dayTime).utc().utcOffset(cityTimeZoneHrs);
        var iconUrl = "https://openweathermap.org/img/w/" + cityData.weather[0].icon + ".png";

        //setting time to display as mid-day
        if (cityMoment.format("HH:mm:ss") === "11:00:00" || cityMoment.format("HH:mm:ss") === "12:00:00" || cityMoment.format("HH:mm:ss") === "13:00:00") {

          //5-day forecast that displays 
          //the date, 
          //an icon representation of weather conditions, 
          //the temperature, 
          //the wind speed
          //the humidity
          var fiveDayWeather = `
        <div class = "weather-card card m-2 p0">
        <ul class = "weatherList p-3">
        <li>${cityMoment.format("DD/MM/YYYY")}</li>
        <li class= "weather-icon"> <img scr= "${iconUrl}"></li>
        <li> Temperature:${response.main.temp}&#8451;</li>
        <li>Humidity:${response.main.humidity}%</li>
        <li>Wind Speed:${response.wind.speed}m/s</li>
        </ul>
        </div>`;
        }
      }

      $("#5-day-forecast").append(fiveDayWeather);
    })
}

var saveCity = (newCity) => {
  var cityExists = false;
  // Check for double ups /if city already exisits 
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage["cities" + i] === newCity) {
      cityExists = true;
      break;
    }
  }
  //  if not, saves to local storage  
  if (cityExists === false) {
    localStorage.setItem("cities" + localStorage.length, newCity);
  }
}

// render list of search cities 
var renderCity = () => {
  cityList.empty();

  // if local storage is empty 
  if (localStorage.length === 0) {
    if (lastCity) {
      cityList.attr("value", lastCity);
    } else {
      cityList.attr("value", "Melbourne");
    }
  } else {
    // Build key of last city written to local storage 
    var lastCityKey = "cities" + (localStorage.length - 1);
    lastCity = localStorage.getItem(lastCityKey);

    //set search input to last city searched
    cityList.attr("value", lastCity);

    //append sotred cities to page 
    for (let i = 0; i < localStorage.length; i++) {
      var city = localStorage.getItem("citiies" + i);
      var cityEl;

      // set to lastCity if currentCity not set 
      if (currentCity === "") {
        currentCity = lastCity;
      }

      // Set button class to active for currentCity
      if (city === currentCity) {
        cityEl = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
      } else {
        cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
      }
      // Append city to page
      cityList.prepend(cityEl);
    }
    // Add a "clear" button to page if there is a cities list
    if (localStorage.length > 0) {
      $('#clear-storage').html($('<a id="clear-storage" href="#">clear</a>'));
    } else {
      $('#clear-storage').html('');
    }

  }
}



// New city search button event listener
searchBtn.on("click", (event) => {
  event.preventDefault();
  currentCity = cityInputEl.val();
  getWeather(event);
});

// Old searched cities buttons event listener
cityList.on("click", (event) => {
  event.preventDefault();
  cityInputEl.val(event.target.textContent);
  currentCity = cityInputEl.val();
  getWeather(event);
});

// Clear old searched cities from localStorage event listener
$("#clear-storage").on("click", (event) => {
  localStorage.clear();
  renderCity();
});

// Render the searched cities
renderCity();

// Get the current conditions (which also calls the five day forecast)
getWeather();



