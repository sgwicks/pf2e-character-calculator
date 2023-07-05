<template>
  <SGSection title="Armour Class">
    <SGInput :model-value="armourClass" label="AC" disabled />
    <SGInput :model-value="getProficiencyValue(proficiency)" label="Prof" disabled />
    <SGInput :model-value="getAttributeModifier('dexterity')" label="Dex" disabled />
    <SGInput :model-value="armour.dexCap === null ? '' : armour.dexCap" label="Cap" disabled />
    <SGInput :model-value="armour.ac" label="Armour" disabled />
    <SGInput :model-value="shieldToAc" label="Shield" disabled />
    <label>
      Unarmoured
      <ProficiencyLevel v-model="unarmouredProficiency" />
    </label>
    <label>
      Light
      <ProficiencyLevel v-model="lightProficiency" />
    </label>
    <label>
      Medium
      <ProficiencyLevel v-model="mediumProficiency" />
    </label>
    <label>
      Heavy
      <ProficiencyLevel v-model="heavyProficiency" />
    </label>
  </SGSection>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SGSection from '../layout/SGSection.vue'
import SGInput from '../form/SGInput.vue'
import ProficiencyLevel from '../form/ProficiencyLevel.vue'
import { useMainStore } from '@/stores/main'
import { useAttributeStore } from '@/stores/attribute'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'

const { getProficiencyValue } = useMainStore()
const { getAttributeModifier } = useAttributeStore()
const equipmentStore = useEquipmentStore()
const { armour, shield } = storeToRefs(equipmentStore)

const unarmouredProficiency = ref(0)
const lightProficiency = ref(0)
const mediumProficiency = ref(0)
const heavyProficiency = ref(0)

const proficiency = computed(() => {
  switch (armour.value.category) {
    default:
    case 'U':
      return unarmouredProficiency.value
    case 'L':
      return lightProficiency.value
    case 'M':
      return mediumProficiency.value
    case 'H':
      return heavyProficiency.value
  }
})

const dexToAc = computed(() => {
  if (armour.value.dexCap === null) return getAttributeModifier('dexterity')
  return armour.value.dexCap > getAttributeModifier('dexterity')
    ? getAttributeModifier('dexterity')
    : armour.value.dexCap
})

const shieldToAc = computed(() => (shield.value.raised ? shield.value.ac : 0))

const armourClass = computed(
  () =>
    10 + armour.value.ac + dexToAc.value + getProficiencyValue(proficiency.value) + shieldToAc.value
)
</script>
