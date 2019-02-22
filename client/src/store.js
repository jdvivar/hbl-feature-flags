import Vue from 'vue'
import Vuex from 'vuex'
import FeatureFlagsApi from '@/services/FeatureFlagsApi'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    searchText: '',
    flags: [],
    showTags: true,
    editMode: false,
    userName: '',
    imageUrl: '',
    authenticated: false
  },
  getters: {
    isAuthenticated: ({ authenticated }) => authenticated
  },
  mutations: {
    setSearchText (state, newSearchText) {
      state.searchText = newSearchText
    },
    setFlags (state, flags) {
      state.flags = flags
    },
    setShowTags (state, newValue) {
      localStorage.setItem('hbl-feature-flags:showTags', newValue)
      state.showTags = newValue
    },
    setEditMode (state, newValue) {
      localStorage.setItem('hbl-feature-flags:editMode', newValue)
      state.editMode = newValue
    },
    setUserName (state, newUserName) {
      state.userName = newUserName
    },
    setImageUrl (state, newImageUrl) {
      state.imageUrl = newImageUrl
    },
    setAuthenticated (state, newAuthState) {
      state.authenticated = newAuthState
    }
  },
  actions: {
    async addFlag ({ commit, state }, flag) {
      try {
        const newFlag = await FeatureFlagsApi.post(flag)
        state.flags.push(newFlag)
        commit('setFlags', state.flags)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async removeFlag ({ commit, state }, id) {
      try {
        await FeatureFlagsApi.delete(id)
        commit('setFlags', state.flags.filter(flag => flag.id !== id))
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async setDescription (context, payload) {
      await setKey('description', context, payload)
    },
    async setName (context, payload) {
      await setKey('name', context, payload)
    },
    async setStatus (context, payload) {
      await setKey('status', context, payload)
    },
    async setTags (context, payload) {
      await setKey('tags', context, payload)
    },
    logIn ({ commit }, user) {
      commit('setUserName', user.getBasicProfile().getGivenName())
      commit('setImageUrl', user.getBasicProfile().getImageUrl())
      commit('setAuthenticated', true)
      router.push({ name: 'flags' })
    },
    async logOut ({ commit, state }) {
      commit('setUserName', '')
      commit('setImageUrl', '')
      commit('setAuthenticated', false)
      await window.gapi.auth2.getAuthInstance().signOut()
      router.push({ name: 'auth' })
    }
  }
})

async function setKey (key, { commit, state }, payload) {
  const flagToUpdate = state.flags.find(flag => flag.id === payload.id)
  const oldKeyValue = flagToUpdate[key]
  flagToUpdate[key] = payload[key]
  try {
    await FeatureFlagsApi.put(payload.id, flagToUpdate)
    commit('setFlags', state.flags)
  } catch (error) {
    flagToUpdate[key] = oldKeyValue
    return Promise.reject(error)
  }
}

if (localStorage.getItem('hbl-feature-flags:showTags')) {
  store.commit('setShowTags', JSON.parse(localStorage.getItem('hbl-feature-flags:showTags')))
}

if (localStorage.getItem('hbl-feature-flags:editMode')) {
  store.commit('setEditMode', JSON.parse(localStorage.getItem('hbl-feature-flags:editMode')))
}

export default store
