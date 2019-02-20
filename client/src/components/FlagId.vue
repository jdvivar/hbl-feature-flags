<template>
  <div class="flag-id">
    <a :href="`/flags?id=${this.id}`" target="_blank">
      <div class="nes-btn is-primary">
        URL
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: 'FlagId',
  props: {
    id: {
      type: Number,
      required: true
    }
  }
}
</script>
<style scoped>
  .flag-id {
    position: absolute;
    right: -8px;
    bottom: -8px;
    font-size: 12px;

    .nes-btn {
      padding: 1px;
    }
  }
</style>
