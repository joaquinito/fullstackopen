const CapitalWeather = ({ city, weatherData }) => {

    console.log("Weather data: ", weatherData)
    let icon_url = ''
    
    if (weatherData.icon !== null){
        icon_url = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`
    }
    
    if(weatherData.temp !== null && weatherData.wind !== null){
        return (
            <div>
                <h2>Weather in {city}</h2>
                <div>temperature {weatherData.temp}	°C</div>
                <img src={icon_url}/>
                <div>wind {weatherData.wind} m/s</div>
            </div>
        )
    }
    else{
        return null
    }
}

export default CapitalWeather