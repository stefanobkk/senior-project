<template>
  <v-toolbar fixed>
    <v-toolbar-title >
      Bangkok Traders
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat>
        <router-link to="/login" >
          Login
        </router-link>
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn flat>
        <router-link to="/register" >
          Register
        </router-link>
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn flat>
        <router-link to="/trade" >
          Trade
        </router-link>
      </v-btn>
    </v-toolbar-items>

  </v-toolbar>

</template>

<script>
export default {

}
</script>

<style scoped>
</style>
