<template>
  <div class="flag">
    <div class="title">
      {{ flag.title}}
    </div>
    <div>
      id: {{ flag.id }}
    </div>
    <div>
      {{ flag.status }}
    </div>
    <div class="tags">
      <button
          v-for="tag in flag.tags"
          @click="$emit('tagClicked', tag)"
          type="button"
          :key="`${flag.id}-${tag}`"
          class="nes-btn is-primary">
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flag',
  props: {
    flag: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.flag {
  border: 4px solid black;
  padding: 20px;
  margin: 40px 0;
  position: relative;
}

.title {
  position: absolute;
  top: -15px;
  background-color: white;
  padding: 0 10px;
  font-size: 20px;
}

.tags {
  button {
    margin-right: 10px;
  }
}

</style>
