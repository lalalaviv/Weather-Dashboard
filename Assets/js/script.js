
var cityInputEl = document.querySelector("#city-input")
var searchBtn = document.querySelector(".searchBtn")
var cityList = document.querySelector(".city-history-list")
var resultsContainer = document.querySelector("#weather-container")
var apiKey = "a423367b058d27c22f68ab307a3b9726";
var citySearch = cityInputEl.value.trim()


searchBtn.addEventListener('submit',formSubmitHandler);

var formSubmitHandler = function(event){
event.preventDefault();


if (!citySearch){
    console.error('Please enter a city name!');
    return;
}
var apiUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + citySearch + "&limit=1&appid=" + apiKey;

fetch(apiUrlCity)
.then((response) => response.json())
  .then((data) => console.log(data.name));
}
// .then(function(response){
//     console.log(response)
//     return response.json();
// })

    // .then(function(data){
    // console.log(data.name)
    // });
//}
// if (citySearch){
//     getCityWeather(citySearch); 

//     resultsContainer.textContent = "";
//     cityInputEl.value = "";
// }else{
//     alert("Please enter a city");
// }
// }; 

// // var displayCity = function(){
// //     var cityBtn = document.createElement("button").addClass("btn btn-secondary btn-lg"); 
// //     cityList.append(cityBtn); 
// //     cityBtn.textContent = citySearch
// //     }



// // var getCityWeather = function(name){
// var apiUrlCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInputEl + "&limit=1&appid=" + apiKey;

// fetch(apiUrlCity)
// .then(function(response){
//     console.log(response)
//     return response.json();
// })

//     .then(function(data){
//     console.log(data.name)
//     });




//city name, 
//the date, 
//an icon representation of weather conditions, 
//the temperature,
//the humidity, 
//the wind speed
//the UV index

//color that indicates whether the conditions are favorable, moderate, or severe


//5-day forecast that displays 
//the date, 
//an icon representation of weather conditions, 
//the temperature, 
//the wind speed
//the humidity

