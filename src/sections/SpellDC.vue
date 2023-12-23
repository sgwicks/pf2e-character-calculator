<template>
  <div>
    <SGSection title="Spell Attack Roll" class="flex wrap full-width">
      <SGInput :model-value="spellAttackRoll" label="Roll" disabled />
      <span class="equals" />
      <SGInput :model-value="keySkill" label="Key" disabled />
      <span class="plus" />
      <SGInput :model-value="spellAttackProficiency" label="Prof" disabled />
      <ProficiencyLevel v-model="spellAttackProficiency" />
    </SGSection>
    <SGSection title="Spell Save DC" class="flex wrap full-width">
      <SGInput :model-value="spellDC" label="DC" disabled />
      <span class="equals" />
      <SGInput model-value="10" class="number-input" label="Base" disabled />
      <span class="plus" />
      <SGInput :model-value="keySkill" label="Key" disabled />
      <span class="plus" />
      <SGInput :model-value="spellDCProficiency" label="Prof" disabled />
      <ProficiencyLevel v-model="spellDCProficiency" />
    </SGSection>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'
import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { patchProficiency } from '@/api/proficiency'
import { debounce } from 'lodash'

const characterStore = useCharacterStore()
const { character } = storeToRefs(characterStore)
const { getProficiencyValue, getClassKeySkill, syncApiCharacterDown } = useCharacterStore()

const keySkill = computed(() => getClassKeySkill(0))

const handleProficiencyChange = debounce(async (params: Partial<Proficiencies>) => {
  if (!character.value) return
  await patchProficiency(character.value.id, params)
  syncApiCharacterDown(character.value.id)
}, 1000)

const spellAttackProficiency = computed({
  get: () => character.value?.proficiencies.spell_attack || 0,
  set: (val) => {
    if (val === character.value?.proficiencies.spell_attack) return
    handleProficiencyChange({ spell_attack: val })
  }
})

const spellAttackRoll = computed<number>(
  () => keySkill.value + getProficiencyValue(spellAttackProficiency.value)
)

const spellDCProficiency = computed({
  get: () => character.value?.proficiencies.spell_dc || 0,
  set: (val) => {
    if (val === character.value?.proficiencies.spell_dc) return
    handleProficiencyChange({ spell_dc: val })
  }
})

const spellDC = computed<number>(
  () => 10 + keySkill.value + getProficiencyValue(spellDCProficiency.value)
)
</script>
