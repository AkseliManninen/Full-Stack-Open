const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    require: true
  },
  number: {
    type: String,
    maxlegth: 8,
    require: true,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{5}|\d{2}-\d{6}/.test(v);
    },
    message: 'The phone number is not valid'
  }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)
