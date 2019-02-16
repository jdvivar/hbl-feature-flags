import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchText: '',
    flags: [],
    showTags: false
  },
  mutations: {
    setSearchText (state, newSearchText) {
      state.searchText = newSearchText
    },
    setFlags (state, flags) {
      state.flags = flags
    },
    setShowTags (state, newValue) {
      state.showTags = newValue
    }
  },
  actions: {

  }
})
