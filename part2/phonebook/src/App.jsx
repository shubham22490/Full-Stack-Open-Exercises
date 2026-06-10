import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookServices from './services/phonebook'


const App = () => {
  const [persons, setPersons] = useState([])
  const baseUrl = 'http://localhost:3001/persons'
  
  // Getting data from the server using useEffect which gets the data after rendering and rerenders once gets the data.
  const hook = () => {
    phonebookServices
      .getAll()
      .then(resp => setPersons(resp))
  }
  useEffect(hook, [])

  const addNumber = (data) => {
    return axios.post(baseUrl, data)
  }
  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterLabel, setFilterLabel] = useState('')
  
  const personsToDisplay = persons.filter(
    (person) => person.name.toLowerCase().includes(filterLabel)
  )


  const handleInputLabel = (setFunc) => 
    (event) => setFunc(event.target.value)

  const handlechangeFilter = (event) => setFilterLabel(event.target.value.toLowerCase())

  const handleDelete = (id) => {
    return (
      (event) => {
        console.log(`${id} is getting deleted.`)
        const person = persons.find((person) => person.id === id)
        if(window.confirm(`Delete ${person.name}`)){
          phonebookServices
            .remove(id)
            .then(resp => {
              console.log(resp)
              setPersons(persons.filter((person) => person.id != id))
            })
        } else console.log(`Not deleted ${person.name}`)
        
      }
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)) 
      if(window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)){
        const person = persons.find(person => person.name === newName)
        const newPerson = {...person, number: newPhone}
        phonebookServices
          .update(newPerson)
          .then(resp => setPersons(persons.map((p) => p.name === newName ? resp : p)))
      } else console.log("No update!")
    else {
      const data = 
      {
        name: newName, 
        number: newPhone, 
        id: persons.length+1
      }
      phonebookServices
        .addNumber(data)
        .then(resp => {
            setPersons(persons.concat(resp))
          })
    }
    setNewName('')
    setNewPhone('')
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handlechangeFilter={handlechangeFilter} filterLabel={filterLabel} />

      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newPhone={newPhone} setNewName={setNewName} setNewPhone={setNewPhone} handleInputLabel={handleInputLabel} />
      
      <h2>Numbers</h2>
      <Persons personsToDisplay={personsToDisplay} handleClick={handleDelete} />
    </div>
  )
}

export default App