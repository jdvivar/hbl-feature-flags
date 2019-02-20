<template>
  <div>
    <button
        class="nes-btn is-primary add-flag"
        @click="onClickNewFlag">
      + Add a flag!
    </button>
    <div v-if="error" class="nes-text is-error error">
      Sorry I couldn't add that flag. Error: <br />{{ error }}
    </div>
    <dialog class="nes-dialog is-rounded" ref="newFlagModal">
      <form method="dialog">
        <h2 class="nes-dialog-header">New feature flag</h2>
        <div class="nes-field">
          <label for="flag-name">What cute name have you thougt for your new flag?</label>
          <div class="nes-input-group">
            <input
                type="text"
                id="flag-name"
                class="nes-input"
                v-model="name"
                required
                :maxlength="max">
            <div
                class="nes-text nes-input-right is-success"
                :class="{ 'is-warning': remainder < 10, 'is-error': !remainder}">
              {{ remainder }}
            </div>
          </div>
          <div class="sanitised-name">
            {{ sanitisedName }}
            <div class="inspiration">
              <a
                  v-if="!sanitisedName"
                  href="https://www.whiskas.ca/en/kittennamer"
                  target="_blank">
                Looking for inspiration?
              </a>
            </div>
          </div>
        </div>
        <div class="nes-field">
          <label for="type-select">What kind of flag is that?</label>
          <div class="nes-select">
            <select v-model="typeSelected" id="type-select">
              <option v-for="type in FLAG_TYPES" :value="type">{{ type }}</option>
            </select>
          </div>
        </div>
        <menu class="dialog-menu">
          <button
              class="nes-btn is-success"
              @click="onClickConfirmAddFlag">
            Add flag
          </button>
          <button class="nes-btn">Cancel</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<script>
import { FLAG_TYPES, NEW_FLAG_BODY } from '@/services/Constants'
import { mapActions } from 'vuex'

const sanitise = string =>
  string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s/g, '-')

export default {
  name: 'NewFlagButton',
  data: function () {
    return {
      name: '',
      max: 24,
      FLAG_TYPES,
      typeSelected: FLAG_TYPES[0],
      error: ''
    }
  },
  computed: {
    sanitisedName: function () {
      return sanitise(this.name)
    },
    remainder: function () {
      return this.max - this.name.length
    }
  },
  methods: {
    onClickNewFlag: function () {
      this.$refs.newFlagModal.showModal()
    },
    onClickConfirmAddFlag: async function () {
      const name = this.sanitisedName
      try {
        this.error = ''
        await this.addFlag({ ...NEW_FLAG_BODY, name })
      } catch (error) {
        this.error = error
      }
    },
    ...mapActions([
      'addFlag'
    ])
  }
}
</script>

<style lang="scss" scoped>

  .add-flag {
    margin: 20px 0;
    width: calc(100% - 8px);
    left: 4px;
  }

  .nes-dialog-header {
    border-bottom-style: dotted;
    padding-bottom: 20px;
    margin-bottom: 40px;
  }

  menu {
    padding: 0;
    margin: 40px 0 0;

    button {
      margin-right: 20px;
    }
  }

  .nes-field {
    margin-top: 40px;
  }

  .nes-input-group {
    position: relative;
    padding-right: 8px;

    .nes-input-right {
      top: 12px;
      position: absolute;
      right: 16px;
    }

    .nes-input {
      padding-right: 48px;
    }
  }

  .nes-select {
    position: relative;

    &::after {
      right: 42px;
    }
    option {
      text-transform: capitalize;
    }
  }

  .sanitised-name {
    color: grey;
    height: 18px;
    font-size: 18px;
    margin: 20px 0;

    .inspiration {
      text-align: right;
    }

    a {
      font-size: 12px;
    }
  }

  .error {
    margin: 0 0 20px;
  }
</style>
