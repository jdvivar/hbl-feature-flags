<template>
  <div>
    <button
      v-if="!description && !editMode"
      class="nes-btn"
      @click="onClickAddDescription">
      + Add a description
    </button>
    <details class="description" v-if="description || editMode" :open="showDescription">
      <summary class="description-header">Description</summary>
      <textarea
          v-if="editMode"
          class="nes-textarea"
          v-model="descriptionText"
          rows="5"
          placeholder="Describe me please!"></textarea>
      <div v-if="editMode">
        <button
            type="button"
            class="nes-btn is-success"
            @click="saveDescription">
            Save
        </button>
        <button
            type="button"
            class="nes-btn is-error"
            @click="setEditMode(false)">
          Cancel
        </button>
        <div class="nes-text is-error" v-if="error">{{ error }}</div>
        <hr />
      </div>
      <div v-else class="nes-balloon">
        {{ description }}
      </div>
    </details>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FeatureFlagsApi from '@/services/FeatureFlagsApi'

export default {
  name: 'FlagDescription',
  props: {
    description: String,
    id: {
      type: Number,
      required: true,
    }
  },
  data: function () {
    return {
      showDescription: false,
      descriptionText: this.description,
      error: ''
    }
  },
  computed: {
    flagIndex: function () {
      return this.flags.findIndex(flag => flag.id === this.id)
    },
    ...mapState([
      'editMode',
      'flags'
    ]),
  },
  methods: {
    saveDescription: function () {
      this.flags[this.flagIndex].description = this.descriptionText
      FeatureFlagsApi.put(this.id, this.flags[this.flagIndex])
        .then(() => {
          this.setFlags(this.flags)
          this.setEditMode(false)
          this.error = ''
        })
        .catch(error => {
          this.flags[this.flagIndex].description = this.description
          this.error = error
        })
    },
    onClickAddDescription: function () {
      this.setEditMode(true)
      this.showDescription = true
    },
    ...mapMutations([
      'setEditMode',
      'setFlags'
    ])
  }
}
</script>

<style lang="scss" scoped>
.description {
  margin-top: 20px;

  .description-header {
    font-weight: 700;
    outline: none;
  }
}

.nes-balloon {
  margin-top: 20px;
  margin-bottom: 12px;
}

hr {
  margin: 20px -25px;
  border-color: black;
  border-width: 2px;
}

textarea {
  resize: vertical;
  margin: 20px 4px;
}

button {
  margin-right: 10px;
}

.nes-text.is-error {
  margin-top: 10px;
}
</style>
