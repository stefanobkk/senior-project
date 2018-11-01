import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Trade from '@/components/Trade'
import Homepage from '@/components/Homepage'
import Myaccounts from '@/components/MyAccounts'
import Mybalance from '@/components/MyBalance'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/trade/:exchange/:symbols',
      name: 'trade',
      component: Trade,
      props: true
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      component: Myaccounts
    },
    {
      path: '/mybalance',
      name: 'mybalance',
      component: Mybalance
    }
  ]
})
