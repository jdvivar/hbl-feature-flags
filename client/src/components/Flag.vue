<template>
  <div class="flag">
    <div class="name">
      {{ flag.name}}
    </div>
    <div class="id">
      id{{ flag.id }}
    </div>
    <div>
      {{ flag.status }}
    </div>
    <FlagDescription :description="flag.description"></FlagDescription>
    <div class="tags">
      <button
          v-for="tag in flag.tags"
          @click="$emit('tagClicked', tag)"
          type="button"
          :key="`${flag.id}-${tag}`"
          class="nes-btn is-primary">
        {{ tag }}
      </button>
      <button
          :class="{ hide: flag.tags.length }"
          class="nes-btn is-success add-tag">
        + tag me
      </button>
    </div>
  </div>
</template>

<script>
import FlagDescription from '@/components/FlagDescription'

export default {
  name: 'Flag',
  props: {
    flag: {
      type: Object,
      required: true
    }
  },
  components: {
    FlagDescription
  }
}
</script>

<style lang="scss" scoped>

.flag {
  border: 4px solid black;
  padding: 20px 20px 15px;
  margin: 40px 0;
  position: relative;

  &:hover .add-tag.hide {
    display: inline-block;
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
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: lightgray;
  font-size: 10px;
  padding: 2px;
}

.tags {
  // border-top-style: solid;
  margin-top: 20px;

  button {
    margin-bottom: 10px;
    margin-right: 10px;
    font-size: 12px;
  }

  .add-tag.hide {
    display: none;
  }
}

</style>
