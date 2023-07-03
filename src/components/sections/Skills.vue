<template>
  <SGSection title="Skills">
    <div v-for="(skill, key) in skills" class="skill-row">
      <SGInput :model-value="getSkillValue(key)" :label="key.toString()" disabled />
      <span>=</span>
      <SGInput
        :model-value="getAttributeModifier(skill.attribute)"
        :label="skill.attribute.slice(0, 3)"
        disabled
      />
      <SGInput :model-value="getProficiencyValue(skill.proficiency)" label="Prof" disabled />
      <ProficiencyLevel
        :model-value="skill.proficiency"
        @update:model-value="(val) => setSkillProficiency(key, val)"
      />
      <SGInput
        :model-value="skill.item"
        label="Item"
        @update:model-value="(val) => setSkillItem(key, val)"
      />
      <span>-</span>
      <SGInput :model-value="skill.armour" label="Armour" disabled />
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
const {
  getAttributeModifier,
  getProficiencyValue,
  getSkillValue,
  setSkillProficiency,
  setSkillItem
} = store
const { level, skills } = storeToRefs(store)
</script>

<style scoped>
.skill-row {
  display: grid;
  grid-template-columns: 50px 25px repeat(2, 50px) 100px 50px 5px 50px;
  column-gap: 10px;
  align-items: end;
}

.skill-row span {
  justify-self: center;
  padding-bottom: 5px;
}
</style>
