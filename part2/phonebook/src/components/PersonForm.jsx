const InputLabel = (props) => {
  const{label, value, onChange} = props
  return (
    <div>
      {label}: <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = (props) => 
  <form onSubmit={props.handleSubmit}>
    <InputLabel label="name" onChange={props.handleInputLabel(props.setNewName)} value={props.newName} />
    <InputLabel label="number" onChange={props.handleInputLabel(props.setNewPhone)} value={props.newPhone} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>

export default PersonForm