<template>
  <div>
    <SGSection title="Spell Attack Roll">
      <SGInput :model-value="spellAttackRoll" label="Roll" disabled />
      <SGInput :model-value="keySkill" label="Key" disabled />
      <SGInput :model-value="spellAttackProficiency" label="Prof" disabled />
      <ProficiencyLevel v-model="spellAttackProficiency" />
    </SGSection>
    <SGSection title="Spell Save DC">
      <SGInput :model-value="spellDC" label="DC" disabled />
      <SGInput :model-value="keySkill" label="Key" disabled />
      <SGInput :model-value="spellDCProficiency" label="Prof" disabled />
      <ProficiencyLevel v-model="spellDCProficiency" />
    </SGSection>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'
import { useMainStore } from '@/stores/main'

const { getClassKeySkill, getProficiencyValue } = useMainStore()
const keySkill = computed(() => getClassKeySkill())

const spellAttackProficiency = ref(0)
const spellAttackRoll = computed<number>(
  () => keySkill.value + getProficiencyValue(spellAttackProficiency.value)
)

const spellDCProficiency = ref(0)
const spellDC = computed<number>(
  () => 10 + keySkill.value + getProficiencyValue(spellDCProficiency.value)
)
</script>
