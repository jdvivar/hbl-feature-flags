<template>
  <div>
    <button
        type="button"
        class="nes-btn"
        @click="onClickSignIn"
        ref="sign-in">
      <i class="nes-icon google"></i>
    </button>
  </div>
</template>

<script>
const asyncGApiLoad = async () => {
  if (window.gapi) {
    return new Promise((callback, onerror) => {
      window.gapi.load('client:auth2', { callback, onerror })
    })
  } else {
    return Promise.reject('Google API not available')
  }
}

export default {
  name: 'GoogleSignInButton',
  methods: {
    onClickSignIn () {
      this.$router.push('flags')
    }
  },
  mounted: async function () {
    try {
      let authSingleton
      await asyncGApiLoad()
      authSingleton = await window.gapi.auth2.init({
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin'
      })

      authSingleton.attachClickHandler(this.$refs['sign-in'], {},
        googleUser => {
          console.log('signed in!')
          console.log(googleUser)
          console.log(googleUser.getBasicProfile().getName())
        },
        error => { alert(JSON.stringify(error, undefined, 2)) }
      )

    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>

button {
  padding: 20px;
}

</style>
