<template>
  <SGSection title="Skills">
    <div v-for="(skill, key) in skills" class="skill-row" :key="key">
      <SGInput
        :model-value="
          abilities[skill.ability] +
          getProficiencyValue(skill.proficiency) +
          skill.item +
          (skill.armour ? getArmourCheckPenalty : 0)
        "
        :label="skill.name"
        disabled
      />
      <span class="equals" />
      <SGInput
        :model-value="abilities[skill.ability]"
        :label="skill.ability.slice(0, 3)"
        disabled
      />
      <span class="plus" />
      <SGInput :model-value="getProficiencyValue(skill.proficiency)" label="Prof" disabled />
      <ProficiencyLevel
        :model-value="skill.proficiency"
        @update:model-value="(val) => handleSkillProficiency(skill.id, val)"
      />
      <span class="plus" />
      <SGInput :model-value="skill.item" label="Item" disabled />
      <SGInput v-if="skill.armour" :model-value="getArmourCheckPenalty" label="Armour" disabled />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'

import { useCharacterStore } from '@/stores/character'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'
import { updateSkillProficiency } from '@/api/skill'

const characterStore = useCharacterStore()
const { getProficiencyValue, syncApiCharacterDown } = characterStore
const { character, abilities, skills } = storeToRefs(characterStore)

const equipmentStore = useEquipmentStore()
const { getArmourCheckPenalty } = storeToRefs(equipmentStore)

const handleSkillProficiency = async (skillId: number, proficiency: number) => {
  if (!character.value) return
  await updateSkillProficiency(character.value.id, skillId, proficiency)
  syncApiCharacterDown(character.value.id)
}
</script>

<style scoped>
.skill-row {
  display: grid;
  grid-template-columns: 50px 25px 50px 15px 50px 125px 15px 50px 50px 50px;
  column-gap: 15px;
  align-items: end;
}

.skill-row span {
  justify-self: center;
  padding-bottom: 5px;
}
</style>
