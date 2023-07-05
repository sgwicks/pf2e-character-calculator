<template>
  ---
  <h3>Weapon</h3>
  <SGInput v-model="weapon.name" label="Name" />
  <fieldset>
    <legend>To Hit</legend>
    <SGInput :model-value="toHit" disabled />
    <span>=</span>
    <SGInput :model-value="attribute" label="Att" disabled />
    <fieldset>
      <label>
        Melee
        <input type="radio" v-model="weapon.type" name="weapon-type" value="melee" />
      </label>
      <label>
        Ranged
        <input type="radio" v-model="weapon.type" name="weapon-type" value="ranged" />
      </label>
    </fieldset>
    <SGInput :model-value="proficiency" label="Prof" disabled />
    <fieldset>
      <label>
        Simple
        <input type="radio" v-model="weapon.class" name="weapon-class" value="simple" />
      </label>
      <label>
        Martial
        <input type="radio" v-model="weapon.class" name="weapon-class" value="martial" />
      </label>
      <label>
        Other
        <input type="radio" v-model="weapon.class" name="weapon-class" value="other" />
      </label>
    </fieldset>
    <SGInput v-model="weapon.item" label="Item" />
  </fieldset>
  <fieldset>
    <legend>Damage</legend>
    <SGInput v-model="diceString" label="Dice" />
    <SGInput v-if="weapon.type === 'melee'" :model-value="attribute" label="Str" disabled />
    <label>
      B
      <SGCheckbox v-model="weapon.bludgeoning" />
    </label>
    <label>
      P
      <SGCheckbox v-model="weapon.piercing" />
    </label>
    <label>
      S
      <SGCheckbox v-model="weapon.slashing" />
    </label>
  </fieldset>
  <SGInput v-model="weapon.other" label="Other" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SGInput from '@/components/form/SGInput.vue'
import SGCheckbox from '@/components/form/SGCheckbox.vue'

import { useAttributeStore } from '@/stores/attribute'
import { useEquipmentStore } from '@/stores/equipment'

const { getAttributeModifier } = useAttributeStore()

const equipmentStore = useEquipmentStore()
const { getWeaponProficiency } = equipmentStore

const props = defineProps<{
  weapon: Weapon
}>()

const { weapon } = props

const attribute = computed(() =>
  weapon.type === 'melee' ? getAttributeModifier('strength') : getAttributeModifier('dexterity')
)

const proficiency = computed(() =>
  weapon.class === 'other' ? getWeaponProficiency(weapon.other) : getWeaponProficiency(weapon.class)
)

const toHit = computed(() => attribute.value + proficiency.value + weapon.item)

const diceString = computed({
  get: () => `${weapon.dice.amount}d${weapon.dice.size}`,
  set: (val: string) => {
    const [amount, size] = val.split('d')
    weapon.dice.amount = parseInt(amount) ? parseInt(amount) : 1
    const parsedSize = parseInt(size)
    switch (parsedSize) {
      case 2:
      case 4:
      case 6:
      case 8:
      case 10:
      case 12:
      case 20:
        weapon.dice.size = parsedSize
        break
      default:
        weapon.dice.size = 2
    }
  }
})
</script>
