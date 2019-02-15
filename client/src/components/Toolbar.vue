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
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Toolbar',
  props: {
    error: Boolean
  },
  methods: {
    ...mapMutations([
      'setSearchText'
    ]),
  },
  computed: {
    ...mapState([
      'searchText'
    ])
  },
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
      right: 190px;
    }

    .logout {
      font-size: 14px;
      position: relative;
      top: -3px;
      width: 136px;
    }
  }
</style>
