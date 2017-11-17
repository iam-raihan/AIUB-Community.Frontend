import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:7000/api'
localStorage.removeItem('usersData')
localStorage.removeItem('sectionsData')
export const store = new Vuex.Store({
  state: {
    openDialogs: {
      signIn: false,
      signUp: false,
      download: false
    },
    loadings: {
      axios: false,
      loadAuthUserSections: false,
      loadAllSections: false
    },
    signInErrorMsgs: {
      id: true,
      pass: true
    },
    authUser: JSON.parse(localStorage.getItem('authUser')),
    usersData: JSON.parse(localStorage.getItem('usersData')) || {},
    sectionsData: JSON.parse(localStorage.getItem('sectionsData')) || {}
  },
  mutations: {
    setOpenDialogs (state, payload) {
      if (payload.dialog === 'signIn') {
        state.openDialogs.signIn = payload.open
      } else if (payload.dialog === 'signUp') {
        state.openDialogs.signUp = payload.open
      } else {
        state.openDialogs.download = payload.open
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
          break
        case 'section':
          state.sectionsData[payload.classid].loading = payload.value
          break
        case 'user':
          let sections = false
          if (payload.portalid in state.usersData) {
            sections = state.usersData[payload.portalid].sections
          }
          Vue.set(state.usersData, payload.portalid, { loading: payload.value, sections })
          // Vue.set is used for reactivity according to vuejs list rendering documentation
      }
    },
    setSignInErrorMsgs (state, payload) {
      if (payload.field === 'id') {
        state.signInErrorMsgs.id = payload.value
      } else {
        state.signInErrorMsgs.pass = payload.value
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
    setUserData (state, payload) {
      let user = {
        loading: false,
        sections: payload.data
      }
      Vue.set(state.usersData, payload.portalid, user)
      localStorage.setItem('usersData', JSON.stringify(state.usersData))
    },
    setSectionData (state, payload) {
      let section = {
        name: payload.data.name,
        loading: false,
        users: payload.data.users
      }
      Vue.set(state.sectionsData, payload.classid, section)
      localStorage.setItem('sectionsData', JSON.stringify(state.sectionsData))
    },
    setAllSectionsData (state, payload) {
      let sections = {}
      payload.forEach((section) => {
        sections[section.classid] = {
          name: section.name,
          loading: false,
          users: state.sectionsData[section.classid] ? state.sectionsData[section.classid].users : false
        }
      })
      state.sectionsData = sections
      localStorage.setItem('sectionsData', JSON.stringify(state.sectionsData))
    }
  },
  actions: {
    appLoaded ({dispatch, state}) {
      if (Object.keys(state.sectionsData).length === 0) {
        dispatch('loadAllSections')
      }
    },
    loadAllSections ({commit}) {
      commit('setLoadings', {'item': 'loadAllSections', 'value': true})
      axios.get('/sections'
      ).then(
        (response) => {
          console.log(response.data)
          commit('setLoadings', {'item': 'loadAllSections', 'value': false})
          commit('setAllSectionsData', response.data.sections)
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
      axios.post('/user/signin',
        {id: payload.id, pass: payload.pass}
      ).then(
        (response) => {
          console.log(response.data)
          commit('setLoadings', {'item': 'axios', 'value': false})
          commit('setAuthUser', response.data)
          commit('setOpenDialogs', {'dialog': 'signIn', 'open': false})
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'axios', 'value': false})
          switch (error.response.status) {
            case 422:
              commit('setSignInErrorMsgs', {'field': error.response.data.field, 'value': error.response.data.msg})
              break
            default:
              commit('setSignInErrorMsgs', {'field': '', 'value': 'something went wrong :( try again'})
          }
        }
      )
    },
    signOut ({commit}) {
      commit('setAuthUser', false)
    },
    changeSignInErrorMsgs ({commit}, payload) {
      commit('setSignInErrorMsgs', {'field': payload, 'value': true})
    },
    loadAuthUserSections ({commit, state}) {
      commit('setLoadings', {'item': 'loadAuthUserSections', 'value': true})
      axios.post('/user/sections?token=' + state.authUser.token
      ).then(
        (response) => {
          console.log(response.data)
          commit('setLoadings', {'item': 'loadAuthUserSections', 'value': false})
          commit('setAuthUserSections', response.data.sections)
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'loadAuthUserSections', 'value': false})
          console.log(error)
        }
      )
    },
    loadUserData ({commit, state}, payload) {
      commit('setLoadings', {'item': 'user', 'portalid': payload, 'value': true})
      axios.post('/user/sections/' + payload + '/?token=' + state.authUser.token
      ).then(
        (response) => {
          console.log(response.data)
          commit('setUserData', {'portalid': payload, 'data': response.data.sections})
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'user', 'portalid': payload, 'value': false})
          console.log(error)
        }
      )
    },
    loadSectionData ({commit, state}, payload) {
      commit('setLoadings', {'item': 'section', 'classid': payload, 'value': true})
      axios.post('/section/users/' + payload + '/?token=' + state.authUser.token
      ).then(
        (response) => {
          console.log(response.data)
          commit('setSectionData', {'classid': payload, 'data': response.data.section})
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'section', 'classid': payload, 'value': false})
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
    getSignInErrorMsgs (state) {
      return state.signInErrorMsgs
    },
    getLoggedIn (state) {
      return !!state.authUser
    },
    getAuthUser (state) {
      return state.authUser ? state.authUser.user : false
    },
    getUsers (state) {
      return state.usersData
    },
    getSections (state) {
      let sortedSections = {}
      Object.entries(state.sectionsData).sort((sectionA, sectionB) => {
        if (sectionA[1].name > sectionB[1].name) {
          return 1
        } else if (sectionA[1].name < sectionB[1].name) {
          return -1
        }
        return 0
      }).forEach(([classid, section]) => {
        sortedSections[classid] = section
      })
      return sortedSections
    }
  }
})
