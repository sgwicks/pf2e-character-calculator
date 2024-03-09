<template>
  <div class="section">
    <SGSearchableInput v-model="weaponToResult" label="Weapon" :query="fetchWeapons" />
    <div class="weapon">
      <!-- To Hit -->
      <fieldset class="flex wrap">
        <legend>To Hit</legend>
        <div class="flex">
          <SGInput :model-value="toHit" label="Total" disabled />
          <span class="equals" />
          <SGInput :model-value="attribute" label="Att" disabled />
          <span class="plus" />
          <SGInput :model-value="proficiency" label="Prof" disabled />
        </div>
        <fieldset class="flex wrap space-around">
          <label>
            Melee
            <input type="radio" v-model="isRanged" value="false" disabled />
          </label>
          <label>
            Ranged
            <input type="radio" v-model="isRanged" value="true" disabled />
          </label>
        </fieldset>
        <fieldset class="flex wrap space-around">
          <label>
            Unarmed
            <input type="radio" :checked="weapon.category === 'U'" disabled />
          </label>
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
        <div class="flex">
          <SGInput
            v-model="diceString"
            label="Dice"
            :disabled="isEmptyWeapon"
            :key="weaponInput"
            style="width: 4em"
          />
          <span v-if="!isRanged" class="plus" />
          <SGInput v-if="!isRanged" :model-value="attribute" label="Str" disabled />
        </div>

        <div class="flex column">
          <label class="flex space-between">
            Bludgeoning
            <input :checked="weapon.damage_type === 'B'" type="radio" disabled />
          </label>
          <label class="flex space-between">
            Piercing
            <input :checked="weapon.damage_type === 'P'" type="radio" disabled />
          </label>
          <label class="flex space-between">
            Slashing
            <input :checked="weapon.damage_type === 'S'" type="radio" disabled />
          </label>
        </div>
      </fieldset>
      <label class="col-span-2">
        Traits
        <textarea :value="weaponTraits" disabled />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SGInput from '@/components/form/SGInput.vue'
import SGSearchableInput from '../form/SGSearchableInput.vue'

import { useCharacterStore } from '@/stores/character'
import { useEquipmentStore } from '@/stores/equipment'
import {
  fetchWeapons,
  setCharacterWeapon,
  replaceCharacterWeapon,
  updateCharacterWeapon
} from '@/api/weapon'
import { storeToRefs } from 'pinia'
import { toTitleCase } from '@/utils'
import { debounce } from 'lodash'

const weaponInput = ref(0)

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const equipmentStore = useEquipmentStore()
const { getWeaponProficiency } = equipmentStore

const props = defineProps<{
  weapon: Weapon
}>()

const isEmptyWeapon = computed(() => props.weapon.id === 0)

const weaponToResult = computed<Result>({
  get: () => ({
    id: props.weapon.id,
    label: props.weapon.name,
    value: props.weapon.name
  }),
  set: async (weaponResult) => {
    if (!character.value) return
    if (isEmptyWeapon.value) {
      // This is an empty weapon
      await setCharacterWeapon(character.value.id, weaponResult.id)
    } else {
      // This is an existing weapon
      await replaceCharacterWeapon(character.value.id, props.weapon.id, weaponResult.id)
    }
    syncApiCharacterDown(character.value.id)
  }
})

const weaponTraits = computed(() => props.weapon.traits.map((w) => toTitleCase(w)).join(', '))

const strength = computed(() => character.value?.abilities.strength || 0)
const dexterity = computed(() => character.value?.abilities.dexterity || 0)

const isRanged = computed({
  get: () => props.weapon.range > 5,
  set: () => {}
})

const attribute = computed(() => (isRanged.value ? dexterity.value : strength.value))

const proficiency = computed(() => getWeaponProficiency(props.weapon.category))

const toHit = computed(() => attribute.value + proficiency.value)

const diceString = computed({
  get: () => `${props.weapon.damage_die_amount}d${props.weapon.damage_die_type}`,
  set: debounce(async (diceString) => {
    if (isEmptyWeapon.value) return
    if (!character.value) return
    const [amount, type] = diceString.split('d')
    const damage_die_amount = Number(amount)
    const damage_die_type = Number(type)
    switch (damage_die_type) {
      case 2:
      case 4:
      case 6:
      case 8:
      case 10:
      case 12:
        break
      default:
        return weaponInput.value++
    }

    if (
      damage_die_amount === props.weapon.damage_die_amount &&
      damage_die_type === props.weapon.damage_die_type
    )
      return

    await updateCharacterWeapon(character.value.id, props.weapon.id, {
      damage_die_amount,
      damage_die_type
    })

    await syncApiCharacterDown(character.value.id)
    weaponInput.value++
  }, 1000)
})
</script>

<style lang="scss" scoped>
.weapon {
  display: grid;
  grid-template-columns: auto auto;
}

fieldset {
  margin: 4px;
}

textarea {
  resize: none;
  width: 100%;
}

.equals,
.plus {
  display: inline;
}
</style>
