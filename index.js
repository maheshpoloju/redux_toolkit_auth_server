require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db')


const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')

connection()

app.use(express.json())
app.use(cors())

app.use('/api', loginRoute)
app.use('/api', registerRoute)

app.listen(8080, () => console.log('Running on Port 8080'))