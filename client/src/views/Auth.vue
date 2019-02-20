<template>
  <div class="Auth">
    <h3>Press button to start</h3>
    <router-link to="home">
      <button type="button" class="nes-btn">
        <i class="nes-icon google"></i>
      </button>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Auth'
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.Auth {
  margin: 80px 0;
  text-align: center;

  @media (min-width: $breakpoint) {
    margin: 240px 0;
  }
}

h3 {
  animation: blink 1s linear infinite;
  margin-bottom: 60px;
}

button {
  padding: 20px;
}

</style>
