const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI

console.log('Connecting to the database!')

mongoose.connect(uri, { family:4 })
  .then(() => {
    console.log('Connected to MongoDB.')
  })
  .catch(err => {
    console.log('error connecting to MongoDB:', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: String
})

personSchema.set('toJSON', {
  transform: (document, renderedObject) => {
    renderedObject.id = document._id.toString()
    delete renderedObject.__v
    delete renderedObject._id
  }
})

module.exports = mongoose.model('Person', personSchema)

