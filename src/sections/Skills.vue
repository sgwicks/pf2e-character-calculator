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
      <SGInput v-if="skill.armour" :model-value="getArmourCheckPenalty" label="Armour" disabled />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'

import { useMainStore } from '@/stores/main'
import { useAttributeStore } from '@/stores/attribute'
import { useSkillStore } from '@/stores/skill'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'

const { getProficiencyValue } = useMainStore()
const { getAttributeModifier } = useAttributeStore()

const skillStore = useSkillStore()
const { getSkillValue, setSkillProficiency, setSkillItem } = skillStore
const { skills } = storeToRefs(skillStore)

const equipmentStore = useEquipmentStore()
const { getArmourCheckPenalty } = storeToRefs(equipmentStore)
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
