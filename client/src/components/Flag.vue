<template>
  <div class="flag nes-container is-rounded">
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
    <FlagTags :tags="flag.tags"></FlagTags>
  </div>
</template>

<script>
import FlagDescription from '@/components/FlagDescription'
import FlagTags from '@/components/FlagTags'

export default {
  name: 'Flag',
  props: {
    flag: {
      type: Object,
      required: true
    }
  },
  components: {
    FlagDescription,
    FlagTags,
  }
}
</script>

<style lang="scss" scoped>

.flag {
  // border: 4px solid black;
  padding: 20px 20px 15px;
  margin: 40px 0;
  position: relative;
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

</style>
