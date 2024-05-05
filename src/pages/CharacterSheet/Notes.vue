<template>
  <textarea v-model="notes"></textarea>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import { updateCharacterNotes } from '@/api/notes'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { debounce } from 'lodash'

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const notes = computed({
  get: () => character.value?.notes.body,
  set: debounce(async (body) => {
    if (!character.value) return
    if (body === character.value.notes.body) return
    if (!body) return
    await updateCharacterNotes(character.value.id, body)
    syncApiCharacterDown(character.value.id)
  }, 500)
})
</script>
