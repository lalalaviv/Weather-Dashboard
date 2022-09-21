var cityInputEl =$("#city-input")
var searchBtn = $(".search-button")
var cityList = $(".city-history-list")
var resultsContainer = $("#weather-container")
var apiKey = "a423367b058d27c22f68ab307a3b9726";

var currentDate = moment().format('M/DD/YYYY'); 
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');



$(document).ready(function(){
console.log("ready!");

// when user inputs city and submits 
searchBtn.click(function(event){
event.preventDefault();
var citySearch = cityInputEl.val();
// an array that holds history of searched cities 
var cityList = [];  

cityList = JSON.parse(localStorage.getItem("cityList")) || [];
// pushes new input cities to array
cityList.push(citySearch); 
// saves to local storage 
localStorage.setItem("cityList", JSON.stringify(cityList)); 

getWeatherForcast(citySearch); 

}); 
});   

function getWeatherForcast(citySearch){
$("#current-weather").empty();
$("#5-day-forecast").empty();
$("#day1").empty();
$("#day2").empty();
$("#day3").empty();
$("#day4").empty();
$("#day5").empty();

var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch +"&units=imperial" + "&appid=" + apiKey;
 console.log("forecastToday", apiUrlCurrent); 

 fetch(apiUrlCurrent)
  .then(function(response){

    var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; //icon url 
    var lat = response.coord.lat; // Latiude 
    var lon = response.coord.lon; // Longitude 

    //Adding data under current-weather div container 
    $("#current-weather").append(
      "<div class = 'col s12 m6'>"
      +  "<h2 class='daily'>" + response.name + " (" + currentDate + ")" + "&nbsp" + "<img src='" + iconUrl  + "'>" + "</h2>"
      +  "<ul class='daily'>" + "Temperature: " +  response.main.temp + " °F" + "</ul>"
      +  "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
      +  "<ul class='daily'>" + "Wind Speed: " +  response.wind.speed + " MPH" + "</ul>"
      + "</div>"
      ); 
})

  // QueryURL to Open Weather App 
  var fiveUrl = "https://api.openweathermap.org/data/2.5/onecall?" 
  + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=45e45c0bb2ef540df33fa21a29aafa8a";  
    console.log("fiveDay", fiveDay);

   //AJAX call for Five Day & UV
  $.ajax({
    url: fiveDay,
    method: "GET",
    }).then(function(response) {
      
      //icon urls
      var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
      var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
      var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
      var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
      var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";
   
      // Adding in UV Index to daily weather 
      $("#dailyWeather").append(
        "<div class='col s12 m6'>"
       + "<button class='w3-button' id='uvIndex' class='daily'>" + "UV Index: " + response.current.uvi + "</button>"
       + "</div>"
       ); // End of append 

      // UV Index colors 
      if (response.current.uvi <= 2) {
        $("#uvIndex").addClass("green");
       } else if (response.current.uvi <= 5) {
         $("#uvIndex").addClass("yellow");
       } else if (response.current.uvi <= 7) {
           $("#uvIndex").addClass("orange");
       } else if (response.current.uvi <= 10) {
           $("#uvIndex").addClass("red");
       } else if (response.current.uvi <= 40) {
           $("#uvIndex").addClass("purple");
       };

      // HEADER
      $("#fiveDay").append(
        "<div class='col-md-12'>"
       + "<h2 id='fiveDay'>" + "5-Day Forecast:" + "</h2>" 
      ); // End of append 

       // DAY ONE DETAILS
      $("#day1").append(
       "<div class='fiveDayCard card col s12 m6'>"
       +  "<div class='card-body'>"
       +  "<div class='card-header'>" + day1 +"</div>"
       +  "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" +"</div>"
       +  "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
       +  "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>" 
       + "</div>" 
      ); // End of append 

      //DAY TWO DETAILS
      $("#day2").append(
        "<div class='fiveDayCard card col s12 m6'>"
        +  "<div class='card-body'>"
        +  "<div class='card-header'>" + day2 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>" 
        + "</div>" 
      ); // End of append 

      //DAY THREE DETAILS
      $("#day3").append(
        "<div class='fiveDayCard card col s12 m6'>"
        +  "<div class='card-body'>"
        +  "<div class='card-header'>" + day3 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temp: " + response.daily[2].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>" 
        + "</div>" 
      ); // End of append 

      //DAY FOUR DETAILS
      $("#day4").append(
        "<div class='fiveDayCard card col s12 m6'>"
        +  "<div class='card-body'>"
        +  "<div class='card-header'>" + day4 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconUrl4 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temp: " + response.daily[3].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[3].humidity + "%" + "</div>" 
        + "</div>" 
      ); // End of append 

      //DAY FIVE DETAILS
      $("#day5").append(
        "<div class='fiveDayCard card col s12 m6'>"
        +  "<div class='card-body'>"
        +  "<div class='card-header'>" + day5 +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temp: " + response.daily[4].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>" 
        + "</div>" 
      ); // End of append 
      
      showCities(); // calls function to append cities
      }) // End of ajax then response  
    }) // End of ajax then response 
  } // end of show weather function 

//  Function to retrieve the stored input that was saved in each input 
function showCities() {
  $("#cityButtons").empty(); // empties out previous array 
  var arrayFromStorage = JSON.parse(localStorage.getItem("allCities")) || []; // Makes all cities searched a string
  var arrayLength = arrayFromStorage.length; // limits length of array

  for (var i = 0; i < arrayLength; i++) { // Loop so it prepends all cities within the length of the array
    var cityNameFromArray = arrayFromStorage[i]; //

    $("#cityButtons").append (
      //styling 
      "<div class='list-group'>"
  
    // City text
    + "<button class='list-group-item'>" + cityNameFromArray 
    + "</button>")
  } // end of loop 
} // end of showCities function 

showCities (); // calls function to append cities upon page load 

// show cities on click 
$("#cityButtons").on("click", ".list-group-item", function(event) {
  event.preventDefault();
  var cityInput = ($(this).text());
  showWeather(cityInput); 
}) // end of city buttons on click

// end of document ready function