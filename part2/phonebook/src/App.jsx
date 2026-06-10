import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  
  // Getting data from the server using useEffect which gets the data after rendering and rerenders once gets the data.
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(resp => setPersons(resp.data))
  }
  useEffect(hook, [])
  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterLabel, setFilterLabel] = useState('')
  
  const personsToDisplay = persons.filter(
    (person) => person.name.toLowerCase().includes(filterLabel)
  )


  const handleInputLabel = (setFunc) => 
    (event) => setFunc(event.target.value)

  const handlechangeFilter = (event) => setFilterLabel(event.target.value.toLowerCase())

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)) 
      alert(`${newName} is already added to phonebook.`)
    else 
      setPersons(persons.concat({name: newName, number: newPhone, id: persons.length+1}))
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
      <Persons personsToDisplay={personsToDisplay} />
    </div>
  )
}

export default App