import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    searchText: '',
    flags: [],
    showTags: JSON.parse(localStorage.getItem('hbl-feature-flags:showTags'))
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
    }
  },
  actions: {

  }
})

export default store
