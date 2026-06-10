const Person = ({name, number, handleClick}) => {
  return (
    <p>
      {name} {number} <button onClick={handleClick}>delete</button>
    </p>
  )
}

const Persons = ({personsToDisplay, handleClick}) => 
  <div>
    {personsToDisplay.map((person) => {
      return (
        <Person 
          key={person.id} 
          name={person.name} 
          number={person.number} 
          handleClick={handleClick(person.id)} 
        />
      )
    })
  }
  </div> 

export default Persons