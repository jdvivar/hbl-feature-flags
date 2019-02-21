<template>
  <div>
    <button type="button" class="nes-btn" @click="onClickSignIn">
      <i class="nes-icon google"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GoogleSignInButton',
  methods: {
    onClickSignIn() {
      this.$router.push('flags')
    }
  }
}
</script>

<style scoped>

button {
  padding: 20px;
}

</style>
