<template>
  <div class="name">
    <span
        v-if="editMode"
        contenteditable
        @keydown.prevent.enter="saveName">
      {{ name }}
    </span>
    <span v-else>{{ name}}</span>
  </div>
</template>

<script>
import FeatureFlagsApi from '@/services/FeatureFlagsApi'
import { mapState, mapMutations } from 'vuex'

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
    saveName: function (e) {
      this.flags[this.flagIndex].name = e.target.innerText
      FeatureFlagsApi.put(this.id, this.flags[this.flagIndex])
        .then(() => {
          this.setFlags(this.flags)
          this.setEditMode(false)
        })
        .catch(error => {
          this.flags[this.flagIndex].name = this.name
          console.log(error)
        })
    },
    ...mapMutations([
      'setFlags',
      'setEditMode'
    ])
  },
  computed: {
    ...mapState([
      'editMode',
      'flags',
      'showTags'
    ]),
    flagIndex: function () {
      return this.flags.findIndex(flag => flag.id === this.id)
    }
  }
}
</script>

<style scoped>
.name {
  background-color: white;
  position: absolute;
  top: -15px;
  padding: 0 10px;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 36px);
}
</style>
