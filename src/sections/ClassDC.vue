<template>
  <SGSection title="Class DC">
    <div class="skill-row">
      <SGInput :model-value="classDC" label="Total" disabled />
      <span class="equals" />
      <SGInput :model-value="10" disabled label="Base" class="number-input" />
      <span class="plus" />
      <SGInput :model-value="getClassKeySkill(0)" label="Key" disabled />
      <span class="plus" />
      <SGInput :model-value="getProficiencyValue(proficiency)" label="Prof" disabled />
      <span class="plus" />
      <SGInput v-model="item" label="Item" />
      <ProficiencyLevel v-model="proficiency" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'
import { computed, ref } from 'vue'

import { patchProficiency } from '@/api/proficiency'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { debounce } from 'lodash'

const characterStore = useCharacterStore()
const { character } = storeToRefs(characterStore)
const { getProficiencyValue, getClassKeySkill, syncApiCharacterDown } = characterStore

const classDC = computed(
  () => 10 + getClassKeySkill(0) + getProficiencyValue(proficiency.value) + item.value
)

const proficiency = computed({
  get: () => character.value?.proficiencies.class_dc || 0,
  set: debounce(async (val) => {
    if (!character.value) return
    if (val === character.value?.proficiencies.class_dc) return
    await patchProficiency(character.value.id, { class_dc: val })
    syncApiCharacterDown(character.value.id)
  }, 1000)
})
const item = ref(0)
</script>
