const WeatherLocation = "Nador";

async function getWeatherData(WeatherLocation){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${WeatherLocation}?unitGroup=metric&include=days%2Ccurrent&key=YY5KXEMSNCSTRC4K7AD94FQ97&contentType=json`);
    const jsonResponse = await response.json();
    const weatherData = weatherObject(jsonResponse);
    console.log(weatherData);
}

function weatherObject(jsonResponse){
    let day = jsonResponse.days[0].datetime;
    let conditions = jsonResponse.days[0].conditions;
    let feelslike = jsonResponse.days[0].feelslike;
    let humidity = jsonResponse.days[0].humidity;
    let temp = jsonResponse.days[0].temp;
    return { day, conditions, feelslike, humidity, temp }
}

getWeatherData(WeatherLocation);
