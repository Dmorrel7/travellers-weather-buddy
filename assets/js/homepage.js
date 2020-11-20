var cityForm = document.querySelector("#city-form");
var citySearch = document.querySelector("#city-search");
var searchBtn = document.querySelector("#search-btn");

var formHandler = function(event)
{
    event.preventDefault();

    var cityName = citySearch.value.trim();
    if (cityName)
    {
        getCurrentWeather(cityName);
    }
}

var getCurrentWeather = function(city)
{
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=af8fc128c23bcd35c1ad013855d92758";

    fetch(apiUrl).then(function(response)
    {
        if (response.ok)
        {
            // parse the fetch to json format
            response.json().then(function(data)
            {
                displayWeather(data)
                console.log(data);
            });
        }
    });
};

var displayWeather = function(data)
{
    var temp = document.querySelector("#current-temp");
    var wind = document.querySelector("#current-wind-speed");
    var humidity = document.querySelector("#current-humidity");
    var uv = document.querySelector("#current-uv");
    var currCity = document.querySelector("#current-city");
    var currentCity = data.name;


    currCity.textContent = currentCity + " " + moment().format("MM-DD-YYYY");
    temp.textContent = Math.round(data.main.temp);
    wind.textContent = Math.round(data.wind.speed);
    humidity.textContent = data.main.humidity;

};

cityForm.addEventListener("submit", formHandler);