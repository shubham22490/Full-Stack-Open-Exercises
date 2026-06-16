const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



let phonebook = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, resp) => {
    resp.json(phonebook)
})

app.get('/info', (req, resp) => {
    const date = new Date()

    resp.send(`
        <p>Phonebook has info for ${phonebook.length} people</p>
        <p>${date}</p>    
    `)
})

app.get('/api/persons/:id', (req, resp) => {
    const id = req.params.id
    const person = phonebook.find((n) => n.id === id)
    if(person) return resp.json(person)
    
    return resp.sendStatus(404)
})

app.delete('/api/persons/:id', (req, resp) => {
    const id = req.params.id
    phonebook = phonebook.filter((person) => person.id !== id)

    resp.status(204).end()
})

const generateId = () => {
    return String(Math.floor(Math.random()*1000))
}

app.post('/api/persons', (req, resp) => {
    const body = req.body
    
    if(!body.name || !body.number){
        return resp.status(400).json({
            error: 'name or number missing'
        })
    }

    if(phonebook.some((p) => p.name === body.name)) {
        return resp.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {...body, id: generateId()}
    
    phonebook = phonebook.concat(person)

    resp.status(201).json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at ${PORT} port.`)
})