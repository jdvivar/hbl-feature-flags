<template>
  <div>
    <h1>home view</h1>
    <HelloWorld></HelloWorld>

    <div class="ff-list" v-for="flag in flags" :key="flag.id">
      <div class="ff-item">
        {{ flag }}
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import FeatureFlagsApi from '@/services/FeatureFlagsApi'

export default {
  name: 'home',
  data: function() {
    return {
      flags: {}
    }
  },
  components: {
    HelloWorld
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      FeatureFlagsApi.get().then(answer => {
        vm.flags = answer
      })
    })
  }
}
</script>
