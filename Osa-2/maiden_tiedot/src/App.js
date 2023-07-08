
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
  if (props.countries >= 10) {
    return <p>Too many matches, speficy another filter</p>
  }

  else if (props.countries < 10 && props.countries > 1) {
    return <p>Showing countries list</p>
  }

  else if (props.countries === 1) {
    return <p>Showing country's information</p>
  }

  else {
    return <p>No countries match the search</p>
  }

};

const App = () => {
  return (
    <div>
      <CountryForm/>
      <Countries countries = {1}/>
    </div>
  );
}

export default App;
