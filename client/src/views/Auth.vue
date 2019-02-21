<template>
<div class="Auth">
  <h3>Press button to start</h3>
  <GoogleSignInButton></GoogleSignInButton>
</div>
</template>

<script>
import GoogleSignInButton from '@/components/GoogleSignInButton'

export default {
  name: 'Auth',
  components: {
    GoogleSignInButton
  }
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
</style>
