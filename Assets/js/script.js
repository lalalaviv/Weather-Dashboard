
var cityInputEl =$("#city-input")
var searchBtn = $(".search-button")
var cityList = $(".city-history-list")
var resultsContainer = $("#weather-container")
var apiKey = "a423367b058d27c22f68ab307a3b9726";

var currentCity = ""; 
var lastCity = ""; 



var getWeather = (event) => {
var city = cityInputEl.val();
currentCity = city; 

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&APPID=" + apiKey;
fetch(apiUrl)
.then((response) =>{
if (!response.ok){
  throw Error(response.statusText);
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
  var currentTimezoneHrs = currentTimezone/60/60; 
  var currentMoment = moment.unix(response.dt).utc().utcOffset(currentTimezoneHrs); 

  // render city list 
  renderCity(); 

  //obtain 5 day forecast 
  getFiveForecast(event);

  //Weather results display for searched cities 
  var currentWeather = `
  <h3> ${response.name} ${currentMoment.format("(DD/MM/YYYY)")}<img src="${currentIcon}"></h3>
  <ul class= "weatherList">
  <li>Temperature: ${response.main.temp}&#8451;</li>
  <li>Humidity:${response.main.humidity}%</li>
  <li>Wind Speed:${response.wind.speed}m/s</li>
  <li id="uvIndex">UV Index:</li>
  </ul> `; 
//Appedning the display to html
  $("#current-weather").HTML(currentWeather);

})
};



//city name, 
//the date, 
//an icon representation of weather conditions, 
//the temperature,
//the humidity, 
//the wind speed
//the UV index

//color that indicates whether the uv index conditions are favorable, moderate, or severe


//5-day forecast that displays 
//the date, 
//an icon representation of weather conditions, 
//the temperature, 
//the wind speed
//the humidity
