<template>
  <div>
    <button
        v-if="!description && !editMode"
        class="nes-btn add-description"
        @click="onClickAddDescription">
      + Add a description
    </button>
    <details
        v-if="description || editMode"
        class="description"
        :open="showDescription">
      <summary
          class="description-header">
        Description
      </summary>
      <textarea
          v-if="editMode"
          class="nes-textarea"
          v-model="descriptionText"
          rows="5"
          placeholder="Describe me please!">
      </textarea>
      <div
          v-if="editMode"
          class="description-toolbar">
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
        <div
            v-if="error"
            class="nes-text is-error">
          Sorry I couldn't updated the descritpion. Error:<br />
          {{ error }}
        </div>
      </div>
      <div
          v-else
          class="description-content">
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
      required: true
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
    ])
  },
  methods: {
    // @TODO refactor this into an vuex action
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

  .description-content {
    margin: 20px 0;
    line-height: 1.6;
  }
}

.nes-balloon {
  margin-bottom: 12px;
  margin-top: 20px;
}

hr {
  border-color: black;
  border-width: 2px;
  margin: 20px -25px;
}

textarea {
  margin: 20px 4px;
  resize: vertical;
}

.description-toolbar button {
  margin-right: 10px;
}

.nes-text.is-error {
  margin-top: 10px;
}

button.add-description {
  margin-top: 20px;
}
</style>
