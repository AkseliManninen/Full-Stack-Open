// web-palvelin
const http = require('http')
const express = require('express')
const app = express()

// kovakoodattu JSON-lista
let persons = [
          { 
            "id": 1,
            "name": "Arto Hellas", 
            "number": "040-123456"
          },
          { 
            "id": 2,
            "name": "Ada Lovelace", 
            "number": "39-44-53235234"
          },
          { 
            "id": 3,
            "name": "Dan Abramov", 
            "number": "12-43-234345",
          },
          { 
            "id": 4,
            "name": "Mary Poppendieck", 
            "number": "12339-23-23122",
          }
  ]

// luo http-moduulin avulla web-palvelimen
// web-palvelimelle rekisteröidään tapahtumankäsittelijä, joka suoritetaan HTTP-pyyntöjen yhteydessä
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    const numberOfPeople = persons.length
    const currentTime = new Date().toString() 
    const info = `Phonebook has info for ${numberOfPeople} people<br><br>${currentTime}` 
    res.send(info)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    console.log(person)
    if (person === undefined) {
        res.status(404).end()
    }
    else (res.json(person))
  })

  
  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })