import { useEffect, useState } from "react"
import openWeather from "../services/openWeather"
import CapitalWeather from "./CapitalWeather"

const CountryData = ({ data, showButtonHandlerFunction }) => {

    const [weatherData, setWeatherData] = useState({'temp': null, 'wind': null, 'icon': null})

    // The weather data is fetched only when the component input 'data' is changed
    // Using this method avoids an infinite loop of re-rendering
    useEffect(() => {
        if(data.length === 1){
            console.log("Getting weather data for: ", data[0].capital[0])
            
            openWeather.getCityCoordinates(data[0].capital[0], data[0].cca2)
            .then(response => openWeather.getCoordsWeather(response.data[0].lat, 
                                                           response.data[0].lon))
            .then(response => setWeatherData({'temp': response.data.main.temp, 
                                              'wind': response.data.wind.speed,
                                              'icon': response.data.weather[0].icon}))
            .catch(error => {console.error("Error fetching weather data: ", error)})
        }
    }, [data])

    // No input text / no countries found
    if (data === []) {
        return null
    }

    // More than 10 matches found
    else if (data.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    
    // One match found - show the country data
    else if (data.length === 1) {
       return( 
            <div>
                <h1>{data[0].name.common}</h1>
                <div>capital {data[0].capital[0]}</div>
                <div>area {data[0].area}</div>
                <h4>languages:</h4>
                <ul>
                    {Object.values(data[0].languages).map(language =>
                        <li key={language}>{language}</li>)}
                </ul>
                <img src={data[0].flags.png} alt="flag"></img>
                <CapitalWeather city={data[0].capital[0]} weatherData={weatherData} /> 
            </div> 
       )
    }

    // 2-10 matches found - show the country names and a button to show the data
    else {
        return (
            (data.map(country =>
            (<div key={country.name.common}>
                {country.name.common} &nbsp;
                <button onClick={() =>
                    showButtonHandlerFunction(country.name.common)}>show</button>
            </div>)))
        )
    }
}

export default CountryData