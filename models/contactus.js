const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: String, 
  email: String, 
  feedback: String
})

const Contactus = mongoose.model('Contactus', contactSchema)

module.exports = Contactus