<template>
  <div class="flag nes-container is-rounded">
    <div class="name">
      <span
          v-if="editMode"
          contenteditable
          @keydown.prevent.enter="saveName">
        {{ flag.name }}
      </span>
      <span v-else>{{ flag.name}}</span>
    </div>
    <div class="id">
      id:{{ flag.id }}
    </div>
    <div>
      {{ flag.status }}
    </div>
    <FlagDescription :description="flag.description"></FlagDescription>
    <FlagTags :id="flag.id" :tags="flag.tags"></FlagTags>
  </div>
</template>

<script>
import FeatureFlagsApi from '@/services/FeatureFlagsApi'
import FlagDescription from '@/components/FlagDescription'
import FlagTags from '@/components/FlagTags'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Flag',
  props: {
    flag: {
      type: Object,
      required: true
    }
  },
  methods: {
    saveName: function (e) {
      this.flags[this.flagIndex].name = e.target.innerText
      FeatureFlagsApi.put(this.flag.id, this.flags[this.flagIndex])
        .then(() => {
          this.setFlags(this.flags)
          this.setEditMode(false)
        })
        .catch(error => {
          this.flags[this.flagIndex].name = this.flag.name
          console.log(error)
        })
    },
    ...mapMutations([
      'setFlags',
      'setEditMode'
    ])
  },
  components: {
    FlagDescription,
    FlagTags
  },
  computed: {
    ...mapState([
      'editMode',
      'flags'
    ]),
    flagIndex: function () {
      return this.flags.findIndex(flag => flag.id === this.flag.id)
    }
  }
}
</script>

<style lang="scss" scoped>

.flag {
  // border: 4px solid black;
  padding: 20px 20px 15px;
  margin: 40px 0;
  position: relative;
  width: calc(100% - 12px);
  left: 6px;

  &:hover .id {
    display: block;
  }
}

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

.id {
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 10px;
}

</style>
