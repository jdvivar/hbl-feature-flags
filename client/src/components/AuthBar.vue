<template>
  <div class="auth-bar">
    <div class="flex-bar">
      <img :src="processedImageUrl" />
      <div class="nes-text salutation">
        Hola {{ userName }}! {{ pata }}
      </div>
      <button
          type="button"
          class="nes-btn is-warning log-out"
          @click="onClickLogOut">
        BYE BYE
      </button>
    </div>
    <div v-if="error" class="nes-text is-error error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cloudinaryCore from 'cloudinary-core'

const cloudinary = new cloudinaryCore.Cloudinary({
  cloud_name: process.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
  secure: true
})

export default {
  name: 'AuthBar',
  data: function () {
    return {
      error: ''
    }
  },
  computed: {
    ...mapState([
      'userName',
      'imageUrl'
    ]),
    processedImageUrl: function () {
      return cloudinary.url(this.imageUrl, {
        type: 'fetch',
        transformation: [
          { height: '60', radius: 'max', crop: 'scale' },
          { effect: 'pixelate:4' }
        ]
      })
    },
    pata: function () {
      if (!this.userName.localeCompare('ramon', {}, { sensitivity: 'base' })) {
        return '¿cómo va la pata?'
      }
    }
  },
  methods: {
    onClickLogOut: async function () {
      try {
        await this.logOut()
      } catch (error) {
        this.error = error
      }
    },
    ...mapActions([
      'logOut'
    ])
  },
}
</script>

<style scoped>
.flex-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
  align-items: center;
}
.salutation {
  flex-grow: 1;
}
.error {
  text-align: right;
  margin: 20px 0;
}
.log-out {
  font-size: 12px;
  width: 136px;
}
img {
  margin-right: 20px;
}
</style>
