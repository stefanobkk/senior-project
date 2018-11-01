import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('/register', credentials)
  },

  login (credentials) {
    return Api().post('/login', credentials)
  },

  getCurrentPriceSingleCoin (credentials) {
    return Api().get('/tradeBinance', {
      params: {
        symbol: credentials.symbol,
        exchange: credentials.exchange
      }
    })
  },

  binanceData () {
    return Api().get('/homepageBinanceData', {
      params: {
        symbol: null
      }
    })
  },

  bittrexData () {
    return Api().get('/homepageBittrexData', {
      params: {
        symbol: null
      }
    })
  },

  addApiKey (credentials) {
    console.log(credentials)
    return Api().post('/myaccount', credentials)
  },

  getBalance (credentials) {
    return Api().get('/mybalance', {
      params: {
        symbol: credentials.symbol,
        exchange: credentials.exchange
      }
    })
  },

  tradeSubmit (credentials) {
    return Api().get('/trade1', {
      params: {
        symbol: credentials.symbol,
        quantity: credentials.quantity,
        price: credentials.price,
        side: credentials.side,
        tradeType: credentials.tradeType,
        stopPrice: credentials.stopPrice
      }
    })
  },
  getCoinInfo (credentials) {
    return Api().get('/trade2', {
      params: {
        symbol: credentials.symbol,
        exchange: credentials.exchange
      }
    })
  },

  getOrders (credentials) {
    return Api().get('/trade3', {
      params: {
        limit: 20,
        getOrderType: credentials.getOrderType,
        symbol: credentials.symbol,
        coinSymbolInfo: credentials.coinSymbolInfo
      }
    })
  }
}
