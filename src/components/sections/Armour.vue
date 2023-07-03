<template>
  <SGSection title="Armour Class">
    <SGInput :model-value="armourClass" label="AC" disabled />
    <SGInput :model-value="getProficiencyValue(proficiency)" label="Prof" disabled />
    <SGInput :model-value="getAttributeModifier('dexterity')" label="Dex" disabled />
    <SGInput :model-value="dexCap || 0" label="Cap" disabled />
    <fieldset>
      <label>
        U
        <input v-model="equipped" name="equipped" type="radio" value="U" />
      </label>
      <label>
        L
        <input v-model="equipped" name="equipped" type="radio" value="L" />
      </label>
      <label>
        M
        <input v-model="equipped" name="equipped" type="radio" value="M" />
      </label>
      <label>
        H
        <input v-model="equipped" name="equipped" type="radio" value="H" />
      </label>
    </fieldset>
    <SGInput v-model="item" label="Item" />
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
import { useStore } from '@/stores'
const { getAttributeModifier, getProficiencyValue } = useStore()

const unarmouredProficiency = ref(0)
const lightProficiency = ref(0)
const mediumProficiency = ref(0)
const heavyProficiency = ref(0)

const equipped = ref('U')

const proficiency = computed(() => {
  switch (equipped.value) {
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
const dexCap = ref<number | null>(null)

const dexToAc = computed(() => {
  if (!dexCap.value) return 0
  return dexCap.value > getAttributeModifier('dexterity')
    ? getAttributeModifier('dexterity')
    : dexCap.value
})
const item = ref(0)

const armourClass = computed(
  () => item.value + dexToAc.value + getProficiencyValue(proficiency.value)
)
</script>
