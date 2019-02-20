<template>
  <div class="name">
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
  methods: {
    saveName: async function ({ target: { innerText: name }}) {
      try {
        await this.setName({ id: this.id, name })
        this.setEditMode(false)
      } catch (error) {
        console.log(error)
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

<style scoped>
  .name {
    background-color: white;
    font-size: 20px;
    font-weight: 700;
    left: 12px;
    max-width: calc(100% - 200px);
    overflow: hidden;
    padding: 0 10px;
    position: absolute;
    text-overflow: ellipsis;
    top: -15px;
    white-space: nowrap;
  }
</style>
