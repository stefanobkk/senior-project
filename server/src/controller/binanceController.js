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
          something: data.balances
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
          something: data.price
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
// async binance (req, res) {
//   binanceWS.onTrade(req.query.symbol, (data) => {
//     var numberofOrders = 1
//     var currICXprice = data.price.toString()
//     if (currICXprice <= '0.6780' && numberofOrders <= 1) {
//       binanceRest.newOrder({
//         symbol: req.query.symbol,
//         side: 'BUY',
//         type: 'LIMIT',
//         timeInForce: 'GTC',
//         quantity: '100',
//         price: '0.5'
//       })
//         .then((data) => {
//           res.send({
//             something: data.price
//           })
//         })
//       numberofOrders += 1
//         .catch((err) => {
//           console.error(err)
//         })
//     }
//   })
// },
}
