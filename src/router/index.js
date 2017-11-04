import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import MySections from '@/components/MySections'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sections',
      name: 'MySections',
      component: MySections
    }
  ],
  mode: 'history'
})
