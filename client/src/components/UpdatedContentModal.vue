<template>
  <dialog class="nes-dialog is-rounded" ref="UpdatedContentModal">
    <form method="dialog">
      <p>
        New content available!
      </p>
      <menu>
        <button class="nes-btn" @click="onClickRefresh">Refresh</button>
      </menu>
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

<style scoped>
  menu {
    margin: 40px 0 0;
    padding: 0;
    text-align: center;
  }
</style>
