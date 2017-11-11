import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:7000/api'

export const store = new Vuex.Store({
  state: {
    openDialogs: {
      logIn: false,
      register: false
    },
    axiosWorking: false,
    logInErrorMsgs: {
      id: true,
      pass: true
    },
    user: JSON.parse(localStorage.getItem('data'))
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
    setLogInErrorMsgs (state, payload) {
      if (payload.field === 'id') {
        state.logInErrorMsgs.id = payload.value
      } else {
        state.logInErrorMsgs.pass = payload.value
      }
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    openDialogs ({commit}, payload) {
      commit('setOpenDialogs', payload)
    },
    signIn ({commit}, payload) {
      commit('setAxiosWorking', true)
      axios.post('/user/login',
        {id: payload.id, pass: payload.pass}
      ).then(
        (response) => {
          commit('setAxiosWorking', false)
          localStorage.setItem('data', JSON.stringify(response.data))
          commit('setUser', response.data)
          commit('setOpenDialogs', {'dialog': 'logIn', 'open': false})
        }
      ).catch(
        (error) => {
          commit('setAxiosWorking', false)
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
      localStorage.removeItem('data')
    },
    changeLogInErrorMsgs ({commit}, payload) {
      commit('setLogInErrorMsgs', {'field': payload, 'value': true})
    },
    refreshUserSections ({commit, state}) {
      axios.post('/user/sections',
        {header: {'Authorization': 'Bearer ' + state.user.token}}
      ).then(
        (response) => { console.log(response) }
      ).catch(
        (error) => { console.log(error) }
      )
    }
  },
  getters: {
    getOpenDialogs (state) {
      return state.openDialogs
    },
    getAxiosWorking (state) {
      return state.axiosWorking
    },
    getLogInErrorMsgs (state) {
      return state.logInErrorMsgs
    },
    getLoggedIn (state) {
      return !!state.user
    },
    getUserData (state) {
      return state.user
    }
  }
})
