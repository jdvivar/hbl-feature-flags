<template>
  <div class="flag nes-container is-rounded">
    <FlagName :id="flag.id" :name="flag.name"></FlagName>
    <div class="id">
      id:{{ flag.id }}
    </div>
    <div>
      {{ flag.status }}
    </div>
    <FlagDescription :id="flag.id" :description="flag.description"></FlagDescription>
    <hr v-if="showTags"/>
    <FlagTags :id="flag.id" :tags="flag.tags"></FlagTags>
  </div>
</template>

<script>
import FlagDescription from '@/components/FlagDescription'
import FlagTags from '@/components/FlagTags'
import FlagName from '@/components/FlagName'
import { mapState } from 'vuex'

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
    FlagName
  },
  computed: {
    ...mapState([
      'showTags'
    ])
  }
}
</script>

<style lang="scss" scoped>

.flag {
  padding: 20px 20px 15px;
  margin: 40px 0;
  position: relative;
  width: calc(100% - 12px);
  left: 6px;

  &:hover .id {
    display: block;
  }
}

.id {
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 10px;
}

hr {
  margin: 20px -25px;
  border-color: black;
  border-width: 1px;
}
</style>
