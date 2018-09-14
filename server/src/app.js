const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')

const app = express() // creates the express server and assign it to app.
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Fufilling the post request from the user when submitting their registration form.
// app.post('/register', (req, res) => {
//   res.send({
//     message: `your username ${req.body.email}, andd password ${req.body.password}`
//   })
// })
require('./routes')(app)

const port = process.env.PORT || 8081
sequelize.sync().then(() => {
  app.listen(port)
  console.log(`Server started on port ${port}`)
})
