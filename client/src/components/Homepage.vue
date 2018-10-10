<template>
  <v-container grid-list-md>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <v-layout row>
      <v-toolbar
        color="black"
        dark
        height="80"
        extension-height="150">
      <v-text-field
          label="Search"
          solo-inverted
          class="mx-3"
          flat></v-text-field>
        <v-tabs
          slot="extension"
          centered
          v-model="tabs"
          slider-color="white"
          color="transparent"
          height="150"
          show-arrows>
          <v-tab
            v-for="n in 4"
            :key="n">
            <v-layout row wrap>
              <v-flex xs12>
                BTC
              </v-flex>
              <v-flex xs12>
                Bitcoin
              </v-flex>
              <v-flex xs12>
                $ 8570.87
              </v-flex>
              <v-flex xs12 sm3 offset-xs2>
                <v-icon small>today</v-icon>
                <span>-1.94 %</span>
              </v-flex>
              <v-flex xs12 sm3 offset-xs1>
                <v-icon small>view_week</v-icon>
                <span>32.22 %</span>
              </v-flex>
              <v-flex xs12>
                $ 5973140000.0
              </v-flex>
            </v-layout>
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tabs">
        <v-tab-item
          v-for="n in 4"
          :key="n"
        >
        </v-tab-item>
      </v-tabs-items>
    </v-layout>
    <br>
    <br>
      <v-tabs
        v-model="active"
        color="cyan"
        dark
        grow
        slider-color="yellow">
        <v-tab
          v-for="n in 3"
          :key="n"
          ripple>
          Item {{ n }}
        </v-tab>
        <v-tab-item
          v-for="n in 3"
          :key="n">
          <v-card flat>
            <v-card-text>
              <v-card>
              <v-card-title>
                Frontpage
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="binanceDataArray"
                :search="search">
                  <template slot="items" slot-scope="props">
                    <tr @click="toTradeRouter(props.item.symbol)">
                    <td class="text-xs-left">{{ props.item.symbol }}</td>
                    <td class="text-xs-left">{{ props.item.lastPrice }}</td>
                    <td class="text-xs-left">{{ props.item.priceChangePercent }}</td>
                    <td class="text-xs-left">{{ props.item.volume }}</td>
                    <td class="text-xs-left">{{ props.item.weightedAvgPrice }}</td>
                    </tr>
                  </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                  Your search for "{{ search }}" found no results.
                </v-alert>
              </v-data-table>
            </v-card>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    <br>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'trade',
  data () {
    return {
      symbol: '',
      price: '',
      volume: '',
      data: null,
      priceChangePercent: '',
      weightedAvgPrice: '',
      active: 0,
      search: '',
      headers: [
        { text: 'Symbol', value: 'symbol' },
        { text: 'Latest Price', value: 'lastPrice' },
        { text: '24Hr % change', value: 'priceChangePercent' },
        { text: '24Hr volume ', value: 'volume' },
        { text: 'Weighted Average Price', value: 'weightedAvgPrice' }
      ],
      binanceDataArray: []
    }
  },
  methods: {
    async binanceData () {
      try {
        await AuthenticationService.binanceData()
          .then(response => {
            var data = response.data.something
            var i
            for (i = 0; i < data.length; i++) {
              this.binanceDataArray.push(data[i])
            }
          }).catch(err => console.log(err))
      } catch (err) {
        this.errormessage = err.response.data.something
      }
    },
    toTradeRouter (id) {
      this.$router.push({ name: 'trade', params: { symbols: id } })
    }
  },
  beforeMount () {
    this.binanceData()
  }
}

</script>
 <style scoped>

</style>
