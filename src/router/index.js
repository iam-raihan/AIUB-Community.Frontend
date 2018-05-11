import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import MySections from '@/components/MySections'
import Section from '@/components/Section'
import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import SignOut from '@/components/auth/SignOut'
import ForgotPassword from '@/components/auth/ForgotPassword'
import ChangePassword from '@/components/auth/ChangePassword'
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
      component: SignIn,
      meta: { requiresGuest: true }
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
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
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: { requiresGuest: true }
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePassword,
      meta: { requiresGuest: true },
      props: (route) => ({ token: route.query.token })
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
