<template>
  <div class="section flex column">
    <h2>Weapons</h2>
    <fieldset class="flex wrap">
      <legend>Proficiencies</legend>
      <label>
        Unarmed
        <ProficiencyLevel v-model="unarmed" />
      </label>
      <label></label>
      <label>
        Simple
        <ProficiencyLevel v-model="simple" />
      </label>
      <label>
        Martial
        <ProficiencyLevel v-model="martial" />
      </label>
    </fieldset>
  </div>
  <Weapon v-for="(weapon, i) in weapons" :key="`weapon-${i}`" :weapon="weapons[i]" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Weapon from '@/components/equipment/Weapon.vue'
import { useEquipmentStore } from '@/stores/equipment'
import { useCharacterStore } from '@/stores/character'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'
import { computed, ref } from 'vue'
import { patchProficiency } from '@/api/proficiency'
import { debounce } from 'lodash'
import constants from '@/constants'

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const equipmentStore = useEquipmentStore()
const { weapons } = storeToRefs(equipmentStore)

const proficiencies = ref<{
  unarmed: Proficiency
  simple: Proficiency
  martial: Proficiency
}>({
  unarmed: 0,
  simple: 0,
  martial: 0
})

const unarmed = computed({
  get: () => character.value?.proficiencies.unarmed || 0,
  set: (val) => {
    proficiencies.value.unarmed = val
    updateProficiencies()
  }
})

const simple = computed({
  get: () => character.value?.proficiencies.simple || 0,
  set: (val) => {
    proficiencies.value.simple = val
    updateProficiencies()
  }
})

const martial = computed({
  get: () => character.value?.proficiencies.martial || 0,
  set: (val) => {
    proficiencies.value.martial = val
    updateProficiencies()
  }
})

const updateProficiencies = debounce(async () => {
  if (!character.value) return
  await patchProficiency(character.value.id, proficiencies.value)
  syncApiCharacterDown(character.value.id)
}, constants.AUTOSAVE_INTERVAL)
</script>

<style lang="scss" scoped>
fieldset {
  margin-block: auto;
}
</style>
@/constants
