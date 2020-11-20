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
                console.log(data);
            })
        }
    });
}

cityForm.addEventListener("submit", formHandler);