require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pinoLogger = require('./logger')
const path = require('path')
const connectToDatabase = require('./models/db')

const app = express()
app.use('*', cors())
const port = 3060

// Connect to MongoDB; we just do this one time
connectToDatabase()
  .then(() => {
    const { loadData } = require('./util/import-mongo')
    loadData() // seed DB if empty
    pinoLogger.info('Connected to DB, data populated to DB')
  })
  .catch((e) => console.error('Failed to connect to DB', e))

app.use(express.json())

// Route files
const secondChanceRoutes = require('./routes/secondChanceRoutes')
const authRoutes = require('./routes/authRoutes')
const searchRoutes = require('./routes/searchRoutes')
const pinoHttp = require('pino-http')
const logger = require('./logger')

app.use(pinoHttp({ logger }))
app.use(express.static(path.join(__dirname, 'public')))

// Use Routes
app.use('/api/secondchance/items', secondChanceRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/secondchance/search', s
