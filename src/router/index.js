import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import MySections from '@/components/MySections'
import Section from '@/components/Section'
import signIn from '@/components/helpers/SignIn'
import signUp from '@/components/helpers/SignUp'
import SignOut from '@/components/SignOut'
import NotFound from '@/components/NotFound'
import { store } from '@/store'

Vue.use(Router)

const router = new Router({
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
      meta: { requiresAuth: true }
    },
    {
      path: '/section/:classid',
      name: 'section',
      component: Section,
      meta: { requiresAuth: true }
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: signIn,
      meta: { requiresGuest: true }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: signUp,
      meta: { requiresGuest: true }
    },
    {
      path: '/sign-out',
      name: 'sign-out',
      component: SignOut,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (store.getters.getSignOutClicked) {
          next()
        } else {
          next({name: 'not-found'})
        }
      }
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '*',
      redirect: 'not-found'
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getLoggedIn) {
      next({
        name: 'sign-in',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.getLoggedIn) {
      next({
        name: 'mySections'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
