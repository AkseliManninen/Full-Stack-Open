import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')

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
        name: newName
      }
      // lisää person objectin persons-listalle
      setPersons(persons.concat(personObject))
      setNewName("")
    }
  }


  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p> {persons.map(person => <p> {person.name} </p>)} </p>
    </div>
  )

}

export default App

