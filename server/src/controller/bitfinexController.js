const restClient = require('./bitfinexConnection')

module.exports = {
  async getCoinSymbols (req, res) {
    restClient.marketSummaries()
      .then((data) => {
        res.send({
          something: data
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
