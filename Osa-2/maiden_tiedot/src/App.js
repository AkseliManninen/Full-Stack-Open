import { useEffect, useState } from 'react'
import countriesService from "./services/countries"
import weatherService from "./services/weather"

// komponentti: lomake jolla etsitään ja rajataan maita
// kun lomakkeeseen kirjoitetaan tekstiä, triggeröityy props.handöeFilterInputChange, joka rajaa maalistaa syötteen mukaan
const CountryForm = (props) => (
  <div>
    <form>
        find countries <input value={props.filterInput} onChange={props.handleFilterInputChange} />
    </form>
  </div>
  );

// komponentti: renderöi säätiedot
const Weather = (props) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(props.country.capital)
      .then((response) => {
        setWeather(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Weather in {props.country.capital}</h2>
      {weather && (
        <div>
          <p>temperature {(weather.main.temp -273.15).toFixed(2)} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt=""/>
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};


// komponentti: renderöi maat
const Countries = (props) => { 
  
  const numberOfCountries = props.countries.length
  
  if (numberOfCountries > 10) {
    console.log("Over 10 countries")
    return <p>Too many matches, speficy another filter</p>
  }

  else if (numberOfCountries <= 10 && numberOfCountries > 1) {
    console.log("Under 10 countries and over 1 country")
    return props.countries.map((country) => <p>{country.name.common} <button onClick={() => {props.handleShowCountry(country)}}>show</button> </p>)
  }

  else if (numberOfCountries === 1) {
    console.log("One country")
    return props.countries.map((country) => 
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital}
        <br />
        area {country.area}
      </p>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((abbreviation) => (
          <li key={abbreviation}>{country.languages[abbreviation]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather country = {country}/>
    </div>
    )
  }

  else {
    console.log("Under one country country")
    return <p>No countries match the search</p>
  }

};

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [showCountries, setShowCountries] = useState(countries)
  const [filterInput, setNewFilterInput] = useState('')

  // effect hook: hakee countries-tiedot https://studies.cs.helsinki.fi/restcountries/api/all apista
  useEffect(() => {
    console.log('Fetching countries')
      countriesService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  // funktio: filtteröi maita syötteen mukaan
  const handleFilterInputChange = (props) => {
    console.log(props.target.value)
    const newFilterInput = props.target.value
    setNewFilterInput(newFilterInput)
    setShowCountries(countries.filter(country => country.name.common.toLowerCase().includes(newFilterInput.toLocaleLowerCase())))
  }

    // funktio: näyttää maan tiedot nappia painattaessa
    const handleShowCountry = (country) => {
      console.log(country);
      setNewFilterInput(country.name.common);
      setShowCountries([country]);
    };

  return (
    <div>
      <CountryForm filterInput={filterInput} handleFilterInputChange={handleFilterInputChange}/>
      <Countries countries = {showCountries} handleShowCountry = {handleShowCountry}/>
    </div>
  );
}

export default App;
