var cityForm = document.querySelector("#city-form");
var citySearch = document.querySelector("#city-search");
var searchBtn = document.querySelector("#search-btn");
var recentCityEl = document.querySelector("#recent-cities");
var forecastDiv = document.querySelector("#forecastDiv")
var citySave = new Array();


var formHandler = function(event)
{
    event.preventDefault();

    var cityName = citySearch.value.trim();
    if (cityName)
    {
        getCurrentWeather(cityName);
        getForecast(cityName);
    }
};

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
                

                var uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=af8fc128c23bcd35c1ad013855d92758";

                fetch(uvApiUrl).then(function(response)
                {
                    if (response.ok)
                    {
                        response.json().then(function(uvData)
                        {
                            var uvIndex = uvData.value;



                            displayWeather(data, uvIndex);
                            saveCity(city);
                            loadCities();
                        });
                    }

                
                });
            });
        }
        
    });
    
    
};

var displayWeather = function(data, index)
{
    var temp = document.querySelector("#current-temp");
    var wind = document.querySelector("#current-wind-speed");
    var humidity = document.querySelector("#current-humidity");
    var currCity = document.querySelector("#current-city");
    var currUv = document.querySelector("#current-uv");
    var currentCity = data.name;


    currCity.textContent = currentCity + " " + moment().format("MM-DD-YYYY");
    temp.textContent = Math.round(data.main.temp);
    wind.textContent = Math.round(data.wind.speed);
    humidity.textContent = data.main.humidity;
    currUv.textContent = index;

    // style UV
    if(index <= 2)
    {
        currUv.className = "badge badge-success";
    }
    else if (index <= 5)
    {
        currUv.className = "badge badge-warning";
    }
    else if (index <= 7)
    {
        currUv.className = "badge badge-danger"
    }
    
};

var getForecast = function(city)
{
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=af8fc128c23bcd35c1ad013855d92758"

    fetch(forecastApiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                displayForecast(data);
                console.log(data);
            });
        }
    });
};

var displayForecast = function(data)
{

    forecastDiv.innerHTML = "";

    for (var i = 1; i < 6; i++)
    {
        // creates div for card
        var forecastCol = document.createElement("div");
        forecastCol.className = "col";
        forecastDiv.appendChild(forecastCol);

        // creates card for temp and humidity
        var forecastCard = document.createElement("div");
        forecastCard.className = "card";
        forecastCol.appendChild(forecastCard);

        var forecastDate = moment().add(i, 'd').format("MM/DD/YYYY");

        // append date
        var forecastDates = document.createElement("h5");
        forecastDates.id = "date";
        forecastDates.textContent = forecastDate;
        forecastCard.appendChild(forecastDates);

        // append icon
        var forecastImg = document.createElement("img")
        forecastImg.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
        forecastImg.className = "align-middle";
        forecastCard.appendChild(forecastImg);

        // append temp
        var forecastTemp = document.createElement("p");
        forecastTemp.id = "forecast-temp";
        forecastTemp.textContent = "Temp: " + Math.round(data.list[i].main.temp) + " F";
        forecastCard.appendChild(forecastTemp);

        // append humidity
        var forecastHumidity = document.createElement("p");
        forecastHumidity.id = "forecast-Humidity";
        forecastHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        forecastCard.appendChild(forecastHumidity);
    }
};

var saveCity = function(city)
{
    citySave.push(city);
    localStorage.setItem("cities", JSON.stringify(citySave));
};

var loadCities = function()
{
    
    recentCityEl.innerHTML = "";
    citySave = JSON.parse(localStorage.getItem("cities"));

    if (citySave && citySave.length > 0)
    {
        var newCities = [...new Set(citySave)];
        for(var i = 0; i < newCities.length; i++)
        {
            var recentCities = document.createElement("button");
            recentCities.className = "list-group-item";
            recentCities.setAttribute("value", newCities[i]);
            recentCities.textContent = newCities[i];
            recentCityEl.appendChild(recentCities);
        }
    } 
};

if(localStorage.getItem("cities"))
{
    loadCities();
}
cityForm.addEventListener("submit", formHandler);
