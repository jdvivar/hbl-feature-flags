<template>
  <div>
    <div class="nes-field">
      <input type="text" id="name_field" class="nes-input" placeholder="Search">
    </div>
    <div class="flags">
      <Flag v-for="flag in flags" :key="flag.id" :flag="flag"></Flag>
    </div>
  </div>
</template>

<script>
import Flag from '@/components/Flag'
import FeatureFlagsApi from '@/services/FeatureFlagsApi'

export default {
  name: 'home',
  data: function () {
    return {
      flags: {}
    }
  },
  components: {
    Flag
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      FeatureFlagsApi.get().then(answer => {
        vm.flags = answer
      })
    })
  }
}
</script>

<style lang="scss">

</style>
