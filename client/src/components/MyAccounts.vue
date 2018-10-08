<template>
  <v-container grid-list-md>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <v-layout row>
      <v-card>
        <v-btn @click="addApiKey" > Add New Api Key </v-btn>
        <v-btn @click="addWallet"> Add Wallet </v-btn>
        <v-card-title>
          Welcome To BKK Traders
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="myAccountDataArray">
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.nickname }}</td>
                <td class="text-xs-left">{{ props.item.exchange }}</td>
                <td class="text-xs-left">{{ props.item.publicApi }}</td>
                <td class="text-xs-left">{{ props.item.privateApi }}</td>
              </template>
        </v-data-table>
      </v-card>
      <div class="pl-4 pr-4 pt-4 pb-2">
        <br>
        <v-combobox
          v-model="exchange"
          :items="items"
          label="Select an Exchange"
        ></v-combobox>
        <br>
        <v-text-field
          color="blue"
          label="Nickname"
          v-model="nickname"
          placeholder="nickname" >
          </v-text-field>
        <br>
        <v-text-field
          color="blue"
          label="PublicApi"
          v-model="publicApi"
          placeholder="publicApi" >
          </v-text-field>
        <br>
        <v-text-field
          color="blue"
          label="PrivateApi"
          v-model="privateApi"
          placeholder="privateApi" >
          </v-text-field>
        <br>
        <v-btn class="white--text" @click="addApiKey"> Submit </v-btn>
        <br>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      exchange: '',
      nickname: '',
      publicApi: '',
      privateApi: '',
      walletAddress: '',
      walletCurrency: '',
      errormessage: null,
      select: 'Binance',
      items: [
        'Binance',
        'BX',
        'Others'
      ],
      active: 0,
      headers: [
        { text: 'Account Nickname', value: 'nickname' },
        { text: 'Exchange', value: 'exchange' },
        { text: 'PublicKey', value: 'publicApi' },
        { text: 'PrivateKey', value: 'privateApi' }
      ],
      myAccountDataArray: []
    }
  },
  methods: {
    async addApiKey () {
      try {
        await AuthenticationService.addApiKey({
          exchange: this.exchange,
          nickname: this.nickname,
          publicApi: this.publicApi,
          privateApi: this.privateApi
        })
          .then(response => {
            var data = response.data.something
            this.myAccountDataArray.push(data)
          })
        console.log(this.myAccountDataArray)
      } catch (err) {
        this.errormessage = err.response
      }
    }
  },
  async addWallet () {
    try {
      await AuthenticationService.addWallet({
        walletCurrency: this.walletAddress,
        nickname: this.nickname,
        walletAddress: this.walletAddress
      })
    } catch (err) {
      this.errormessage = err.response.data.something
    }
  }
}
</script>
<style scoped>

</style>
