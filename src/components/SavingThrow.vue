<template>
  <SGInput :model-value="savingThrow" disabled :label="title" />
  <span class="equals" />
  <SGInput :model-value="value" :label="attribute.slice(0, 3)" disabled />
  <span class="plus" />
  <SGInput :model-value="getProficiencyValue(savingThrows[title])" label="prof" disabled />
  <span class="plus" />
  <SGInput v-model="item" label="Item" />
  <ProficiencyLevel
    :model-value="savingThrows[title]"
    @update:model-value="(val) => handleSavingThrowProficiency(val)"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { updateSavingThrows } from '@/api/saving_throw'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  title: SavingThrow
  attribute: Attribute
}>()

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character, abilities, savingThrows } = storeToRefs(characterStore)
const value = computed(() => abilities.value[props.attribute] || 0)

const { getProficiencyValue } = useCharacterStore()

const handleSavingThrowProficiency = async (val: number) => {
  if (!character.value) return
  const updatedSavingThrows = {
    ...savingThrows.value,
    [props.title]: val
  }
  await updateSavingThrows(updatedSavingThrows, character.value.id)
  syncApiCharacterDown(character.value.id)
}

const item = ref(0)

const savingThrow = computed(
  () => value.value + getProficiencyValue(savingThrows.value[props.title]) + item.value
)
</script>
