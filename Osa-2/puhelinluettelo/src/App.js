import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>number: <input
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p> {persons.map(person => <p> {person.name} {person.number} </p>)} </p>
    </div>
  )

}

export default App