const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
//const bcrypt = require ('bcrypt')
const session = require('express-session')
const cors = require('cors')
//const jwt = require ("jsonwebtoken")
const authentication = require('./middleware/authentication')
const pgp = require('pg-promise')()
pgp.pg.defaults.ssl = true;
//pgp.pg.defaults.rejectUnauthorized = false;

require("dotenv").config();
const PORT = process.env.PORT || 8080;
const DATABASE_URL = process.env.DATABASE_URL;
const db = pgp(DATABASE_URL)
//const SALT_ROUNDS = 10
const registerRouter = require('./routes/register')


app.use(cors())
app.use(express.json())
//app.use('/register', registerRouter)
 
app.get('/', (req, res) => {
  res.send("HELLO")
})

app.listen(PORT, () => {
  console.log('Running on PORT ', PORT)
})

