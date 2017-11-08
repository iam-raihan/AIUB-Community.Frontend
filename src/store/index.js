import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

let backendSiteUrl = 'http://localhost:7000/api'

export const store = new Vuex.Store({
  state: {
    openDialogs: {
      logIn: false,
      register: false
    },
    axiosWorking: false,
    wrongCredentials: {
      id: true,
      pass: true
    },
    loggedIn: !!localStorage.getItem('token')
  },
  mutations: {
    setOpenDialogs (state, payload) {
      if (payload.dialog === 'logIn') {
        state.openDialogs.logIn = payload.open
      } else {
        state.openDialogs.register = payload.open
      }
    },
    setAxiosWorking (state, payload) {
      state.axiosWorking = payload
    },
    setWrongCredentials (state, payload) {
      if (payload.data === 'id') {
        state.wrongCredentials.id = payload.value
      } else {
        state.wrongCredentials.pass = payload.value
      }
    },
    setLoggedIn (state, payload) {
      state.loggedIn = payload
    }
  },
  actions: {
    openDialogs ({commit}, payload) {
      commit('setOpenDialogs', payload)
    },
    signIn ({commit}, payload) {
      commit('setAxiosWorking', true)
      axios.post(backendSiteUrl + '/check')
        .then(
          (response) => {
            console.log(response)
            localStorage.setItem('token', 'xyz')
            // commit('setWrongCredentials', {'data': 'id', 'value': 'you are not registered'})
            commit('setLoggedIn', true)
            commit('setAxiosWorking', false)
            commit('setOpenDialogs', {'dialog': 'logIn', 'open': false})
          }
        )
        .catch(
          (error) => {
            console.log(error)
            commit('setAxiosWorking', false)
          }
        )
    },
    signOut ({commit}, payload) {
      commit('setLoggedIn', false)
      localStorage.removeItem('token')
    },
    changeWrongCredentials ({commit}, payload) {
      commit('setWrongCredentials', {'data': payload, 'value': true})
    }
  },
  getters: {
    getOpenDialogs (state) {
      return state.openDialogs
    },
    getAxiosWorking (state) {
      return state.axiosWorking
    },
    getWrongCredentials (state) {
      return state.wrongCredentials
    },
    getLoggedIn (state) {
      return state.loggedIn
    }
  }
})
