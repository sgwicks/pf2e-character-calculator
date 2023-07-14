<template>
  <hr />
  <SGInput v-model="weapon.name" label="Weapon" />
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
        <SGInput v-model="weapon.item" label="Item" />
      </div>
      <fieldset class="full-width flex space-around">
        <label>
          Melee
          <input type="radio" v-model="weapon.type" name="weapon-type" value="melee" />
        </label>
        <label>
          Ranged
          <input type="radio" v-model="weapon.type" name="weapon-type" value="ranged" />
        </label>
      </fieldset>
      <fieldset class="full-width flex space-around">
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
    </fieldset>

    <!-- Damage -->
    <fieldset>
      <legend>Damage</legend>
      <div class="full-width flex wrap">
        <SGInput v-model="diceString" label="Dice" style="width: 6em" />
        <span v-if="weapon.type === 'melee'" class="plus" />
        <SGInput v-if="weapon.type === 'melee'" :model-value="attribute" label="Str" disabled />
      </div>
      <div class="flex column">
        <label class="flex space-between">
          Bludgeoning
          <SGCheckbox v-model="weapon.bludgeoning" />
        </label>
        <label class="flex space-between">
          Piercing
          <SGCheckbox v-model="weapon.piercing" />
        </label>
        <label class="flex space-between">
          Slashing
          <SGCheckbox v-model="weapon.slashing" />
        </label>
      </div>
    </fieldset>
  </div>
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
