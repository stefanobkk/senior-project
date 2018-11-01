<template>
  <div class = "white elevation-4">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <v-toolbar dark class="orange">
      <v-toolbar-title class="white--text">Exchange, price, volume, </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-layout row wrap>
        <v-layout column wrap>
          <v-flex xs12>
            <v-combobox
              v-model="x"
              :items="items"
              label="Select Market Type"
            ></v-combobox>
          </v-flex>
        </v-layout>
        <v-flex>
        </v-flex>
      </v-layout>
      <v-card flat>
        <v-card-text>
          <div v-show="x === 'Limit'">
            <v-layout row>
              <v-flex xs6>
                <v-card class="test">
                  <h3> Buy </h3>
                  <p>available Balance</p>
                  <p> {{ AvailableBuyBalance }}</p>
                  <v-layout row>
                    <v-flex>
                      <v-subheader>Buy Price</v-subheader>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        color="blue"
                        v-model="buyPrice"
                        placeholder=":buyPrice">
                      </v-text-field>
                    </v-flex>

                    <v-flex>
                      <v-subheader>Amount</v-subheader>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        color="blue"
                        v-model="buyQuantity">
                      </v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-subheader>Total</v-subheader>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        color="blue"
                        v-model="computeBuyTotal">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                    <v-switch
                      label="Would you like to attach a sell Policy to the trade click the switch:"
                      v-model="switch1"
                    ></v-switch>
                  <div v-show="switch1 === true">
                    <v-layout row>
                      <v-flex>
                        <v-subheader>Sell Price</v-subheader>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          color="blue"
                          v-model="sellPrice"
                          placeholder=":sellPrice">
                        </v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-subheader>Amount</v-subheader>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          color="blue"
                          v-model="computeAmountIncludingTradingFee"
                          placeholder=":sellQuantity">
                        </v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-subheader>Total</v-subheader>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          color="blue"
                          v-model="computeSellTotal"
                          placeholder="0">
                        </v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-subheader>P/L+-</v-subheader>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          color="blue"
                          v-model="computeProfitLoss">
                        </v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-subheader>Percentage</v-subheader>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          color="blue"
                          v-model="computePercentageChange">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </div>
                  <v-btn @click="selltradeSubmit"> Buy </v-btn>
                </v-card>
              </v-flex>

              <v-flex xs6>
                <v-card class="test">
                  <h3> Sell </h3>
                  <p>Available Balance</p>
                  <p> {{ AvailableSellBalance }}</p>
                  <v-text-field
                    color="blue"
                    label="Sell Price"
                    v-model="sellPrice"
                    placeholder=":sellPrice">>
                    </v-text-field>
                  <v-text-field
                    color="blue"
                    label="Trigger Sell Price"
                    v-model="sellTriggerPrice">
                    </v-text-field>
                  <v-text-field
                    color="blue"
                    label="Amount"
                    v-model="sellQuantity">
                    </v-text-field>
                  <v-text-field
                    color="blue"
                    label="Total"
                    v-model="computeSellTotal">
                    </v-text-field>
                  <br>
                  <v-btn @click="selltradeSubmit"> Sell </v-btn>
                  <br>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
          <div v-show="x === 'Stop_Loss_Limit'">
            <v-layout row>
              <v-flex xs6>
                <v-card class="test">
                  <h3> Buy </h3>
                  <p>available Balance</p>
                  <p> {{ AvailableBuyBalance }}</p>
                  <v-layout row>
                    <v-flex>
                      <v-subheader>Buy Price</v-subheader>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        color="blue"
                        v-model="buyPrice"
                        placeholder=":buyPrice">
                      </v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-subheader>Trigger Buy Price</v-subheader>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        color="blue"
                        v-model="buyTriggerPrice">
                      </v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-subheader>Amount</v-subheader>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        color="blue"
                        v-model="buyQuantity">
                      </v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-subheader>Total</v-subheader>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        color="blue"
                        v-model="computeBuyTotal">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <br>
                  <v-btn @click="buytradeSubmit"> Buy </v-btn>
                  <br>
                </v-card>
              </v-flex>
              <v-flex xs6>
                <v-card class="test">
                  <h3> Sell </h3>
                  <p>Available Balance</p>
                  <p> {{ AvailableSellBalance }}</p>
                  <v-text-field
                    color="blue"
                    label="Sell Price"
                    v-model="sellPrice"
                    placeholder=":sellPrice">>
                    </v-text-field>
                  <v-text-field
                    color="blue"
                    label="Trigger Sell Price"
                    v-model="sellTriggerPrice">
                    </v-text-field>
                  <v-text-field
                    color="blue"
                    label="Amount"
                    v-model="sellQuantity">
                    </v-text-field>
                  <v-text-field
                    color="blue"
                    label="Total"
                    v-model="computeSellTotal">
                    </v-text-field>
                  <br>
                  <v-btn @click="getOrders"> Sell </v-btn>
                  <br>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
      </v-card>
      <v-layout column>
        <v-card flat>
          <v-card-text>
            <v-card>
            <v-card-title>
            <v-btn outline small color="black" @click="getOrders('single')">{{ symbol }}</v-btn>
            <v-btn outline small color="black" @click="getCoinInfo()">All Markets</v-btn>
            <v-spacer></v-spacer>
            <v-btn outline small color="black" @click="getOrders('openOrder')">Open Orders</v-btn>
            <v-btn outline small color="black" @click="getOrders('orderHistory')">Order History</v-btn>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="binanceDataArray">
                <template slot="items" slot-scope="props">
                  <tr @click="toTradeRouter(props.item.symbol)">
                  <td class="text-xs-left">{{ props.item.time }}</td>
                  <td class="text-xs-left">{{ props.item.symbol }}</td>
                  <td class="text-xs-left">{{ props.item.type }}</td>
                  <td class="text-xs-left">{{ props.item.origQty }}</td>
                  <td class="text-xs-left">{{ props.item.price }}</td>
                  <td class="text-xs-left">{{ props.item.side }}</td>
                  <td class="text-xs-left">{{ props.item.status }}</td>
                  <td class="text-xs-left">{{ props.item.orderId }}</td>
                  </tr>
                </template>
            </v-data-table>
          </v-card>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  props: ['symbols', 'exchange'],
  data () {
    return {
      coinSymbolInfo: [],
      dialog: false,
      switch1: true,

      x: 'Limit',
      items: [
        'Limit',
        'Stop_Loss_Limit'],

      headers: [
        { text: 'Time', value: 'time' },
        { text: 'Market', value: 'symbol' },
        { text: 'Type', value: 'type' },
        { text: 'Quantity', value: 'origQty' },
        { text: 'Price', value: 'price' },
        { text: 'Side', value: 'side' },
        { text: 'Status', value: 'status' },
        { text: 'OrderID', value: 'orderId' }],
      binanceDataArray: [],
      orderHistoryData: [],

      symbol: '',

      buyPrice: '',
      sellPrice: '',
      buyTriggerPrice: '',
      sellTriggerPrice: '',
      buyQuantity: '',
      sellQuantity: '',
      buyPercentage: '',
      sellPercentage: '',
      AvailableBuyBalance: '',
      AvailableSellBalance: '',
      sellTotal: '',
      buyTotal: '',
      tradeSide: '',
      tradeType: '',

      errormessage: null,
      tmp2: '',
      testMe: [],
      symbolsForGetOrder: []
    }
  },
  beforeMount () {
    console.log(this.exchange)
    if (this.symbols) {
      this.symbol = this.symbols
      this.getCurrentPriceSingleCoin()
      this.getBalance()
      this.getOrders('openOrder')
      this.getCoinInfo()
    }
  },
  computed: {
    computeBuyTotal: function () {
      return this.buyPrice * this.buyQuantity - (this.buyQuantity * 0.001)
    },
    computeAmountIncludingTradingFee: function () {
      return this.buyQuantity - (this.buyQuantity * 0.001)
    },
    computeSellTotal: function () {
      return this.sellPrice * this.computeAmountIncludingTradingFee
    },
    computeProfitLoss: function () {
      return this.computeSellTotal - this.computeBuyTotal
    },
    computePercentageChange: function () {
      return (this.computeSellTotal - this.computeBuyTotal) / this.computeBuyTotal * 100
    }
  },

  methods: {
    async getCoinInfo () {
      try {
        await AuthenticationService.getCoinInfo({
          symbol: this.symbol,
          exchange: this.exchange
        })
          .then(response => {
            this.coinSymbolInfo = response.data.something
            console.log(this.coinSymbolInfo)
          }).catch(err => console.log(err))
      } catch (err) {
        this.errormessage = err.response
      }
    },

    async getCurrentPriceSingleCoin () {
      try {
        var coinPrice = ''
        await AuthenticationService.getCurrentPriceSingleCoin({
          symbol: this.symbol,
          exchange: this.exchange
        })
          .then(function (response) {
            coinPrice = response.data.singleCoinPrice
          }).catch(err => console.log(err))
        this.buyPrice = coinPrice
        this.sellPrice = coinPrice
      } catch (err) {
        this.errormessage = err.response.data
      }
    },

    async getOrders (item) {
      if (item === 'orderHistory') {
        this.binanceDataArray = []
        await AuthenticationService.getOrders({
          getOrderType: 'coinSymbol',
          symbol: this.symbol
        })
          .then(response => {
            this.symbolsForGetOrder = response.data.coinSymbolsWithBalance
          }).catch(err => console.log(err))
        var i
        for (i in this.symbolsForGetOrder) {
          if (this.coinSymbolInfo.includes(this.symbolsForGetOrder[i])) {
            await AuthenticationService.getOrders({
              getOrderType: 'orderHistory',
              symbol: this.symbolsForGetOrder[i],
              coinInfo: this.coinSymbolInfo
            })
              .then(response => {
                if (response.data.da.length > 0) {
                  var datatmp = response.data.da
                  var i
                  for (i in datatmp) {
                    this.orderHistoryData.push(datatmp[i])
                  }
                }
              }).catch(err => console.log(err))
          }
        }
        this.binanceDataArray = this.orderHistoryData
      } else {
        try {
          await AuthenticationService.getOrders({
            getOrderType: item,
            symbol: this.symbol
          })
            .then(response => {
              this.binanceDataArray = []
              var i
              for (i in response.data.something) {
                this.binanceDataArray.push(response.data.something[i])
              }
            }).catch(err => console.log(err))
        } catch (err) {
          this.errormessage = err.response
        }
      }
    },

    // Gets the Users Balance used to display and check if the user has enough to complete the trade
    async getBalance () {
      try {
        await AuthenticationService.getBalance({
          symbol: this.symbol,
          exchange: this.exchange
        })
          .then(response => {
            console.log(response)
          }).catch(err => console.log(err))
      } catch (err) {
        this.errormessage = err.response
      }
    },
    // When use presses the buy button the function get triggered
    async buytradeSubmit () {
      await this.getBalance()
      if (this.AvailableBuyBalance >= (this.buyQuantity * this.buyPrice)) {
        await AuthenticationService.tradeSubmit({
          symbol: this.symbol,
          quantity: this.buyQuantity,
          price: this.buyPrice,
          side: 'BUY',
          tradeType: this.x.toUpperCase(),
          stopPrice: this.buyTriggerPrice
        })
          .then(response => {
            if (response.status === 200) {
              console.log('Your Order has been placed to Binance')
              this.getBalance()
            }
          })
      } else {
        console.log('Sorry you dont have enough USDT to complete this trade')
      }
      this.getBalance()
    },
    // When use presses the sell button the function get triggered
    async selltradeSubmit () {
      try {
        await AuthenticationService.tradeSubmit({
          symbol: this.symbol,
          quantity: this.sellQuantity,
          price: this.sellPrice,
          side: 'SELL',
          tradeType: this.x.toUpperCase()
        })
          .then(response => {
            console.log(response.data.tradeMakerData)
          })
      } catch (err) {
        this.errormessage = err.response
      }
    }
  }
}

</script>
 <style scoped>
 .error {
   color:black;
   }
.test {
  padding: 16px;
}
</style>
