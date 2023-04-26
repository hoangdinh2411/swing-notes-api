const express = require('express')
const swaggerUi = require('swagger-ui-express')
const api_docs = require('./docs/api-docs.json')
const { connectDatabase } = require('./config/nedb')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(api_docs), (req, res) => {
  res.setHeader('Content-Type', 'application/json')
})
app.use('/api', require('./routers/index.js'))

const port = 8000
app.listen(port, () => {
  console.log('The server listening on port ' + port)
  connectDatabase()
})
