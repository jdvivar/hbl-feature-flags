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

const asyncGApiLoad = async () => {
  if (window.gapi) {
    return new Promise((callback, onerror) => {
      window.gapi.load('client:auth2', { callback, onerror })
    })
  } else {
    return Promise.reject('Google API not available for load')
  }
}

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
      const googleAuth = await window.gapi.auth2.init({
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
      })

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
        this.logIn(googleAuth.currentUser.get())
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
