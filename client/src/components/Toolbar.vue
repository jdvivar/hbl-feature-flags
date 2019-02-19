<template>
  <div class="toolbar">
    <input
        :disabled="error"
        type="text"
        class="nes-input search-input"
        placeholder="Filterr my frriend..."
        @focus="showSearchHelp = true"
        @blur="showSearchHelp = false"
        v-model="searchText">
    <a @click="setSearchText('')" v-show="searchText">
      <i class="nes-icon close is-small"></i>
    </a>
    <router-link to="/">
      <button
          type="button"
          class="nes-btn is-warning logout">
        Bye bye
      </button>
    </router-link>
    <div v-if="showSearchHelp" class="search-help">
      <span
          v-if="this.searchText.startsWith(TAGS_START)"
          class="nes-text is-disabled">
        FORMAT tags:tag1,tag2
      </span>
      <span v-else>
        <span
            v-if="this.searchText.startsWith(ID_START)"
            class="nes-text is-disabled">
          FORMAT id:tag1,tag2
        </span>
        <span
            v-else
            class="nes-text is-disabled">
          Try with id: or tags:
        </span>
      </span>
    </div>
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
import { mapMutations } from 'vuex'
import { ID_START, TAGS_START } from '@/services/Constants'

export default {
  name: 'Toolbar',
  props: {
    error: Boolean
  },
  data: function () {
    return {
      ID_START,
      TAGS_START,
      showSearchHelp: false
    }
  },
  components: {
    NewFlagBtn
  },
  mounted: function () {
    if (this.$route.query.id) {
      this.setSearchText(`${ID_START}${this.$route.query.id}`)
    } else if (this.$route.query.tags) {
      this.setSearchText(`${TAGS_START}${this.$route.query.tags}`)
    }
  },
  methods: {
    ...mapMutations([
      'setSearchText'
    ])
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
      get () {
        return this.$store.state.showTags
      },
      set (newValue) {
        this.$store.commit('setShowTags', newValue)
      }
    },
    editMode: {
      get () {
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
      margin-right: 20px;
      width: calc(100% - 168px);

      &:disabled {
        opacity: .2;
      }
    }

    .close {
      position: absolute;
      right: 178px;
      top: 19px;
    }

    .logout {
      font-size: 14px;
      padding: 10px;
      position: relative;
      top: -3px;
      width: 136px;
    }
  }

  .search-help {
    font-size: 12px;
  }

  .checkboxes label {
    margin-right: 20px;
  }
</style>
