<template>
  <SGSection v-if="character" title="Perception">
    <div class="skill-row">
      <SGInput :model-value="computedPerception" label="Perception" disabled />
      <span class="equals" />
      <SGInput :model-value="wisdom" label="Wis" disabled />
      <span class="plus" />
      <SGInput v-model="item" label="Item" />
      <ProficiencyLevel v-model="proficiency" />
    </div>
    <SGInput v-model="senses" label="Senses" />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'
import { updatePerception } from '@/api/perception'
import { debounce } from 'lodash'

import { useCharacterStore } from '@/stores/character'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import constants from '@/contstants'

const props = defineProps<{
  wisdom: number
}>()

const characterStore = useCharacterStore()
const { getProficiencyValue, syncApiCharacterDown } = characterStore
const { character, perception } = storeToRefs(characterStore)

const proficiency = computed<Proficiency>({
  get: () => perception.value.proficiency,
  set: debounce(async (val: Proficiency) => {
    if (!character.value) return
    if (val === perception.value.proficiency) return
    await updatePerception(
      {
        ...perception.value,
        proficiency: val
      },
      character.value.id
    )
    syncApiCharacterDown(character.value.id)
  }, constants.AUTOSAVE_INTERVAL)
})

const item = computed<number>({
  get: () => perception.value.item,
  set: debounce(async (val: number) => {
    if (!character.value) return
    if (val === perception.value.item) return
    await updatePerception(
      {
        ...perception.value,
        item: val || 0
      },
      character.value.id
    )
    syncApiCharacterDown(character.value.id)
  }, constants.AUTOSAVE_INTERVAL)
})

const senses = computed<string | null>({
  get: () => perception.value.senses.join(', '),
  set: debounce(async (val: string | null) => {
    if (!character.value) return
    if (val === perception.value.senses.join(', ')) return
    await updatePerception(
      {
        ...perception.value,
        senses: val ? val.split(',') : []
      },
      character.value.id
    )
    syncApiCharacterDown(character.value.id)
  }, constants.AUTOSAVE_INTERVAL)
})

const computedPerception = computed(
  () => props.wisdom + getProficiencyValue(perception.value.proficiency) + perception.value.item
)
</script>
