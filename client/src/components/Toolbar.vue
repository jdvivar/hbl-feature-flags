<template>
  <div class="toolbar">
    <input
        :disabled="error"
        type="text"
        class="nes-input"
        placeholder="Filterr my frriend..."
        v-model="searchText">
    <a @click="setSearchText('')" v-show="searchText">
      <i class="nes-icon close is-small"></i>
    </a>
    <router-link to="/">
      <button
          type="button"
          class="nes-btn is-error logout">
        Log out
      </button>
    </router-link>
    <NewFlagBtn v-if="!error"></NewFlagBtn>
    <div class="checkboxes">
      <label>
        <input type="checkbox" class="nes-checkbox" v-model="showTags">
        <span>Show tags</span>
      </label>
      <label>
        <input type="checkbox" class="nes-checkbox" v-model="editMode">
        <span>Edit mode</span>
      </label>
    </div>
  </div>
</template>

<script>

import NewFlagBtn from '@/components/NewFlagBtn'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Toolbar',
  props: {
    error: Boolean
  },
  components: {
    NewFlagBtn
  },
  methods: {
    ...mapMutations([
      'setSearchText'
    ]),
  },
  computed: {
    searchText: {
      get () {
        return this.$store.state.searchText
      },
      set (newSearchText) {
        this.$store.commit('setSearchText', newSearchText)
      }
    },
    showTags: {
      get() {
        return this.$store.state.showTags
      },
      set (newValue) {
        this.$store.commit('setShowTags', newValue)
      }
    },
    editMode: {
      get() {
        return this.$store.state.editMode
      },
      set (newValue) {
        this.$store.commit('setEditMode', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .toolbar {
    position: relative;

    .nes-input {
      width: calc(100% - 168px);
      margin-right: 20px;

      &:disabled {
        opacity: .2;
      }
    }

    .close {
      position: absolute;
      top: 15px;
      right: 175px;
    }

    .logout {
      font-size: 14px;
      position: relative;
      top: -3px;
      width: 136px;
    }
  }

  .checkboxes label {
    margin-right: 20px;
  }
</style>
