<template>
  <div class="tags" v-show="showTags">
    <span v-for="tag in tags" :key="`${id}${tag}`">
      <button
          type="button"
          @click="setSearchText(`${TAGS_START}${tag}`)"
          class="nes-btn">
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
        class="nes-btn add-tag is-primary"
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
import { mapMutations, mapState, mapActions } from 'vuex'
import { TAGS_START } from '@/services/Constants'

export default {
  name: 'FlagTags',
  props: {
    id: {
      type: Number,
      required: true
    },
    tags: Array
  },
  data: function () {
    return {
      newTag: false,
      TAGS_START
    }
  },
  methods: {
    saveNewTag: async function ({ target: { value: newTag } }) {
      if (this.tags.includes(newTag)) {
        return false
      }
      try {
        this.tags.push(newTag)
        await this.setTags({ id: this.id, tags: this.tags })
        this.newTag = false
      } catch (error) {
        this.tags.pop()
        console.log(error)
      }
    },
    removeTag: async function (tagToRemove) {
      try {
        await this.setTags({
          id: this.id,
          tags: this.tags.filter(tag => tag !== tagToRemove)
        })
      } catch (error) {
        console.log(error)
      }
    },
    ...mapMutations([
      'setSearchText'
    ]),
    ...mapActions([
      'setTags'
    ])
  },
  computed: {
    ...mapState([
      'showTags',
      'editMode'
    ])
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
    opacity: 1
  }

  .add-tag.hide {
    transition: opacity .3s;
    opacity: 0;
  }
}

.nes-field {
  margin-right: 80px;
}

.close {
  margin-right: 15px;
}

</style>
