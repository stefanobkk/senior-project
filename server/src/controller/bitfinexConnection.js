const { BittrexClient } = require('bittrex-node')

let restClient = new BittrexClient({
  apiKey: '',
  apiSecret: ''
})

module.exports = restClient
