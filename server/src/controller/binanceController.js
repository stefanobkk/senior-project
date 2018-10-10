// const api = require('binance')
// const binanceWS = new api.BinanceWS(true)
const binanceRest = require('./binanceConnection')

module.exports = {
  async binance (req, res) {
    binanceRest.ticker24hr({
    })
      .then((data) => {
        res.send({
          something: data
        })
      })
      .catch((err) => {
        console.error(err)
      })
  },

  async getBalance (req, res) {
    binanceRest.account({
    })
      .then((data) => {
        res.send({
          userBalance: data.balances
        })
      })
      .catch((err) => {
        console.error(err)
      })
  },

  async getPriceSingle (req, res) {
    binanceRest.tickerPrice({
      symbol: req.query.symbol
    })
      .then((data) => {
        console.log(data.price)
        res.send({
          singleCoinPrice: data.price
        })
      })
      .catch((err) => {
        console.error(err)
      })
  },

  async tradeMaker (req, res) {
    switch (req.query.tradeType) {
      case 'LIMIT':
        binanceRest.newOrder({
          symbol: req.query.symbol,
          side: req.query.side,
          type: req.query.tradeType,
          timeInForce: 'GTC',
          quantity: req.query.quantity,
          price: req.query.price
        })
          .then((data) => {
            res.send({
              tradeMakerData: data
            })
          })
          .catch((err) => {
            console.error(err)
          })
        break
      case 'STOP_LOSS_LIMIT':
        console.log('Note that Trigger price has to be more than currentprice')
        binanceRest.newOrder({
          symbol: req.query.symbol,
          side: req.query.side,
          type: 'STOP_LOSS_LIMIT',
          timeInForce: 'GTC',
          quantity: req.query.quantity,
          price: req.query.price,
          stopPrice: req.query.stopPrice
        })
          .then((data) => {
            console.log(data)
            res.send({
              tradeMakerData: data
            })
          })
          .catch((err) => {
            console.error(err)
          })
        break
    }
  },
  async queryUserOrder (req, res) {
    binanceRest.queryOrder({
      symbol: req.query.symbol,
      orderId: 11725467
    })
      .then((data) => {
        console.log(data)
        res.send({
          UserOrder: data
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
