<template>
  <SGSection title="Skills">
    <div v-for="(skill, key) in skills" class="skill-row">
      {{ key }}
      <SGInput :model-value="getSkillValue(key)" disabled />
      =
      <SGInput :model-value="getAttributeModifier(skill.attribute)" disabled />
      <SGInput :model-value="proficiencyValue(skill.proficiency)" disabled />
      <ProficiencyLevel
        :model-value="skill.proficiency"
        @update:model-value="(val) => setSkillProficiency(key, val)"
      />
      <SGInput :model-value="skill.item" @update:model-value="(val) => setSkillItem(key, val)" />
      -
      <SGInput :model-value="skill.armour" disabled />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '../layout/SGSection.vue'
import SGInput from '../form/SGInput.vue'
import ProficiencyLevel from '../form/ProficiencyLevel.vue'

import { useStore } from '@/stores/'
import { storeToRefs } from 'pinia'

const store = useStore()
const { getAttributeModifier, getSkillValue, setSkillProficiency, setSkillItem } = store
const { level, skills } = storeToRefs(store)

const proficiencyValue = (prof: number) => {
  if (!prof) return 0
  return prof + level.value
}
</script>

<style scoped>
.skill-row {
  display: flex;
}
</style>
