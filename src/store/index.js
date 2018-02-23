import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import FontFaceObserver from 'fontfaceobserver'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:7000/api'

// ##########
// remove 1 hour old user + section data stored in localstorage
let dataStoringFrom = Date.parse(localStorage.getItem('dataStoringFrom')) || false
let isOldData = false
if (dataStoringFrom) {
  isOldData = (new Date() - dataStoringFrom) / 1000 > 60 * 60
  if (isOldData) {
    localStorage.removeItem('usersData')
    localStorage.removeItem('sectionsData')
    localStorage.setItem('dataStoringFrom', new Date().toString())
  }
} else {
  localStorage.setItem('dataStoringFrom', new Date().toString())
}
// ##########

export const store = new Vuex.Store({
  state: {
    fontsLoaded: false,
    signOutClicked: false,
    openDialogs: {
      signIn: false,
      signUp: false,
      download: false,
      lightBox: false
    },
    loadings: {
      axios: false,
      signingOut: false,
      loadAuthUserSections: false,
      loadAllSections: false
    },
    signInErrorMsgs: {
      id: true,
      pass: true
    },
    authUser: JSON.parse(localStorage.getItem('authUser') || sessionStorage.getItem('authUser')),
    usersData: JSON.parse(localStorage.getItem('usersData')) || {},
    sectionsData: JSON.parse(localStorage.getItem('sectionsData')) || {}
  },
  mutations: {
    setFontsLoaded (state, payload) {
      state.fontsLoaded = payload
    },
    setSignOutClicked (state, payload) {
      state.signOutClicked = payload
    },
    setOpenDialogs (state, payload) {
      switch (payload.dialog) {
        case 'signIn':
          state.openDialogs.signIn = payload.open
          break
        case 'signUp':
          state.openDialogs.signUp = payload.open
          break
        case 'download':
          state.openDialogs.download = payload.open
          break
        case 'lightBox':
          state.openDialogs.lightBox = payload.open
      }
    },
    setLoadings (state, payload) {
      switch (payload.item) {
        case 'axios':
          state.loadings.axios = payload.value
          break
        case 'signingOut':
          state.loadings.signingOut = payload.value
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
      if (payload) {
        state.authUser = payload.data
        state.authUser['remember'] = payload.remember
        if (payload.remember) {
          localStorage.setItem('authUser', JSON.stringify(state.authUser))
        } else {
          sessionStorage.setItem('authUser', JSON.stringify(state.authUser))
        }
      } else {
        state.authUser = false
        localStorage.removeItem('authUser')
        sessionStorage.removeItem('authUser')
      }
    },
    setAuthUserSections (state, payload) {
      if (state.authUser) {
        state.authUser.user.sections = payload
        if (state.authUser.remember) {
          localStorage.setItem('authUser', JSON.stringify(state.authUser))
        } else {
          sessionStorage.setItem('authUser', JSON.stringify(state.authUser))
        }
      }
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
    appLoaded ({commit, state, dispatch}) {
      const fontA = new FontFaceObserver('Material Icons')
      const fontB = new FontFaceObserver('Open Sans')
      const fontC = new FontFaceObserver('Roboto', {
        weight: 500
      })
      Promise.all([fontA.load(), fontB.load(), fontC.load()]).then(() => {
        console.log('fontObserver: loaded')
        commit('setFontsLoaded', true)
      }, () => {
        console.log('fontObserver: 3s timeout')
        commit('setFontsLoaded', true)
      })
      if (state.authUser && isOldData) {
        dispatch('loadAuthUserSections')
      }
      if (Object.keys(state.sectionsData).length === 0) {
        dispatch('loadAllSections')
      }
    },
    loadAllSections ({commit}) {
      commit('setLoadings', {'item': 'loadAllSections', 'value': true})
      axios.post('/sections'
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
          commit('setAuthUser', {'data': response.data, 'remember': payload.remember})
          commit('setOpenDialogs', {'dialog': 'signIn', 'open': false})
          let sections = []
          response.data.user.sections.forEach(section => {
            sections.push({
              'classid': section.classid,
              'name': section.name
            })
          })
          commit('setUserData', {'portalid': response.data.user.portalid, 'data': sections})
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
    signOutClicked ({commit}, payload) {
      commit('setSignOutClicked', payload)
    },
    signOut ({commit, state}) {
      commit('setLoadings', {'item': 'signingOut', 'value': true})
      commit('setSignOutClicked', false)
      axios.post('/auth/user/signout?token=' + state.authUser.token
      ).then(
        (response) => {
          console.log(response.data)
          commit('setLoadings', {'item': 'signingOut', 'value': false})
          commit('setAuthUser', false)
        }
      ).catch(
        (error) => {
          console.log(error)
          commit('setLoadings', {'item': 'signingOut', 'value': false})
          commit('setAuthUser', false)
        }
      )
    },
    setUnauthorized ({commit}) {
      commit('setAuthUser', false)
      commit('setOpenDialogs', {'dialog': 'signIn', 'open': true})
    },
    changeSignInErrorMsgs ({commit}, payload) {
      commit('setSignInErrorMsgs', {'field': payload, 'value': true})
    },
    loadAuthUserSections ({commit, state, dispatch}) {
      commit('setLoadings', {'item': 'loadAuthUserSections', 'value': true})
      axios.post('/auth/user/sections?token=' + state.authUser.token
      ).then(
        (response) => {
          console.log(response.data)
          commit('setLoadings', {'item': 'loadAuthUserSections', 'value': false})
          commit('setAuthUserSections', response.data.sections)
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'loadAuthUserSections', 'value': false})
          if (error.response.status === 401) {
            dispatch('setUnauthorized')
          }
          console.log(error)
        }
      )
    },
    loadUserData ({commit, state, dispatch}, payload) {
      commit('setLoadings', {'item': 'user', 'portalid': payload, 'value': true})
      axios.post('/auth/user/sections/' + payload + '?token=' + state.authUser.token
      ).then(
        (response) => {
          console.log(response.data)
          commit('setUserData', {'portalid': payload, 'data': response.data.sections})
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'user', 'portalid': payload, 'value': false})
          if (error.response.status === 401) {
            dispatch('setUnauthorized')
          }
          console.log(error)
        }
      )
    },
    loadSectionData ({commit, state, dispatch}, payload) {
      commit('setLoadings', {'item': 'section', 'classid': payload, 'value': true})
      axios.post('/auth/section/users/' + payload + '?token=' + state.authUser.token
      ).then(
        (response) => {
          console.log(response.data)
          commit('setSectionData', {'classid': payload, 'data': response.data.section})
        }
      ).catch(
        (error) => {
          commit('setLoadings', {'item': 'section', 'classid': payload, 'value': false})
          if (error.response.status === 401) {
            dispatch('setUnauthorized')
          }
          console.log(error)
        }
      )
    }
  },
  getters: {
    getSignOutClicked (state) {
      return state.signOutClicked
    },
    getFontsLoaded (state) {
      return state.fontsLoaded
    },
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
      return state.sectionsData
    }
  }
})
