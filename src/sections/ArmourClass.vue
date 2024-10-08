<template>
  <SGSection title="Armour Class">
    <div class="flex space-between align-end" style="width: 100%">
      <SGInput :model-value="armourClass" label="AC" disabled />
      <span class="equals" />
      <SGInput :model-value="getProficiencyValue(proficiency)" label="Prof" disabled />
      <span class="plus" />
      <div class="flex dex-or-cap">
        <SGInput :model-value="abilities.dexterity" label="Dex" disabled />
        <span class="or">OR</span>
        <SGInput
          :model-value="armour.dex_cap === null ? '' : armour.dex_cap"
          label="Cap"
          disabled
          class="number-input cap"
        />
      </div>
      <span class="plus" />
      <SGInput :model-value="armour.armour_class" label="Armour" disabled />
      <span class="plus" />
      <SGInput :model-value="shieldToAc" label="Shield" disabled />
    </div>
    <fieldset>
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
import { useCharacterStore } from '@/stores/character'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'
import { patchProficiency } from '@/api/proficiency'
import { debounce } from 'lodash'
import constants from '@/constants'

const characterStore = useCharacterStore()
const { abilities, character } = storeToRefs(characterStore)
const { getProficiencyValue, syncApiCharacterDown } = characterStore
const equipmentStore = useEquipmentStore()
const { armour, shield } = storeToRefs(equipmentStore)

const unarmouredProficiency = computed({
  get: () => character.value?.proficiencies.unarmoured || 0,
  set: (val) => {
    proficiencies.value.unarmoured = val
    updateProficiencies()
  }
})

const lightProficiency = computed({
  get: () => character.value?.proficiencies.light || 0,
  set: (val) => {
    proficiencies.value.light = val
    updateProficiencies()
  }
})

const mediumProficiency = computed({
  get: () => character.value?.proficiencies.medium || 0,
  set: (val) => {
    proficiencies.value.medium = val
    updateProficiencies()
  }
})

const heavyProficiency = computed({
  get: () => character.value?.proficiencies.heavy || 0,
  set: (val) => {
    proficiencies.value.heavy = val
    updateProficiencies()
  }
})

const proficiencies = ref<{
  unarmoured: Proficiency
  light: Proficiency
  medium: Proficiency
  heavy: Proficiency
}>({
  unarmoured: 0,
  light: 0,
  medium: 0,
  heavy: 0
})

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

const updateProficiencies = debounce(async () => {
  if (!character.value) return
  await patchProficiency(character.value.id, proficiencies.value)
  syncApiCharacterDown(character.value.id)
}, constants.AUTOSAVE_INTERVAL)

const dexToAc = computed(() => {
  if (armour.value.dex_cap === null) return abilities.value.dexterity
  return armour.value.dex_cap > abilities.value.dexterity
    ? abilities.value.dexterity
    : armour.value.dex_cap
})

const shieldToAc = computed(() => (shield.value.raised ? shield.value.armour_class : 0))

const armourClass = computed(
  () =>
    10 +
    armour.value.armour_class +
    dexToAc.value +
    getProficiencyValue(proficiency.value) +
    shieldToAc.value
)
</script>

<style scoped lang="scss">
fieldset {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1em;
  table {
    margin-top: 0;
  }
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
  top: 2em;
  right: 40%;
  left: 40%;
  text-align: center;
  font-size: 80%;
  font-weight: 900;
  background: white;
  line-height: 1.9em;
}
</style>
@/constants
