<template>
  <div class="name">
    <div class="name-wrapper">
      <span
        v-if="editMode"
        contenteditable
        @keydown.prevent.enter="saveName">
        {{ name }}
      </span>
      <span v-else>
        {{ name }}
      </span>
    </div>
    <div v-if="error" class="error nes-text is-error">
      Sorry, I couldn't update the name. Error:<br />{{ error }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'FlagName',
  props: {
    id: {
      type: Number,
      required: true
    },
    name: String
  },
  data: function () {
    return {
      error: ''
    }
  },
  methods: {
    saveName: async function ({ target: { innerText: name } }) {
      try {
        await this.setName({ id: this.id, name })
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
      'setName'
    ])
  },
  computed: {
    ...mapState([
      'editMode'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .name-wrapper {
    background-color: white;
    left: 12px;
    max-width: calc(100% - 180px);
    overflow: hidden;
    padding: 0 10px;
    position: absolute;
    text-overflow: ellipsis;
    top: -15px;
    white-space: nowrap;
    font-size: 20px;
    font-weight: 700;
  }

  .error {
    margin-top: 20px;
  }
</style>
