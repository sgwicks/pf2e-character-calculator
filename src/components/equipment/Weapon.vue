<template>
  <hr />
  <SGSearchableInput v-model="weaponToResult" label="Weapon" :query="fetchWeapons" />
  <div class="weapon">
    <!-- To Hit -->
    <fieldset class="flex wrap">
      <legend>To Hit</legend>
      <div class="flex wrap full-width">
        <SGInput :model-value="toHit" label="Total" disabled />
        <span class="equals" />
        <SGInput :model-value="attribute" label="Att" disabled />
        <span class="plus" />
        <SGInput :model-value="proficiency" label="Prof" disabled />
        <span class="plus" />
        <!-- <SGInput :model-value="weapon.item" label="Item" /> -->
      </div>
      <fieldset class="full-width flex space-around">
        <label>
          Melee
          <input type="radio" v-model="isRanged" value="false" disabled />
        </label>
        <label>
          Ranged
          <input type="radio" v-model="isRanged" value="true" disabled />
        </label>
      </fieldset>
      <fieldset class="full-width flex space-around">
        <label>
          Simple
          <input type="radio" :checked="weapon.category === 'S'" disabled />
        </label>
        <label>
          Martial
          <input type="radio" :checked="weapon.category === 'M'" disabled />
        </label>
        <label>
          Other
          <input type="radio" :checked="weapon.category === 'A'" disabled />
        </label>
      </fieldset>
    </fieldset>

    <!-- Damage -->
    <fieldset>
      <legend>Damage</legend>
      <div class="full-width flex wrap">
        <SGInput :model-value="diceString" label="Dice" style="width: 6em" disabled />
        <span v-if="!isRanged" class="plus" />
        <SGInput v-if="!isRanged" :model-value="attribute" label="Str" disabled />
      </div>
      <div class="flex column">
        <label class="flex space-between">
          Bludgeoning
          <SGCheckbox :model-value="weapon.damage_type === 'B'" disabled />
        </label>
        <label class="flex space-between">
          Piercing
          <SGCheckbox :model-value="weapon.damage_type === 'P'" disabled />
        </label>
        <label class="flex space-between">
          Slashing
          <SGCheckbox :model-value="weapon.damage_type === 'S'" disabled />
        </label>
      </div>
    </fieldset>

    <SGInput label="Traits" :model-value="weaponTraits" disabled />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SGInput from '@/components/form/SGInput.vue'
import SGSearchableInput from '../form/SGSearchableInput.vue'
import SGCheckbox from '@/components/form/SGCheckbox.vue'

import { useCharacterStore } from '@/stores/character'
import { useEquipmentStore } from '@/stores/equipment'
import { fetchWeapons, setCharacterWeapon, updateCharacterWeapon } from '@/api/weapon'
import { storeToRefs } from 'pinia'
import { toTitleCase } from '@/utils'

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const equipmentStore = useEquipmentStore()
const { getWeaponProficiency } = equipmentStore

const props = defineProps<{
  weapon: Weapon
}>()

const weaponToResult = computed<Result>({
  get: () => ({
    id: props.weapon.id,
    label: props.weapon.name,
    value: props.weapon.name
  }),
  set: async (weaponResult) => {
    if (!character.value) return
    if (props.weapon.id === 0) {
      // This is an empty weapon
      await setCharacterWeapon(character.value.id, weaponResult.id)
    } else {
      // This is an existing weapon
      await updateCharacterWeapon(character.value.id, props.weapon.id, weaponResult.id)
    }
    syncApiCharacterDown(character.value.id)
  }
})

const weaponTraits = computed(() => props.weapon.traits.map((w) => toTitleCase(w)).join(', '))

const strength = character.value?.abilities.strength || 0
const dexterity = character.value?.abilities.dexterity || 0

const isRanged = computed({
  get: () => props.weapon.range > 5,
  set: () => {}
})

const attribute = computed(() => (isRanged.value ? dexterity : strength))

const proficiency = computed(() => getWeaponProficiency(props.weapon.category))

const toHit = computed(() => attribute.value + proficiency.value)

const diceString = computed(
  () => `${props.weapon.damage_die_amount}d${props.weapon.damage_die_type}`
)
</script>

<style lang="scss" scoped>
.weapon {
  display: grid;
  grid-template-columns: 60% 40%;
  width: 100%;
}

fieldset {
  margin: 4px;
}
</style>
