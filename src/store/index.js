import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:7000/api'
localStorage.removeItem('sectionUsers')
export const store = new Vuex.Store({
  state: {
    openDialogs: {
      logIn: false,
      register: false
    },
    loadings: {
      axios: false,
      refreshUserSections: false
    },
    logInErrorMsgs: {
      id: true,
      pass: true
    },
    user: JSON.parse(localStorage.getItem('userData')),
    sectionUsers: JSON.parse(localStorage.getItem('sectionUsers')) || {}
  },
  mutations: {
    setOpenDialogs (state, payload) {
      if (payload.dialog === 'logIn') {
        state.openDialogs.logIn = payload.open
      } else {
        state.openDialogs.register = payload.open
      }
    },
    setLoadings (state, payload) {
      switch (payload.item) {
        case 'axios':
          state.loadings.axios = payload.value
          break
        case 'refreshUserSections':
          state.loadings.refreshUserSections = payload.value
          break
      }
    },
    setLogInErrorMsgs (state, payload) {
      if (payload.field === 'id') {
        state.logInErrorMsgs.id = payload.value
      } else {
        state.logInErrorMsgs.pass = payload.value
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    refreshUserSections (state, payload) {
      state.user.user.sections = payload
    },
    setSectionUsers (state, payload) {
      state.sectionUsers = payload
    }
  },
  actions: {
    openDialogs ({commit}, payload) {
      commit('setOpenDialogs', payload)
    },
    signIn ({commit}, payload) {
      commit('setLoadings', {'item': 'axios', 'value': true})
      axios.post('/user/login',
        {id: payload.id, pass: payload.pass}
      ).then(
        (response) => {
          commit('setLoadings', {'item': 'axios', 'value': false})
          localStorage.setItem('userData', JSON.stringify(response.data))
          commit('setUser', response.data)
          commit('setOpenDialogs', {'dialog': 'logIn', 'open': false})
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'axios', 'value': false})
          switch (error.response.status) {
            case 422:
              commit('setLogInErrorMsgs', {'field': error.response.data.field, 'value': error.response.data.msg})
              break
            default:
              commit('setLogInErrorMsgs', {'field': '', 'value': 'something went wrong :( try again'})
          }
        }
      )
    },
    signOut ({commit}) {
      commit('setUser', false)
      commit('setSectionUsers', {})
      localStorage.removeItem('userData')
      localStorage.removeItem('sectionUsers')
    },
    changeLogInErrorMsgs ({commit}, payload) {
      commit('setLogInErrorMsgs', {'field': payload, 'value': true})
    },
    refreshUserSections ({commit, state}) {
      commit('setLoadings', {'item': 'refreshUserSections', 'value': true})
      axios.post('/user/sections?token=' + state.user.token
      ).then(
        (response) => {
          commit('setLoadings', {'item': 'refreshUserSections', 'value': false})
          commit('refreshUserSections', response.data.data)
          localStorage.setItem('userData', JSON.stringify(state.user))
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'refreshUserSections', 'value': false})
          console.log(error)
        }
      )
    },
    loadSectionUser ({commit, state}, payload) {
      commit('setLoadings', {'item': 'axios', 'value': true})
      axios.post('/user/sections/' + payload + '/?token=' + state.user.token
      ).then(
        (response) => {
          commit('setLoadings', {'item': 'axios', 'value': false})
          const sectionUsers = state.sectionUsers
          sectionUsers[payload] = response.data.data
          commit('setSectionUsers', sectionUsers)
          localStorage.setItem('sectionUsers', JSON.stringify(state.sectionUsers))
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'axios', 'value': false})
          console.log(error)
        }
      )
    }
  },
  getters: {
    getOpenDialogs (state) {
      return state.openDialogs
    },
    getLoadings (state) {
      return state.loadings
    },
    getLogInErrorMsgs (state) {
      return state.logInErrorMsgs
    },
    getLoggedIn (state) {
      return !!state.user
    },
    getUserData (state) {
      return state.user
    },
    getSectionUsers (state) {
      return state.sectionUsers
    }
  }
})
