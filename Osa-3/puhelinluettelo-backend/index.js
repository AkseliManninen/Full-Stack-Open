// web-palvelin
const http = require('http')
require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

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

app.get('/api/persons', (req, res, next) => {
  Person.find({})
  .then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(numberOfPeople => {
      const currentTime = new Date().toString()
      const info = `Phonebook has info for ${numberOfPeople} people<br><br>${currentTime}`
      res.send(info)
    })
})

// poistaa id:llä olevan puhelintiedon 
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

// lisää puhelintiedon
app.post('/api/persons/', (req, res, next) => {

  const personInformation = req.body

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
      console.log(`added ${req.body.name} number ${req.body.number} to phonebook`)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  const number = req.body.number;

  if (!number) {
    return res.status(400).json({ error: 'Missing number in request body' });
  }

  // Corrected: Pass an object with the 'number' field to be updated
  Person.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
        console.log(`Updated phone number for ${updatedPerson.name} to ${number}`)
      } else {
        res.status(404).json({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})

// hakee id:llä olevan puhelintiedon jos se on olemassa
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).end()
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})