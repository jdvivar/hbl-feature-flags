<template>
  <div class="status">
    <div
        v-if="error"
        class="nes-text is-error">
      {{ error }}
    </div>
    <div class="nes-btn-group">
      <button
          class="nes-btn"
          :class="{ 'is-success': status}"
          :disabled="status"
          @click="setStatusTo(true)">
        ON
      </button>
      <button
          class="nes-btn"
          :class="{ 'is-error': !status}"
          :disabled="!status"
          @click="setStatusTo(false)">
        OFF
      </button>
    </div>
  </div>
</template>

<script>
import FeatureFlagsApi from '@/services/FeatureFlagsApi'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'FlagStatus',
  props: {
    id: {
      type: Number,
      required: true
    },
    status: Boolean
  },
  data: function () {
    return {
      error: ''
    }
  },
  methods: {
    setStatusTo: function (newStatus) {
      this.flags[this.flagIndex].status = newStatus
      FeatureFlagsApi.put(this.id, this.flags[this.flagIndex])
        .then(() => {
          this.setFlags(this.flags)
          this.error = ''
        })
        .catch(error => {
          this.flags[this.flagIndex].status = this.status
          this.error = error
        })
    },
    ...mapMutations([
      'setFlags'
    ])
  },
  computed: {
    ...mapState([
      'flags'
    ]),
    flagIndex: function () {
      return this.flags.findIndex(flag => flag.id === this.id)
    }
  }
}
</script>

<style scoped>
  .nes-btn-group {
    background: white;
    padding: 0 2px 0 10px;
    position: absolute;
    right: 10px;
    top: -20px;
  }
</style>
