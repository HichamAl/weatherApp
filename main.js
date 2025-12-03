const form = document.querySelector("#form");
form.addEventListener("submit", function(event){
    event.preventDefault();
    const searchQuery = document.querySelector("#searchbox").value;
    getWeatherData(searchQuery);
})

async function getWeatherData(WeatherLocation){
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${WeatherLocation}?unitGroup=metric&include=days%2Ccurrent&key=YY5KXEMSNCSTRC4K7AD94FQ97&contentType=json`);
        const jsonResponse = await response.json();
        const weatherData = weatherObject(jsonResponse);
        console.log(weatherData);
    } catch(error) {
        console.log(error);
    }  
}

function weatherObject(jsonResponse){
    let day = jsonResponse.days[0].datetime;
    let conditions = jsonResponse.days[0].conditions;
    let feelslike = jsonResponse.days[0].feelslike;
    let humidity = jsonResponse.days[0].humidity;
    let temp = jsonResponse.days[0].temp;
    return { day, conditions, feelslike, humidity, temp }
}

