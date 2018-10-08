<template>
  <v-layout colum>
    <v-flex xs6 offset-xs3>
      <div class = "white elevation-2">
        <v-toolbar dark class="orange">
          <v-toolbar-title class="white--text">Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-4 pb-2">
          <br>
          <v-text-field
            color="blue"
            label="Email"
            v-model="email"
            placeholder="email">
            </v-text-field>
          <br>
          <v-text-field
            color="blue"
            label="Password"
            v-model="password"
            placeholder="password" >
            </v-text-field>
          <br>
          <div v-html="errormessage" class="error">
          </div>
          <v-btn class="white--text" @click="login"> Login </v-btn>
          <br>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      errormessage: null
    }
  },
  methods: {
    async login () {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
      } catch (err) {
        this.errormessage = err.response.data.error
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
