import { useEffect, useState } from 'react'
import personsService from "./services/persons"

// komponentti: lomake filteröi syötteen mukaan näytettävät yhteystiedot
const Filter = (props) => (
  <form>
  <div>
    filter shown with <input
    value={props.filterName}
    onChange={props.handleFilterChange}/>
  </div>
</form>
)

// komponentti: lomake jolla lisätään uuden henkilön yhteystidot
const PersonForm = (props) => (
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


// komponentti: renderöi kaikki henkilöt
const Persons= (props) => (
  <div>
    <h2>Numbers</h2>
    <p>
      {props.persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => {props.handleDeletePerson(person)}}>delete</button>
        </p>
      ))}
    </p>
  </div>
  )

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilterName] = useState('')
  const [show, setShow] = useState(persons)

  // effect hook: hakee persons-tiedot db.json-dokumentista
  useEffect(() => {
    console.log('effect')
      personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setShow(response.data)
        console.log(response.data)
      })
  }, [])

  const addPerson = (event) => {
    // funktio estää oletusarvon ja olemassa olevan nimen lisäämisen
    event.preventDefault()
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

      // lähettää muistiinpanon palvelimelle
      personsService
       .create(personObject)
       .then(response => {
        console.log(response)
      })
    }
  }

  // funktio: poistaa yhteystiedon palvelilmelta
  const handleDeletePerson = (person) => {
    console.log(`deleting id ${person.id}`)
    personsService
      .deletePerson(person.id)
      .then(response => {
        console.log(response)
        personsService
        .getAll()
        .then(response => {
          setPersons(response.data)
          setShow(response.data); 
        });
      })
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
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <Persons persons = {show} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App