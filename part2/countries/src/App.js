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
        country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))

      // Check if there a full name match (to avoid the Sudan vs. South Sudan problem)
      if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
        for (let i = 0; i < filteredCountries.length; i++) {
          if (filteredCountries[i].name.common.toLowerCase() === event.target.value.toLowerCase()){
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

  // When the component is first rendered, fetch the data from the server
  useEffect(() => {
    restCountries.getAll()
      .then(response => setCountriesData(response.data))
      .catch(() => console.log("Error fetching the countries data"))
  }, [])

  return (
    <div>
      <FindCountryForm textInput={inputText} inputHandlerFunction={handleInputChange} />
      <CountryData data={searchResult}/>
    </div>
  );
}

export default App;