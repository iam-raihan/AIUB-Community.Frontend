import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import MySections from '@/components/MySections'
import Section from '@/components/Section'
import { store } from '@/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sections',
      name: 'mySections',
      component: MySections,
      beforeEnter: (to, from, next) => {
        if (!store.getters.getLoggedIn) {
          store.dispatch('openDialogs', {'dialog': 'signIn', 'open': true})
          next(from.path)
        } else {
          next()
        }
      }
    },
    {
      path: '/section/:classid',
      name: 'section',
      component: Section,
      beforeEnter: (to, from, next) => {
        if (!store.getters.getLoggedIn) {
          store.dispatch('openDialogs', {'dialog': 'signIn', 'open': true})
          next(from.path)
        } else {
          next()
        }
      }
    }
  ],
  mode: 'history'
})

/* TODO: bangla buddhi baad diye use vue-acl to protect routes */
