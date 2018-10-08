import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('/register', credentials)
  },

  login (credentials) {
    return Api().post('/login', credentials)
  },

  binance (credentials) {
    return Api().get('/trade', {
      params: {
        symbol: credentials.symbol
      }
    })
  },

  binanceData () {
    return Api().get('/homepage', {
      params: {
        symbol: null
      }
    })
  },

  addApiKey (credentials) {
    console.log(credentials)
    return Api().post('/myaccount', credentials)
  },

  // addWallet (credentials) {
  //   return Api().post('/myaccount', credentials)
  // },

  getMyAccountData () {
    return Api().get('/mybalance')
  }
}
