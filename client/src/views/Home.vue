<template>
  <div>
    <div id="tools">
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
    <div v-if="error" class="error">
      <div class="message -left">
        <i class="nes-octocat bounce"></i>
        <div class="nes-balloon from-left">
          <p>Uh oh! No flags... :(</p>
        </div>
      </div>
      <button
          type="button"
          id="reload"
          class="nes-btn is-warning"
          onClick="window.location.reload()">
        Reload
      </button>
    </div>
    <div class="flags">
      <Flag
          v-for="flag in filteredFlags"
          :key="flag.id"
          :flag="flag">
        </Flag>
      <div v-if="flags && filteredFlags.length === 0" class="error" >
        <div class="message -left">
          <i class="nes-octocat"></i>
          <div class="nes-balloon from-left">
            <p>I couldn't find any flag with "{{ searchText }}"</p>
          </div>
        </div>
        <div class="message -right">
          <div class="nes-balloon from-right">
            <p>Mamma mia, type something different!</p>
          </div>
          <i class="nes-mario bounce"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flag from '@/components/Flag'
import FeatureFlagsApi from '@/services/FeatureFlagsApi'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'home',
  data: function () {
    return {
      flags: [],
      error: false
    }
  },
  methods: {
    ...mapMutations([
      'setSearchText'
    ]),
  },
  computed: {
    filteredFlags: function () {
      return this.flags.filter(flag =>
        flag.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        flag.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
        flag.tags.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    },
    ...mapState([
      'searchText'
    ])
  },
  components: {
    Flag
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      FeatureFlagsApi.get()
        .then(answer => {
          vm.error = false
          vm.flags = answer
        })
        .catch(() => {
          vm.error = true
        })
    })
  }
}
</script>

<style lang="scss" scoped>

.error {
  text-align: center;
  margin: 200px 0;

  .message {
    margin-bottom: 50px;
  }
}

.nes-balloon {
  margin-left: 40px;
}

#reload {
  margin-top: 100px;
}

#tools {
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
