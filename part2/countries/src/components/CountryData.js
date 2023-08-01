const CountryData = ({ data, showButtonHandlerFunction }) => {

    // No input text / no countries found
    if (data === []) {
        return (
            <div></div>
        )
    }

    // More than 10 matches found
    else if (data.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    // One match found - show the country data
    else if (data.length == 1) {
        return (
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