import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'

Vue.use(Vuetify)
Vue.use(VueLazyLoad, {
  loading: '/static/loading.gif',
  error: '/static/loading.gif'
})
Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    this.$store.dispatch('appLoaded')
  }
})
