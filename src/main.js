
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'

import NavBar from './NavBar.vue'
import LogIn from '@/components/LogIn'

Vue.use(Vuetify)
Vue.use(VueLazyLoad, {
  loading: '/static/loading.gif',
  error: '/static/loading.gif'
})
Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false

Vue.component('my-navbar', NavBar)
Vue.component('my-login', LogIn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
