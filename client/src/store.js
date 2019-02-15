import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchText: ''
  },
  mutations: {
    setSearchText (state, newSearchText) {
      state.searchText = newSearchText
    }
  },
  actions: {

  }
})
