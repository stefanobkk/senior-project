<template>
  <v-container grid-list>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <v-layout column>
      <v-card>
        <v-card-title>
          Funds
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
              :items="myAccountDataArray"
              :search="search">
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.asset }}</td>
                <td class="text-xs-left">{{ props.item.free }}</td>
                <td class="text-xs-left">{{ props.item.locked }}</td>
                <td class="text-xs-left">{{ props.item.total }}</td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
        </v-data-table>
      </v-card>
      <div>
      <v-checkbox :label="`Binance`" v-model="checkbox1"></v-checkbox>
      <v-checkbox :label="`BX`" v-model="checkbox2"></v-checkbox>
      </div>
      <v-btn class="white--text" @click="getMyAccountData"> Submit </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      active: 0,
      asset: '',
      free: '',
      locked: '',
      total: '',
      search: '',
      checkbox1: 'Binance',
      checkbox2: 'BX',
      headers: [
        { text: 'Currency', value: 'asset' },
        { text: 'Available', value: 'free' },
        { text: 'Hold', value: 'locked' },
        { text: 'Total', value: 'total' }
      ],
      myAccountDataArray: []
    }
  },
  methods: {
    async getMyAccountData () {
      try {
        await AuthenticationService.getMyAccountData()
          .then(response => {
            var data = response.data.userBalance
            console.log(data)
            var i
            for (i = 0; i < data.length; i++) {
              if (data[i].free > 0) {
                this.myAccountDataArray.push(data[i])
              }
            }
          }).catch(err => console.log(err))
      } catch (err) {
        this.errormessage = err.response
      }
    }
  }
}
</script>
<style scoped>

</style>
