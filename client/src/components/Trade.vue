<template>
  <v-container grid-list-md>
    <v-layout column wrap>
      <p> http://localhost:8080/#/trades/binance/ETH_USDT</p>
      <v-flex xs6>
        <div class = "white elevation-4">
          <v-toolbar dark class="orange">
            <v-toolbar-title class="white--text">Trade</v-toolbar-title>
          </v-toolbar>
          <v-layout row>
            <v-flex xs6>
              <p> Buy</p>
              <v-text-field
                color="blue"
                label="Symbol"
                v-model="symbol"
                placeholder="symbol">
                </v-text-field>
              <v-text-field
                color="blue"
                label="Quantity"
                v-model="quantity"
                placeholder="quantity">
                </v-text-field>
              <v-text-field
                color="blue"
                label="PriceAction"
                v-model="priceaction"
                placeholder="priceaction">
                </v-text-field>
              <br>
              <p v-html="price" class="something">
              </p>
              <v-btn class="white--text" @click="binance"> Binance </v-btn>
              <br>
            </v-flex>
            <v-flex xs6 offset-xs3>
              <p> Sell</p>
              <v-text-field
                color="blue"
                label="Symbol"
                v-model="symbol"
                placeholder="symbol">
                </v-text-field>
              <v-text-field
                color="blue"
                label="Quantity"
                v-model="quantity"
                placeholder="quantity">
                </v-text-field>
              <v-text-field
                color="blue"
                label="PriceAction"
                v-model="priceaction"
                placeholder="priceaction">
                </v-text-field>
              <br>
              <p v-html="price" class="something">
              </p>
              <v-btn class="white--text" @click="binance"> Binance </v-btn>
              <br>
            </v-flex>
          </v-layout>
          <div> {{ message }} </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  props: ['symbols'],
  data () {
    return {
      message: '',
      symbol: '',
      price: '',
      priceaction: '',
      quantity: '',

      errormessage: null
    }
  },
  mounted () {
    if (this.symbols) {
      this.message = this.symbols
    }
  },

  methods: {
    async binance () {
      try {
        var coinPrice = ''
        await AuthenticationService.binance({
          symbol: this.message
        })
          .then(function (response) {
            coinPrice = response.data.something
          }).catch(err => console.log(err))
        this.price = coinPrice
        console.log(this.symbol + ' : ' + coinPrice)
      } catch (err) {
        this.errormessage = err.response.data.something
      }
    }
  }
}
</script>
 <style scoped>
 .error {
   color:black;
   }
</style>
