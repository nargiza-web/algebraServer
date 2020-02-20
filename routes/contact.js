const express = require("express")
const router = express.Router()
const mongoose =require('mongoose')
const Contactus = require ('../models/contactus.js')

router.post('/', (req, res) => {
  let name = req.body.name
  let email = req.body.email
  let feedback = req.body.feedback
  console.log(feedback)
  const contacted = new Contactus({
    name: name,
    email: email, 
    feedback: feedback
  })
  
  contacted.save((error, newContacted) => {
    if(error){
      console.log(error)
    } else {
      console.log(newContacted)
    }
  })
  
  res.send("Your request has been sent")
  
})

module.exports = router 