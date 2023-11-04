<template>
  <SGSection title="Armour Class">
    <SGInput :model-value="armourClass" label="AC" disabled />
    <span class="equals" />
    <SGInput :model-value="getProficiencyValue(proficiency)" label="Prof" disabled />
    <span class="plus" />
    <div class="flex dex-or-cap">
      <SGInput :model-value="dexterity" label="Dex" disabled />
      <span class="or">OR</span>
      <SGInput
        :model-value="armour.dexCap === null ? '' : armour.dexCap"
        label="Cap"
        disabled
        class="number-input cap"
      />
    </div>
    <span class="plus" />
    <SGInput :model-value="armour.ac" label="Armour" disabled />
    <span class="plus" />
    <SGInput :model-value="shieldToAc" label="Shield" disabled />
    <fieldset class="flex wrap">
      <legend>Proficiencies</legend>
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
    </fieldset>
  </SGSection>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'
import { useMainStore } from '@/stores/main'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  dexterity: number
}>()

const { getProficiencyValue } = useMainStore()
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
  if (armour.value.dexCap === null) return props.dexterity
  return armour.value.dexCap > props.dexterity ? props.dexterity : armour.value.dexCap
})

const shieldToAc = computed(() => (shield.value.raised ? shield.value.ac : 0))

const armourClass = computed(
  () =>
    10 + armour.value.ac + dexToAc.value + getProficiencyValue(proficiency.value) + shieldToAc.value
)
</script>

<style scoped lang="scss">
fieldset {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
}

.dex-or-cap {
  position: relative;
  text-align: center;
  :deep(input) {
    text-align: center;
  }
}

.or {
  border: 1px solid white;
  height: 2.2em;
  position: absolute;
  top: 2.5rem;
  right: 40%;
  left: 40%;
  text-align: center;
  font-size: 80%;
  font-weight: 900;
  background: white;
  line-height: 1.9em;
}
</style>
