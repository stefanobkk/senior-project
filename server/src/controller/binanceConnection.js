const api = require('binance')

const binanceRest = new api.BinanceRest({
  key: '', // Get this from your account on binance.com
  secret: '', // Same for this
  timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
  recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
  disableBeautification: false,
  handleDrift: true
})
module.exports = binanceRest
