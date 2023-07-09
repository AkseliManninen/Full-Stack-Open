// web-palvelin
const http = require('http')
const express = require('express')
const app = express()

// kovakoodattu JSON-lista
let persons = [
    {
        "persons":[
          { 
            "id": 1,
            "name": "Arto Hellas", 
            "number": "040-123456"
          },
          { 
            "id": 2,
            "name": "Ada Lovelace", 
            "number": "39-44-5323523"
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
      }
  ]

// luo htto-moduulin avulla web-palvelimen
// web-palvelimelle rekisteröidään tapahtumankäsittelijä, joka suoritetaan HTTP-pyyntöjen yhteydessä
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    const info = "Phonebook has info for x people"
    res.send(info)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })