require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/phonebook')
const app = express()

// app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (req, resp) => {
    Person.find({}).then(person => {
        console.log("Fetched Data from MongoDB!")
        resp.json(person)
    })
})

app.get('/info', (req, resp, next) => {
    Person.countDocuments({}).then(count => {
        resp.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${new Date()}</p>
        `)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, resp, next) => {
    const id = req.params.id
    Person.findById(id)
        .then(p => {
            if(p) resp.json(p)
            else resp.status(404).end()
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, resp, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            console.log(result)
            resp.status(204).json(result)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, resp, next) => {
    const body = req.body
    
    if(!body.name || !body.number){
        return resp.status(400).json({
            error: 'name or number missing'
        })
    }

    Person.find({name: body.name})
        .then(persons => {
            if(persons.length){
                resp.status(400).json({error: 'name already exists!'})
            }

            const person = new Person({
                name: body.name,
                number: body.number
            })
            
            person.save().then(savedPerson => {
                resp.status(201).json(savedPerson)
            })
            .catch(error => next(error))
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, resp, next) => {
    const body = req.body
    Person.find({name: body.name})
        .then(persons => {
            if(persons.length){
                let existingPerson = persons[0]
                existingPerson.number = body.number

                return existingPerson.save().then(updatedPerson => {
                    resp.json(updatedPerson)
                })
            }
        })
})

const unknownEndpoint = (req, resp) => {
    resp.status(404).send({error: 'unknown endpoint.'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, resp, next) => {
    console.log(error.message)

    if(error.name === 'CastError') return resp.status(400).send({error: "malformatted id"})
    
    resp.status(400).json({error: error.message})

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running at ${PORT} port.`)
})