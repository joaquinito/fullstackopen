import { useState, useEffect } from 'react'
import FindCountryForm from "./components/FindCountryForm"
import CountryData from "./components/CountryData"
import restCountries from "./services/restCountries"

function App() {

    /* State variables */
    const [inputText, setInputText] = useState('')
    const [countriesData, setCountriesData] = useState([])
    const [searchResult, setSearchResult] = useState([])

    /* Event handlers */
    const handleInputChange = (event) => {

        setInputText(event.target.value)

        if (event.target.value === '') {
            setSearchResult([])
            console.log("Empty input")
        }

        else{
            let filteredCountries = countriesData.filter(
                country => country.name.common.toLowerCase()
                    .includes(event.target.value.toLowerCase()))

            // Check if there a full name match (to avoid the Sudan vs. South Sudan problem)
            if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
                for (let i = 0; i < filteredCountries.length; i++) {
                    if (filteredCountries[i].name.common.toLowerCase() === 
                            event.target.value.toLowerCase()){
                        filteredCountries = [filteredCountries[i]]
                        console.log("Full name match found")
                        break
                    }
                }
            }
            
            setSearchResult(filteredCountries)
            console.log(filteredCountries)
        }
    }

    const handleShowButtonClick = (countryName) => {
        console.log(`Button clicked for ${countryName}`)
        for (let i = 0; i < searchResult.length; i++) {
            if (searchResult[i].name.common === countryName){
                setSearchResult([searchResult[i]])
                break
            }
        }
    }

    // When the component is first rendered, fetch the data from the server
    useEffect(() => {
        restCountries.getAll()
        .then(response => setCountriesData(response.data))
        .catch(() => console.log("Error fetching the countries data"))
    }, [])

    /* App render */
    return (
        <div>
            <FindCountryForm textInput={inputText} inputHandlerFunction={handleInputChange}/>
            <CountryData data={searchResult} showButtonHandlerFunction={handleShowButtonClick}/>
        </div>
    );
}

export default App