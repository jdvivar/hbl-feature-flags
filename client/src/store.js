import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    searchText: '',
    flags: [],
    showTags: true,
    editMode: false
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
    }
  },
  actions: {

  }
})

if (localStorage.getItem('hbl-feature-flags:showTags')) {
  store.commit('setShowTags', JSON.parse(localStorage.getItem('hbl-feature-flags:showTags')))
}

if (localStorage.getItem('hbl-feature-flags:editMode')) {
  store.commit('setEditMode', JSON.parse(localStorage.getItem('hbl-feature-flags:editMode')))
}


export default store
