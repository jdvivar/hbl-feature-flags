<template>
  <details class="description" v-if="description">
    <summary class="description-header">Description</summary>
    <div class="nes-balloon">
      {{ description }}
    </div>
  </details>
</template>

<script>
export default {
  name: 'FlagDescription',
  props: {
    description: String
  }
}
</script>

<style lang="scss" scoped>
.description {
  margin: 20px 0;

  .description-header {
    font-weight: 700;
    outline: none;
    margin-bottom: 20px;
  }
}

.nes-balloon {
  margin-bottom: 8px;
}
</style>
