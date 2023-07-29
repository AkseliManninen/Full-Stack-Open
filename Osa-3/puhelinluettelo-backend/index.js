// web-palvelin
const http = require('http')
require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

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

// middleware, joka ottaa json-parserin käyttöön
app.use(express.json())

// ottaa käyttöön cors-middlewaren
app.use(cors())

// middleware, joka ottaa json-parserin käyttöön
app.use(express.json())

// middleware, joka mahdollistaa Expressin näyttämään staattista sisältöä
app.use(express.static('build'))

// uusi Morgan-token, muotoilee bodyn
morgan.token('body', (req, res) => JSON.stringify(req.body))

// loggeri, eri muotoilu post-requesteilla
app.use((req, res, next) => {
    if (req.method === 'POST') {morgan(':method :url :status :res[content-length] - :response-time ms :body - :req[content-length]')(req, res, next)} 
    else {morgan('tiny')(req, res, next);}
  })


app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})


app.get('/info', (req, res) => {
const numberOfPeople = persons.length
const currentTime = new Date().toString() 
const info = `Phonebook has info for ${numberOfPeople} people<br><br>${currentTime}` 
res.send(info)
})

// poistaa id:llä olevan puhelintiedon 
app.delete('/api/persons/:id', (req, res) => {
const id = Number(req.params.id)
persons = persons.filter(person => person.id !== id)

res.status(204).end()
})

// lisää puhelintiedon
app.post('/api/persons/', (req, res) => {

  const person = req.body

if (person.name === undefined || person.number === undefined) {
    console.log("Missing information - the name and the number must be filled")
    return response.status(400).json({ error: "Missing information - the name and the number must be filled" })
}

//else if (persons.find(existingPerson => existingPerson.name === person.name)) {
//    console.log("The name is already in the list")
//    res.status(404).send({error: 'name must be unique'})
//}

else {
  const person = new Person({
    name: body.name,
    number: body.nuber,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
    console.log(`added ${body.name} number ${body.number} to phonebook`)
    })    
}
})

// hakee id:llä olevan puhelintiedon jos se on olemassa
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    console.log(person)
    if (person === undefined) {
      console.klog("person not found with the given id")
      res.status(404).end()
  }
   else (res.json(person))
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
