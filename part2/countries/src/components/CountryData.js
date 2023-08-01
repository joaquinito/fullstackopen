
const CountryData = ({ data }) => {

    if (data === []) {
        return (
            <div></div>
        )
    }
    else if (data.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    else if (data.length == 1) {
        return (
            <div>
                <h1>{data[0].name.common}</h1>
                <div>capital {data[0].capital[0]}</div>
                <div>area {data[0].area}</div>
                <h4>languages:</h4>
                <ul>
                    {Object.values(data[0].languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={data[0].flags.png} alt="flag"></img>

            </div>
        )
    }
    else {
        return (
            <div>
                {data.map(country => <div key={country.name.common}>{country.name.common}</div>)}
            </div>
        )
    }

}

export default CountryData