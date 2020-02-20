const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//const bcrypt = require ('bcrypt')
const session = require('express-session')
const cors = require('cors')
//const jwt = require ("jsonwebtoken")
const authentication = require('./middleware/authentication')
//const pgp = require('pg-promise')()
//pgp.pg.defaults.ssl = true;
//pgp.pg.defaults.rejectUnauthorized = false;

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
//const db = pgp(DATABASE_URL)
//const SALT_ROUNDS = 10
app.use(cors())
app.use(express.json())

const user = require('./models/user')
const registerRouter = require('./routes/register')
const contactusRouter = require('./routes/contact')



//connect to the database
mongoose.connect(DATABASE_URL, {useNewUrlParser: true}, (error) => {
  if(error) {
    console.log('Unable to connect to the database!')
  } else {
    console.log("Connected to the database!")
  }
})


app.use('/register', registerRouter)
app.use('/contactus', contactusRouter)
app.get('/', (req, res) => {
  res.send("HELLO")
})

app.listen(3011, () => {
  console.log('Running on PORT 3011')
})

