const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

console.log('app.js')
app.post('/register', (req, res) => {
  res.send({
    message: `delete the item ${req.body.email}`
  })
})
console.log('app2.js')
app.listen(process.env.PORT || 8081)
console.log('after u')
