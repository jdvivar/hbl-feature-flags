<template>
  <div>
    <Toolbar :error="error"></Toolbar>
    <div v-if="error" class="error">
      <div class="message -left">
        <i class="nes-octocat bounce"></i>
        <div class="nes-balloon from-left">
          <p>Uh oh! API no good... :(</p>
        </div>
      </div>
      <button
          type="button"
          id="reload"
          class="nes-btn is-warning"
          onClick="window.location.reload()">
        Click to try again
      </button>
      <div class="nes-container is-rounded error-text">{{ errorText }}</div>
    </div>
    <div class="flags">
      <Flag
          v-for="flag in filteredFlags"
          :key="flag.id"
          :flag="flag">
      </Flag>
      <div v-if="flags.length === 0 && !error" >
        <div class="message -right zero-flags">
          <div class="nes-balloon from-right">
            <p>ZERO flags, mi dispiace questa API signore!</p>
          </div>
          <i class="nes-mario"></i>
        </div>
      </div>
      <div v-if="flags.length && filteredFlags.length === 0" class="error" >
        <div class="message -left">
          <i class="nes-octocat animate"></i>
          <div class="nes-balloon from-left">
            <p>I couldn't find any flag with "{{ searchText }}"</p>
          </div>
        </div>
        <div class="message -right">
          <div class="nes-balloon from-right">
            <p>Mamma mia, type something different!</p>
          </div>
          <i class="nes-mario bounce"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flag from '@/components/Flag'
import Toolbar from '@/components/Toolbar'
import { difference as _difference } from 'lodash'
import { mapState, mapActions } from 'vuex'
import { ID_START, TAGS_START } from '@/services/Constants'

export default {
  name: 'Flags',
  data: function () {
    return {
      error: false,
      errorText: ''
    }
  },
  computed: {
    filteredFlags: function () {
      if (this.searchText.startsWith(ID_START)) {
        const id = this.searchText.substring(ID_START.length)
        return this.flags.filter(flag => flag.id === Number.parseInt(id))
      } else if (this.searchText.startsWith(TAGS_START)) {
        const tags = this.searchText.substring(TAGS_START.length).split(',')
        return this.flags.filter(flag => _difference(tags, flag.tags).length === 0)
      } else {
        return this.flags.filter(flag =>
          flag.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          flag.id.toString().toLowerCase().includes(this.searchText.toLowerCase()) ||
          flag.tags.toString().toLowerCase().includes(this.searchText.toLowerCase())
        )
      }
    },
    ...mapState([
      'searchText',
      'flags'
    ])
  },
  components: {
    Flag,
    Toolbar
  },
  methods: {
    ...mapActions([
      'getFlags'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        await vm.getFlags()
        vm.error = false
        vm.errorText = ''
      } catch (error) {
        vm.error = true
        vm.errorText = error
      }
    })
  }
}
</script>

<style lang="scss" scoped>

.error {
  margin: 80px 0;
  text-align: center;

  .message {
    margin-bottom: 40px;
  }
}

.nes-balloon {
  margin-left: 40px;
}

.error-text {
  background-color: #e76e55;
  margin-top: 40px;
}

.zero-flags {
  margin-top: 80px;
}

#reload {
  margin-top: 80px;
}

</style>
