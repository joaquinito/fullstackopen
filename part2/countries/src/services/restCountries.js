import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
    const allUrl = `${baseUrl}/api/all`
    return axios.get(allUrl)         
}

const getCountry = (countryName) => {
    const countryUrl = `${baseUrl}/api/name/${countryName}`
    return axios.get(countryUrl)  
}


export default {getAll, getCountry}