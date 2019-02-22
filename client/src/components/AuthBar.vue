<template>
  <div>
    <div class="nes-text salutation">
      Hola {{ userName }}
    </div>
    <button
        type="button"
        class="nes-btn is-warning logout"
        @click="onClickLogOut">
      Bye bye
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AuthBar',
  computed: {
    ...mapState([
      'userName'
    ])
  },
  methods: {
    onClickLogOut: async function () {
      try {
        await this.logOut()
      } catch (error) {
        alert(`I can't log you out 😱`)
      }
    },
    ...mapActions([
      'logOut'
    ])
  },
}
</script>

<style>

</style>
