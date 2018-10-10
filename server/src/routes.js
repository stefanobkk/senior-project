const registerpolicy = require('./controller/registerPolicy')
const response = require('./controller/registerController')
const binanceController = require('./controller/binanceController')

module.exports = (app) => {
  app.post('/register', registerpolicy.registers, response.registers)

  app.post('/login', response.login)

  app.get('/trade', binanceController.getPriceSingle, binanceController.getBalance)

  app.get('/homepage', binanceController.binance)

  app.post('/myaccount', response.apiKey)

  app.get('/mybalance', binanceController.getBalance)

  app.get('/trade1', binanceController.tradeMaker)

  app.get('/trade2', binanceController.queryUserOrder)
}
