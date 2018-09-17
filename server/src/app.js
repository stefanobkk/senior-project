const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const api = require('binance')

const app = express() // creates the express server and assign it to app.
const binanceWS = new api.BinanceWS(true)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

const port = process.env.PORT || 8081
sequelize.sync().then(() => {
  app.listen(port)
  console.log(`Server started on port ${port}`)
})
console.log('hererererere')

binanceWS.onTrade('ICXUSDT', (data) => {
  console.log(data)
})
