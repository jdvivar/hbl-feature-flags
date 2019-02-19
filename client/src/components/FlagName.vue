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
