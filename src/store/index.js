import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:7000/api'
sessionStorage.removeItem('users')
export const store = new Vuex.Store({
  state: {
    openDialogs: {
      logIn: false,
      register: false
    },
    loadings: {
      axios: false,
      loadAuthUserSections: false,
      loadAllSections: false
    },
    logInErrorMsgs: {
      id: true,
      pass: true
    },
    authUser: JSON.parse(localStorage.getItem('authUser')),
    users: JSON.parse(sessionStorage.getItem('users')) || {},
    sections: JSON.parse(sessionStorage.getItem('sections')) || []
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
        case 'loadAuthUserSections':
          state.loadings.loadAuthUserSections = payload.value
          break
        case 'loadAllSections':
          state.loadings.loadAllSections = payload.value
      }
    },
    setLogInErrorMsgs (state, payload) {
      if (payload.field === 'id') {
        state.logInErrorMsgs.id = payload.value
      } else {
        state.logInErrorMsgs.pass = payload.value
      }
    },
    setAuthUser (state, payload) {
      state.authUser = payload
      if (payload) {
        localStorage.setItem('authUser', JSON.stringify(payload))
      } else {
        localStorage.removeItem('authUser')
      }
    },
    setAuthUserSections (state, payload) {
      state.authUser.user.sections = payload
      localStorage.setItem('authUser', JSON.stringify(state.authUser))
    },
    addUser (state, payload) {
      state.users[payload.id] = payload.data
      sessionStorage.setItem('users', JSON.stringify(state.users))
    },
    setAllSections (state, payload) {
      state.sections = payload
      sessionStorage.setItem('sections', JSON.stringify(payload))
    }
  },
  actions: {
    appLoaded ({dispatch, state}) {
      if (state.sections.length === 0) {
        dispatch('loadAllSections')
      }
    },
    loadAllSections ({commit}) {
      commit('setLoadings', {'item': 'loadAllSections', 'value': true})
      axios.get('/sections'
      ).then(
        (response) => {
          commit('setLoadings', {'item': 'loadAllSections', 'value': false})
          commit('setAllSections', response.data.sections)
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'loadAllSections', 'value': false})
          console.log(error)
        }
      )
    },
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
          commit('setAuthUser', response.data)
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
      commit('setAuthUser', false)
    },
    changeLogInErrorMsgs ({commit}, payload) {
      commit('setLogInErrorMsgs', {'field': payload, 'value': true})
    },
    loadAuthUserSections ({commit, state}) {
      commit('setLoadings', {'item': 'loadAuthUserSections', 'value': true})
      axios.post('/user/sections?token=' + state.authUser.token
      ).then(
        (response) => {
          commit('setLoadings', {'item': 'loadAuthUserSections', 'value': false})
          commit('setAuthUserSections', response.data.data)
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'loadAuthUserSections', 'value': false})
          console.log(error)
        }
      )
    },
    loadUser ({commit, state}, payload) {
      commit('setLoadings', {'item': 'axios', 'value': true})
      axios.post('/user/sections/' + payload + '/?token=' + state.authUser.token
      ).then(
        (response) => {
          commit('setLoadings', {'item': 'axios', 'value': false})
          commit('addUser', {'id': payload, 'data': response.data.data})
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
      return !!state.authUser
    },
    getAuthUser (state) {
      return state.authUser
    },
    getUsers (state) {
      return state.users
    },
    getSections (state) {
      return state.sections.sort((sectionA, sectionB) => {
        if (sectionA.name > sectionB.name) {
          return 1
        } else if (sectionA.name < sectionB.name) {
          return -1
        }
        return 0
      })
    }
  }
})
