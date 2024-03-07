import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const getCityCoordinates = (city, countryCode) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${api_key}`
    return axios.get(url)      
}

const getCoordsWeather = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    return axios.get(url)
}


export default {getCityCoordinates, getCoordsWeather}