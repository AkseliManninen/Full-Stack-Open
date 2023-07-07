// komponentti: lomake jolla etsitään maita
const CountryForm = () => (
  <div>
    <form>
        find countries <input type="text" />
    </form>
  </div>
  )

const App = () => {
  return (
    <div>
      <CountryForm/>
    </div>
  );
}

export default App;
