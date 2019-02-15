<template>
  <div>
    <div id="tools">
      <input :disabled="error" type="text" id="name_field" class="nes-input" placeholder="Search">
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
      <Flag v-for="flag in flags" :key="flag.id" :flag="flag"></Flag>
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
      flags: {},
      error: false
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
