const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://shubham2802:${password}@myatlasclusteredu.ger9o.mongodb.net/phonebook?appName=myAtlasClusterEDU`

mongoose.set('strictQuery', false)

mongoose.connect(uri, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {

  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: `${name}`,
    number: `${number}`
  })

  person.save().then((res) => {
    console.log(`added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
  })

}
