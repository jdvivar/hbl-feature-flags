<template>
  <div class="page-not-found">
    <i class="nes-icon like"></i>
    <h1 class="nes-text is-primary">Really? <br />{{ really }}???</h1>
    <h3 class="nes-text is-primary">What were you thinking?</h3>
    <router-link :to="{ name: 'auth' }">
      <button class="nes-btn">Go back where you belong</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  computed: {
    really: function () {
      return this.$route.params.pathMatch.substring(1)
    }
  }
}
</script>

<style scoped>
  .page-not-found {
    text-align: center;
    margin: 100px 0;
  }

  button {
    margin-top: 40px;
  }

  .like {
    transform: rotate(180deg) scale(4);
    margin: 100px 100px 0 170px;
  }
</style>
