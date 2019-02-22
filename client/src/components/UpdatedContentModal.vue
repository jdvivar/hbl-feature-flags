<template>
  <dialog class="nes-dialog is-rounded" ref="UpdatedContentModal">
    <form method="dialog">
      <p>
        New content available!
      </p>
      <button class="nes-btn" @click="onClickRefresh">Refresh</button>
    </form>
  </dialog>
</template>

<script>
export default {
  name: 'UpdatedContentModal',
  methods: {
    onClickRefresh: function () {
      window.location.reload()
    }
  },
  mounted: function () {
    window.addEventListener('sw-updated', () => {
      this.$refs.UpdatedContentModal.showModal()
    })
  }
}
</script>

<style>
</style>
