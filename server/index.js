const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Recipe = require('./models/Recipe.js')
const User = require('./models/User.js')
const cookieParser = require('cookie-parser')
const app = express()
const axios = require('axios')
const port = 5000
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
mongoose
  .connect(process.env.MONGO__URI)
  .then(() => {
    console.log('database connected')
  })
  .catch(e => console.log(e))

const bcryptSalt = bcrypt.genSaltSync(10)
const JWTSECRET =
  'fdfe885676f3474df7aaed9a45884669be8bc28e35d1ee788da2c4c0c1d8cc4b6d603c8271131ee19805f812bf963b4006ada3b1e4411688d90033a9a4c9c911'

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDoc)
  } catch (error) {
    res.status(422).json(error)
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const userDoc = await User.findOne({ email })
  if (userDoc) {
    const passOk = await bcrypt.compare(password, userDoc.password)
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        JWTSECRET,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie('token', token)
          res.send(userDoc)
        }
      )
    } else {
      res.status(422).json('pass not ok')
    }
  } else {
    res.json('not found')
  }
})

app.get('/api/recipes/search', async (req, res) => {
  try {
    const query = req.query.query // Get the query from the frontend
    console.log(query)
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch',
      {
        params: {
          query, // Use the query from the frontend

          apiKey: process.env.API_KEY
        }
      }
    )

    const recipes = response.data.results
    res.json({ results: recipes })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve recipes' })
  }
})

app.listen(5000, console.log(`Server running on ${port}`))
