// web-palvelin
const http = require('http')

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
            "number": "39-23-6423122",
          }
        ]
      }
  ]

// luo htto-moduulin avulla web-palvelimen
// web-palvelimelle rekisteröidään tapahtumankäsittelijä, joka suoritetaan HTTP-pyyntöjen yhteydessä
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)