import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VBtn,
  VFooter,
  VForm,
  VCard,
  VMenu,
  VGrid,
  VChip,
  VSubheader,
  VAvatar,
  VExpansionPanel,
  VBadge,
  VTextField,
  VProgressCircular,
  VBottomSheet,
  VCheckbox,
  VDivider,
  VNavigationDrawer,
  VIcon,
  VList,
  VToolbar
} from 'vuetify'

import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VFooter,
    VForm,
    VCard,
    VMenu,
    VGrid,
    VChip,
    VSubheader,
    VAvatar,
    VExpansionPanel,
    VBadge,
    VTextField,
    VProgressCircular,
    VBottomSheet,
    VCheckbox,
    VDivider,
    VNavigationDrawer,
    VIcon,
    VList,
    VToolbar
  }
})

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
