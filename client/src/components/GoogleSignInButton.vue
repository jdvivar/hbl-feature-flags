<template>
  <div>
    <button
        type="button"
        class="nes-btn"
        ref="sign-in">
      <i class="nes-icon google"></i>
    </button>
    <div class="nes-text is-error error" v-if="error">
      Sorry I couldn't load the Google API. Error: <br />{{ error }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { asyncGApiLoad, asyncGApiInit } from '@/services/GApi'

export default {
  name: 'GoogleSignInButton',
  data: function () {
    return {
      error: ''
    }
  },
  methods: {
    onClickSignIn () {
      this.$router.push('flags')
    },
    ...mapActions([
      'logIn'
    ])
  },
  mounted: async function () {
    try {
      // Load Google API
      await asyncGApiLoad()

      // Init auth instance
      const googleAuth = await asyncGApiInit()

      // Attach handler to button
      googleAuth.attachClickHandler(this.$refs['sign-in'], {},
        user => {
          this.error = ''
          this.logIn(user)
        },
        error => {
          this.error = error
        }
      )

      // If user is already logged in
      if (googleAuth.isSignedIn.get()) {
        const user = await googleAuth.currentUser.get()
        this.logIn({
          name: user.getBasicProfile().getGivenName(),
          imageUrl: user.getBasicProfile().getImageUrl()
        })
        this.$router.push({ name: 'flags' })
      }
    } catch (error) {
      this.error = error
    }
  }
}
</script>

<style scoped>

button {
  padding: 20px;
}

.error {
  margin-top: 20px;
}

</style>
