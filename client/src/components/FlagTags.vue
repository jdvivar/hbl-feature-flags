<template>
  <div class="tags" v-show="showTags">
    <span v-for="tag in tags" :key="`${id}${tag}`">
      <button
          type="button"
          @click="setSearchText(tag)"
          class="nes-btn is-primary">
        {{ tag }}
      </button>
      <a
          v-if="editMode"
          class="editable"
          @click="removeTag(tag)">
        <i class="nes-icon close is-small"></i>
      </a>
    </span>
    <button
        :class="{ hide: tags.length }"
        class="nes-btn add-tag"
        @click="newTag = true">
      + tag me
    </button>
    <div
        v-if="newTag"
        class="nes-field"
        @keyup.enter="saveNewTag">
      <label>New tag</label>
      <input type="text" class="nes-input" @keyup.esc="newTag = false">
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import FeatureFlagsApi from '@/services/FeatureFlagsApi'

export default {
  name: 'FlagTags',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      newTag: false
    }
  },
  methods: {
    saveNewTag: function ({ target: { value: newTag } }) {
      this.flags[this.flagIndex].tags.push(newTag)
      FeatureFlagsApi.put(this.id, this.flags[this.flagIndex])
        .then(() => {
          this.setFlags(this.flags)
          this.newTag = false
        })
        .catch(error => {
          this.flags[this.flagIndex].tags.pop()
          console.log(error)
        })
    },
    removeTag: function (tagToRemove) {
      this.flags[this.flagIndex].tags = this.tags.filter(tag => tag !== tagToRemove)
      FeatureFlagsApi.put(this.id, this.flags[this.flagIndex])
        .then(() => {
          this.setFlags(this.flags)
        })
        .catch(error => {
          this.flags[this.flagIndex].tags.push(tagToRemove)
          console.log(error)
        })
    },
    ...mapMutations([
      'setSearchText',
      'setFlags'
    ])
  },
  computed: {
    ...mapState([
      'flags',
      'showTags',
      'editMode'
    ]),
    tags: function () {
      return this.flags[this.flagIndex].tags
    },
    flagIndex: function () {
      return this.flags.findIndex(flag => flag.id === this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  margin-top: 20px;

  button {
    font-size: 12px;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  &:hover .add-tag.hide {
    display: inline-block;
  }

  .add-tag.hide {
    display: none;
  }
}

.close {
  margin-right: 15px;
}

</style>
