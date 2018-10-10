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
        <v-layout column wrap>
          <v-flex xs12>
            <v-combobox
              :items="compareCoinPrice"
              label="Compare Coins"
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
                  <v-btn @click="queryUserOrder"> Sell </v-btn>
                  <br>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  props: ['symbols'],
  data () {
    return {
      x: 'Limit',
      items: [
        'Limit',
        'Stop_Loss_Limit'
      ],
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
      errormessage: null
    }
  },
  mounted () {
    if (this.symbols) {
      this.symbol = this.symbols
      this.binance()
      this.getMyAccountData()
    }
  },
  computed: {
    computeBuyTotal: function () {
      return this.buyPrice * this.buyQuantity
    },
    computeSellTotal: function () {
      return this.sellPrice * this.sellQuantity
    }
  },

  methods: {
    async binance () {
      try {
        var coinPrice = ''
        await AuthenticationService.binance({
          symbol: this.symbol
        })
          .then(function (response) {
            coinPrice = response.data.singleCoinPrice
          }).catch(err => console.log(err))
        console.log(this.symbol + ' : ' + coinPrice)
        this.buyPrice = coinPrice
        this.sellPrice = coinPrice
      } catch (err) {
        this.errormessage = err.response.data
      }
    },
    async getMyAccountData () {
      try {
        await AuthenticationService.getMyAccountData()
          .then(response => {
            var data = response.data.userBalance
            var i
            for (i = 0; i < data.length; i++) {
              if (this.symbol.substr(0, 3).includes(data[i].asset)) {
                this.AvailableSellBalance = data[i].free
              }
              if (this.symbol.substr(3, this.symbol.length).includes(data[i].asset)) {
                this.AvailableBuyBalance = data[i].free
              }
            }
          }).catch(err => console.log(err))
      } catch (err) {
        this.errormessage = err.response
      }
    },
    async buytradeSubmit () {
      await this.getMyAccountData()
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
              this.getMyAccountData()
            }
          })
      } else {
        console.log('Sorry you dont have enough USDT to complete this trade')
      }
      this.getMyAccountData()
    },
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
    },

    async queryUserOrder () {
      try {
        await AuthenticationService.queryUserOrder({
          symbol: this.symbol
        })
          .then(response => {
            console.log(response.data.UserOrder)
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
