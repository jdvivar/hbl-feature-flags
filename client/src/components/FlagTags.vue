<template>
  <div class="tags">
    <button
        v-for="tag in tags"
        @click="setSearchText(tag)"
        type="button"
        class="nes-btn is-primary">
      {{ tag }}
    </button>
    <button
        :class="{ hide: tags.length }"
        class="nes-btn add-tag">
      + tag me
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'FlagTags',
  props: {
    tags: Array
  },
  methods: {
    ...mapMutations([
      'setSearchText'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.tags {
  margin-top: 20px;

  button {
    margin-bottom: 10px;
    margin-right: 10px;
    font-size: 12px;
  }

  &:hover .add-tag.hide {
    display: inline-block;
  }

  .add-tag.hide {
    display: none;
  }
}
</style>
