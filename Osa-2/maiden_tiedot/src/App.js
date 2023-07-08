import { useEffect, useState } from 'react'
import countriesService from "./services/countries"

// komponentti: lomake jolla etsitään maita
const CountryForm = () => (
  <div>
    <form>
        find countries <input type="text" />
    </form>
  </div>
  );


// komponentti: renderöi maat
const Countries = (props) => { 
  const numberOfCountries = props.countries.length
  if (numberOfCountries >= 10) {
    return <p>Too many matches, speficy another filter</p>
  }

  else if (numberOfCountries < 10 && props.countries > 1) {
    return <p>Showing countries list</p>
  }

  else if (numberOfCountries === 1) {
    return <p>Showing country's information</p>
  }

  else {
    return <p>No countries match the search</p>
  }

};

const App = () => {
  const [countries, setCountries] = useState([]) 

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
  
  
  return (
    <div>
      <CountryForm/>
      <Countries countries = {countries}/>
    </div>
  );
}

export default App;
