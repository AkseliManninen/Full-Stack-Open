import { useState } from 'react'

// uuden henkilön lisäävä lomakes
const NewPersonForm = (props) => (
  <div>
    <h2>add a new</h2>
      <form onSubmit = {props.addPerson}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handlePersonChange}/>
        </div>
        <div>number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
  )

// filtteröintilomake
const FilteredForm= (props) => (
  <div>
    <h2>Numbers</h2>
    <p> {props.show.map(person => <p> {person.name} {person.number} </p>)} </p>
  </div>
  )

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilterName] = useState('')
  const [show, setShow] = useState(persons)

  const addPerson = (event) => {
    // estää alkuperäisen arvon lisäämisen
    event.preventDefault()
    // estää olemassa olevan arvon lisäämisen
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      console.log('button clicked', event.target)
      // luo uuden person-objektin
      const personObject = {
        name: newName,
        number: newNumber
      }
      // lisää person objectin persons-listalle
      setPersons(persons.concat(personObject))
      // lisää person objectin show-listalle, jos täyttää filtteröinnin ehdot
      if (personObject.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())) {
        setShow(show.concat(personObject))
      }      
      setNewName("")
      setNewNumber("")
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // filteröi nimiä syötteen mukaan
  const handleFilterChange = (props) => {
    console.log(props.target.value)
    const newFilterName = props.target.value
    setNewFilterName(newFilterName)
    setShow(persons.filter(person => person.name.toLowerCase().includes(newFilterName.toLocaleLowerCase())))
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input
          value={filterName}
          onChange={handleFilterChange}/>
        </div>
      </form>
      <NewPersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <FilteredForm show = {show}/>
    </div>
  )
}

export default App