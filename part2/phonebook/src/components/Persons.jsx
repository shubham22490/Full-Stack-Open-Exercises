const Persons = ({personsToDisplay}) => 
  <div>
    {personsToDisplay.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
  </div> 

export default Persons