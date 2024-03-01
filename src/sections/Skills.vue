<template>
  <SGSection title="Skills">
    <div class="skill-grid">
      <template v-for="(skill, key) in skills" :key="key">
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
        <span class="plus" />
        <SGInput :model-value="skill.item" label="Item" disabled />
        <template v-if="skill.armour">
          <span class="plus" />
          <SGInput :model-value="getArmourCheckPenalty" label="Armour" disabled />
        </template>
        <template v-else>
          <span class="plus" style="color: white" aria-hidden />
          <div class="blank-input"></div>
        </template>
        <ProficiencyLevel
          :model-value="skill.proficiency"
          @update:model-value="(val) => handleSkillProficiency(skill.id, val)"
        />
      </template>
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
.skill-grid {
  display: grid;
  grid-auto-rows: 5em;
  gap: 0.25em;

  @media (max-width: 1279px) {
    grid-template-columns: 4em repeat(3, 3em) 3.3em auto;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 4em repeat(7, 2em) 3.3em auto;
  }
}

/* Sames CSS class as a label.number */
.blank-input {
  margin: 8px 4px;
  width: 4em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 8px 4px;
  text-transform: capitalize;
  justify-content: space-between;
  font-weight: 600;
  height: 4em;
  font-size: 0.8rem;
}
</style>
