<template>
  <div v-if="editMode" class="flag-remove-btn">
    <div class="nes-btn is-error" @click="openRemoveFlagModal">
      X Remove this flag
    </div>
    <div v-if="error" class="nes-text is-error">
      Sorry I couldn't remove the flag. Error:<br />
      {{ error }}
    </div>
    <dialog class="nes-dialog is-rounded" ref="RemoveFlagModal">
      <form method="dialog">
        <p class="title">
          You sure, pal?
        </p>
        <menu class="dialog-menu">
          <button
              class="nes-btn is-primary"
              @click="onClickRemoveFlag">
            Yep
          </button>
          <button class="nes-btn">Nope</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

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
      'editMode'
    ])
  },
  methods: {
    openRemoveFlagModal: function () {
      this.$refs.RemoveFlagModal.showModal()
    },
    onClickRemoveFlag: async function () {
      try {
        await this.removeFlag(this.id)
        this.setEditMode(false)
        this.error = ''
      } catch (error) {
        this.error = error
      }
    },
    ...mapMutations([
      'setEditMode'
    ]),
    ...mapActions([
      'removeFlag'
    ])
  }
}
</script>

<style lang="scss" scoped>
.flag-remove-btn {
  position: relative;
}

.nes-octocat {
  position: absolute;
  right: 0;
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
