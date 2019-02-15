<template>
  <div>
    <div id="tools">
      <input
          :disabled="error"
          type="text"
          class="nes-input"
          placeholder="Search"
          v-model="search">
      <router-link to="/">
        <button
            type="button"
            class="nes-btn is-error">
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
      <Flag v-for="flag in filteredFlags" :key="flag.id" :flag="flag"></Flag>
      <div v-if="flags && filteredFlags.length === 0" class="error" >
        <div class="message -left">
          <i class="nes-octocat"></i>
          <div class="nes-balloon from-left">
            <p>I couldn't find any flag with "{{ search }}"</p>
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

export default {
  name: 'home',
  data: function () {
    return {
      flags: [],
      error: false,
      search: ''
    }
  },
  computed: {
    filteredFlags: function () {
      return this.flags.filter(flag =>
        flag.title.toLowerCase().includes(this.search.toLowerCase())
        || flag.id.toString().toLowerCase().includes(this.search.toLowerCase())
        || flag.tags.toString().toLowerCase().includes(this.search.toLowerCase())
      )
    }
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
  .nes-input {
    width: calc(100% - 180px);
    margin-right: 32px;

    &:disabled {
      opacity: .2;
    }
  }
}
</style>
