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
      loadUserSections: false,
      loadAllSections: false
    },
    logInErrorMsgs: {
      id: true,
      pass: true
    },
    user: JSON.parse(localStorage.getItem('userData')),
    sectionUsers: JSON.parse(localStorage.getItem('sectionUsers')) || {},
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
        case 'loadUserSections':
          state.loadings.loadUserSections = payload.value
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
    setUser (state, payload) {
      state.user = payload
      if (payload) {
        localStorage.setItem('userData', JSON.stringify(payload))
      } else {
        localStorage.removeItem('userData')
      }
    },
    setUserSections (state, payload) {
      state.user.user.sections = payload
      localStorage.setItem('userData', JSON.stringify(state.user))
    },
    setSectionUsers (state, payload) {
      state.sectionUsers = payload
      localStorage.setItem('sectionUsers', JSON.stringify(payload))
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
    },
    changeLogInErrorMsgs ({commit}, payload) {
      commit('setLogInErrorMsgs', {'field': payload, 'value': true})
    },
    loadUserSections ({commit, state}) {
      commit('setLoadings', {'item': 'loadUserSections', 'value': true})
      axios.post('/user/sections?token=' + state.user.token
      ).then(
        (response) => {
          commit('setLoadings', {'item': 'loadUserSections', 'value': false})
          commit('setUserSections', response.data.data)
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'loadUserSections', 'value': false})
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
