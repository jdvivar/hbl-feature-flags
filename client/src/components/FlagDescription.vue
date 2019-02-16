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
  margin-top: 20px;

  .description-header {
    font-weight: 700;
    outline: none;
  }
}

.nes-balloon {
  margin-top: 20px;
  margin-bottom: 12px;
}
</style>
