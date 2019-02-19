<template>
  <div class="flag-share">
    <a :href="`/home?id=${this.id}`" target="_blank">
      <div class="nes-btn is-primary">
        URL
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: 'FlagShare',
  props: {
    id: {
      type: Number,
      required: true
    }
  }
}
</script>
<style scoped>
  .flag-share {
    position: absolute;
    right: -8px;
    bottom: -8px;
    font-size: 12px;

    .nes-btn {
      padding: 1px;
    }
  }
</style>
