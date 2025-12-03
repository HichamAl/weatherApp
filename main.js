const form = document.querySelector("#form");
const resultsDiv = document.querySelector(".results");
form.addEventListener("submit", function(event){
    event.preventDefault();
    const searchQuery = document.querySelector("#searchbox").value;
    getWeatherData(searchQuery);
})

let unitGroupWeather = "metric";
const switchToFahrenheit = document.querySelector("#Fahrenheit");
const switchToCelcius = document.querySelector("#Celcius");
switchToFahrenheit.addEventListener("click", ()=> {
    unitGroupWeather = "us";
})
switchToCelcius.addEventListener("click", ()=>{
    unitGroupWeather = "metric";
})

async function getWeatherData(WeatherLocation){
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${WeatherLocation}?unitGroup=${unitGroupWeather}&include=days%2Ccurrent&key=YY5KXEMSNCSTRC4K7AD94FQ97&contentType=json`);
        const jsonResponse = await response.json();
        const weatherData = weatherObject(jsonResponse);
        const { address,day,conditions,feelslike,humidity,temp} = weatherData;
        getFittingGif(conditions);
        if (unitGroupWeather === "metric"){
            resultsDiv.innerHTML = `Location: ${address} <br>Date: ${day}<br>Condition: ${conditions} <br>Feelslike temperature: ${feelslike}°C<br>humidity: ${humidity}<br>Temperature: ${temp}°C`;
        } else {
            resultsDiv.innerHTML = `Location: ${address} <br>Date: ${day}<br>Condition: ${conditions} <br>Feelslike temperature: ${feelslike}°F<br>humidity: ${humidity}<br>Temperature: ${temp}°F`;
        }
    } catch(error) {
        console.log(error);
    }  
}

async function getFittingGif(conditions){
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=HvCpi4gDgaKHFAnZZyniIIBQt1gBlruy&s=${conditions}`)
        const jsonResponse = await response.json();
        const url = jsonResponse.data.images.original.url;
        const gifPlaceholder = document.querySelector("#gif");
        gifPlaceholder.src = url;
    } catch(error) {
        console.log(error);
    }
}

function weatherObject(jsonResponse){
    console.log(jsonResponse);
    let address = jsonResponse.address;
    let day = jsonResponse.days[0].datetime;
    let conditions = jsonResponse.days[0].conditions;
    let feelslike = jsonResponse.days[0].feelslike;
    let humidity = jsonResponse.days[0].humidity;
    let temp = jsonResponse.days[0].temp;
    return { address, day, conditions, feelslike, humidity, temp }
}
