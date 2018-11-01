const registerpolicy = require('./controller/registerPolicy')
const response = require('./controller/registerController')
const binanceController = require('./controller/binanceController')
const bittrexController = require('./controller/bitfinexController')

module.exports = (app) => {
  app.post('/register', registerpolicy.registers, response.registers)

  app.post('/login', response.login)

  app.get('/tradeBinance', binanceController.getPriceSingle, binanceController.getBalance)

  app.get('/homepageBinanceData', binanceController.getAllCoinInfo)

  app.post('/myaccount', response.apiKey)

  app.get('/mybalance', binanceController.getBalance)

  app.get('/trade1', binanceController.tradeMaker)

  app.get('/trade2', binanceController.getCoinInfo)

  app.get('/trade3', binanceController.getOrders)

  app.get('/homepageBittrexData', bittrexController.getCoinSymbols)
}
