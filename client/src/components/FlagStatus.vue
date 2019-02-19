<template>
  <div class="status">
    <div
        v-if="error"
        class="nes-text is-error">
      {{ error }}
    </div>
    <span class="literal">
      {{ status ? `ON` : `OFF` }}
    </span>
    <button
        v-if="status"
        class="nes-btn is-success"
        @click="setStatusTo(false)">
    </button>
    <button
        v-else
        class="nes-btn is-error"
        @click="setStatusTo(true)">
    </button>
  </div>
</template>

<script>
import FeatureFlagsApi from '@/services/FeatureFlagsApi'
import { mapState, mapMutations } from 'vuex'

export default {
  name: "FlagStatus",
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
      'flags',
    ]),
    flagIndex: function () {
      return this.flags.findIndex(flag => flag.id === this.id)
    }
  }
}
</script>

<style scoped>
  .literal {
    font-size: 9px;
    position: absolute;
    right: -18px;
    text-align: center;
    top: -30px;
    width: 30px;
  }

  .nes-btn {
    padding: 4px;
    position: absolute;
    right: -15px;
    top: -15px;
  }
</style>
