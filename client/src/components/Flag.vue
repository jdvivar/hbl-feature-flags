<template>
  <div class="flag nes-container is-rounded">
    <FlagName
        :id="flag.id"
        :name="flag.name">
    </FlagName>
    <FlagShare
        class="flag-share"
        :id="flag.id">
    </FlagShare>
    <FlagStatus
        :id="flag.id"
        :status="flag.status">
    </FlagStatus>
    <FlagDescription
        :id="flag.id"
        :description="flag.description">
    </FlagDescription>
    <hr v-if="showTags"/>
    <FlagTags
        :id="flag.id"
        :tags="flag.tags">
    </FlagTags>
    <hr v-if="editMode"/>
    <FlagRemoveBtn
        :id="flag.id">
    </FlagRemoveBtn>
  </div>
</template>

<script>
import FlagDescription from '@/components/FlagDescription'
import FlagTags from '@/components/FlagTags'
import FlagName from '@/components/FlagName'
import FlagStatus from '@/components/FlagStatus'
import FlagRemoveBtn from '@/components/FlagRemoveBtn'
import FlagShare from '@/components/FlagShare'
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
    FlagName,
    FlagStatus,
    FlagRemoveBtn,
    FlagShare
  },
  computed: {
    ...mapState([
      'showTags',
      'editMode'
    ])
  }
}
</script>

<style lang="scss" scoped>

.flag {
  margin: 40px 0;
  left: 6px;
  padding: 20px 20px 15px;
  position: relative;
  width: calc(100% - 12px);

  &:hover .flag-share {
    display: block;
  }
}

.flag-share {
  display: none;
}

hr {
  border-color: black;
  border-width: 1px;
  margin: 20px -25px;
}
</style>
