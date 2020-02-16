const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10
const jwt = require ("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

router.post('/', (req, res) => {
  let name = req.body.name
  let username = req.body.username
  let password = req.body.password
  let confirmPassword = req.body.confirmPassword
  
  if (password === confirmPassword) {
    db.oneOrNone('SELECT username FROM users WHERE username = $1', [username]).then((user) => {
      if(!user){
        // username available, save to database
        bcrypt.hash(password, SALT_ROUNDS)
        .then(hash => {
          db.one("INSERT INTO users (name, username, hash) VALUES ($1, $2, $3) RETURNING id;", [name, username, hash])
          .then(results => {
            const token = jwt.sign({user: username, id: results.id}, JWT_SECRET)
            res.status(200).json({token: token, id: results.id})
          })
          .catch(error => {
            console.log(error)
            res.status(500).json({message: "Error creating user."})
          })
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({"meesage": "Error creating user."})
        })
      }
      else {
        res.status(500).json({"message": "Error creating user."})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({"message": "Error creating user."})
    })
    
  } else {
    res.status(500).json({"message": "password don't match"})
  }
  
})

module.exports = router