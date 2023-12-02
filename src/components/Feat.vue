<template>
  <SGSearchableInput
    v-model="featToResult"
    :label="`Level ${requiredLevel}`"
    :disabled="level < requiredLevel"
    :query="fetchCharacterFeats"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SGSearchableInput from './form/SGSearchableInput.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

import { fetchFeats, addCharacterFeat } from '@/api/feat'

const props = defineProps<{
  requiredLevel: number
  type: CharacterFeat['type']
}>()

const characterStore = useCharacterStore()
const { character, level } = storeToRefs(characterStore)
const { syncApiCharacterDown } = characterStore

const emptyFeat: CharacterFeat = {
  id: 0,
  name: '',
  description: '',
  chosen_level: props.requiredLevel,
  type: props.type,
  traits: []
}

const feat = computed<CharacterFeat>(() => {
  if (!character.value) return { ...emptyFeat }
  const characterFeats = character.value.feats.filter((feat) => {
    if (feat.chosen_level !== props.requiredLevel) return false
    if (feat.type !== props.type) return false
    return true
  })

  return characterFeats[0] || { ...emptyFeat }
})

const featToResult = computed<Result>({
  get: () => ({
    id: feat.value.id || 0,
    label: feat.value.name || '',
    value: feat.value.name || ''
  }),
  set: async (val) => {
    if (!character.value) return
    if (val.label === feat.value.name) return
    await addCharacterFeat(character.value.id, {
      feat_id: val.id,
      chosen_level: props.requiredLevel,
      type: props.type
    })
    syncApiCharacterDown(character.value.id)
  }
})

const fetchCharacterFeats = async (string: string) => {
  return fetchFeats({
    name: string,
    level: props.requiredLevel,
    type: props.type,
    character_id: character.value?.id || null
  })
}

// const feat = ref('')
</script>
