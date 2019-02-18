<template>
  <div class="flag-remove-btn" v-if="editMode">
    <div class="nes-btn is-error" @click="openRemoveFlagModal">
      X Remove this flag
    </div>
    <div>
    <div class="nes-text is-error" v-if="error">{{ error }}</div>
    </div>
    <dialog class="nes-dialog is-rounded" ref="RemoveFlagModal">
      <form method="dialog">
        <p class="title">You sure, pal?</p>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary" @click="onClickRemoveFlag">Yep</button>
          <button class="nes-btn">Nope</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<script>
import FeatureFlagsApi from '@/services/FeatureFlagsApi'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'FlagRemoveBtn',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      showRemoveFlagModal: false,
      error: ''
    }
  },
  computed: {
    ...mapState([
      'editMode',
      'flags'
    ])
  },
  methods: {
    openRemoveFlagModal: function () {
      this.$refs.RemoveFlagModal.showModal()
    },
    onClickRemoveFlag: function () {
      FeatureFlagsApi.delete(this.id)
        .then(() => {
          this.setFlags(this.flags.filter(flag => flag.id !== this.id))
          this.setEditMode(false)
          this.error = ''
        })
        .catch(error => {
          this.error = error
        })
    },
    ...mapMutations([
      'setFlags',
      'setEditMode'
    ])
  }
}
</script>

<style lang="scss" scoped>
.flag-remove-btn {
  position: relative;
}

.nes-octocat {
  right: 0;
  position: absolute;
}

menu {
  margin-bottom: 0;
  padding-left: 0;

  button {
    margin-right: 20px;
  }
}

.nes-text.is-error {
  margin-top: 10px;
}
</style>
