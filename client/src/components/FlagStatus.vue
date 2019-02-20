<template>
  <div class="status">
    <div
        v-if="error"
        class="nes-text is-error">
      Sorry I couldn't change the status of this flag. Error: <br />
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
import { mapActions } from 'vuex'

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
    setStatusTo: async function (status) {
      try {
        await this.setStatus({ id: this.id, status })
        this.error = ''
      } catch (error) {
        this.error = error
      }
    },
    ...mapActions([
      'setStatus'
    ])
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
