// const api = require('binance')
// const binanceWS = new api.BinanceWS(true)
const binanceRest = require('./binanceConnection')
const restClient = require('./bitfinexConnection')

function flipCoin (req) {
  try {
    var symbolFormattedForBittrexRequest
    if (req.query.symbol.substr(req.query.symbol.length - 4) === 'USDT') {
      symbolFormattedForBittrexRequest = 'USDT-' + req.query.symbol.split('USDT')[0]
    }
    if (req.query.symbol.substr(req.query.symbol.length - 3) === 'ETH') {
      symbolFormattedForBittrexRequest = 'ETH-' + req.query.symbol.split('ETH')[0]
    }
    if (req.query.symbol.substr(req.query.symbol.length - 4) === 'BTC') {
      symbolFormattedForBittrexRequest = 'BTC-' + req.query.symbol.split('BTC')[0]
    }
    return symbolFormattedForBittrexRequest
  } catch (err) {
    this.errormessage = err.response
  }
}

module.exports = {
  async getAllCoinInfo (req, res) {
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

  // This function is used to get the balance of the coins for Trades.
  async getBalance (req, res) {
    if (req.query.exchange === 'Binance') {
      var symbol = req.query.symbol
      var AvailableSellBalance = ''
      var AvailableBuyBalance = ''
      binanceRest.account({
      })
        .then((data) => {
          var i
          // How this function works is that it first returns the balance of all coins. Free and Non free. But we are only concerened
          // about the free. With Binance ther are symbols of length 3 and 4. We want to split each Pairing into seperate symbols and get
          // the balance before res.send()
          for (i in data.balances) {
            if (symbol.substr(0, 3).includes(data.balances[i].asset)) {
              AvailableSellBalance = data.balances[i].free
            }
            if (symbol.substr(0, 4).includes(data.balances[i].asset)) {
              AvailableSellBalance = data.balances[i].free
            }
            if (symbol.substr(3, symbol.length).includes(data.balances[i].asset)) {
              AvailableBuyBalance = data.balances[i].free
            }
            if (symbol.substr(4, symbol.length).includes(data.balances[i].asset)) {
              AvailableBuyBalance = data.balances[i].free
            }
          }
          res.send({
            sellBalance: AvailableSellBalance,
            buyBalance: AvailableBuyBalance
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (req.query.exchange === 'Bittrex') {
      restClient.balances()
        .then((data) => {
          console.log('This is the data: ', data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },

  // This function is used to get the price of a single coin. Currently used to display currentPrice in Trade.
  async getPriceSingle (req, res) {
    if (req.query.exchange === 'Binance') {
      binanceRest.tickerPrice({
        symbol: req.query.symbol
      })
        .then((data) => {
          res.send({
            singleCoinPrice: data.price
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (req.query.exchange === 'Bittrex') {
      var symbolFormattedForBittrexRequest = flipCoin(req)
      restClient.marketSummary(symbolFormattedForBittrexRequest)
        .then((data) => {
          res.send({
            singleCoinPrice: data[0].Last
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
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

  // This function is used to get the coin symbols
  async getCoinInfo (req, res) {
    if (req.query.exchange === 'Binance') {
      binanceRest.exchangeInfo()
        .then((data) => {
          var i
          var tmp = []
          for (i in data.symbols) {
            tmp.push(data.symbols[i].symbol)
          }
          res.send({
            something: tmp
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (req.query.exchange === 'Bittrex') {
      restClient.currencies()
        .then((data) => {
          console.log(data)
          // var i
          // var tmp = []
          // for (i in data.Ma) {
          //   tmp.push(data.symbols[i].symbol)
          // }
          // res.send({
          //   something: tmp
          // })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },

  async getOrders (req, res) {
    if (req.query.getOrderType === 'single') {
      binanceRest.allOrders({
        symbol: req.query.symbol,
        limit: req.query.limit
      })
        .then((data) => {
          res.send({
            something: data
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (req.query.getOrderType === 'openOrder') {
      binanceRest.openOrders({
      })
        .then((data) => {
          res.send({
            something: data
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (req.query.getOrderType === 'coinSymbol') {
      binanceRest.account({
      })
        .then((data) => {
          var i
          var balanceSymbolName = []
          for (i in data.balances) {
            if (data.balances[i].free > 0.0 || data.balances[i].locked > 0.0) {
              // balanceSymbolName.push(data.balances[i].asset + 'ETH')
              // balanceSymbolName.push(data.balances[i].asset + 'BTC')
              balanceSymbolName.push(data.balances[i].asset + 'USDT')
            }
          }
          if (!balanceSymbolName.includes('ETH', 'BTC')) {
            balanceSymbolName.push('ETHUSDT')
            balanceSymbolName.push('BTCUSDT')
          }
          res.send({
            coinSymbolsWithBalance: balanceSymbolName
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (req.query.getOrderType === 'orderHistory') {
      binanceRest.allOrders({
        symbol: req.query.symbol,
        limit: 3
      })
        .then((data) => {
          console.log(data)
          res.send({
            da: data
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
