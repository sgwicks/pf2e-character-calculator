<template>
  <SGSection>
    <div class="armour">
      <div class="flex" style="margin-inline-start: 30%; width: 70%">
        <SGSearchableInput v-model="armourToResult" label="Armour" :query="fetchArmours" />
        <!-- AC -->
        <SGInput v-model="armour.armour_class" label="AC" class="number-input" disabled />
      </div>
      <div class="flex row">
        <!-- Dex Cap -->
        <SGInput v-model="dexCapComputed" label="Dex Cap" class="number-input" disabled />
        <!-- Strength Req -->
        <SGInput
          v-model="armour.strength"
          label="Strength Required"
          class="number-input"
          disabled
        />
        <!-- Check Penalty -->
        <SGInput
          v-model="armour.check_penalty"
          label="Check Penalty"
          class="number-input"
          disabled
        />
        <!-- Speed Penalty -->
        <SGInput
          v-model="armour.speed_penalty"
          label="Speed Penalty"
          class="number-input"
          disabled
        />
        <!-- Category (U, L, M, H) -->
        <ArmourType v-model="armour.category" style="width: 50%" />
      </div>
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import SGSearchableInput from '../form/SGSearchableInput.vue'
import ArmourType from '@/components/form/ArmourType.vue'
import { computed } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'
import { setCharacterArmour, removeCharacterArmour } from '@/api/armour'
import { fetchArmours } from '@/api/armour'

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const equipmentStore = useEquipmentStore()
const { armour } = storeToRefs(equipmentStore)

const armourToResult = computed<Result>({
  get: () => ({
    id: armour.value.id,
    label: armour.value.name,
    value: armour.value.name
  }),
  set: async (val) => {
    if (!character.value) return
    // If they've selected the armour they're already wearing, no need to update
    if (val.label === armour.value.name) return
    if (armour.value.id > 0) {
      // We only want 1 piece of armour on a character,
      // so first we remove the old one, if it exists
      // If armour id is 0, then it's emptyArmour
      await removeCharacterArmour(character.value.id, armour.value.id)
    }
    await setCharacterArmour(character.value.id, val.id)
    syncApiCharacterDown(character.value.id)
  }
})

const dexCapComputed = computed({
  get: () => (armour.value.dex_cap === null ? null : armour.value.dex_cap),
  set: (val: any) => {
    if (val === undefined || val === null || val === '') armour.value.dex_cap = null
    else armour.value.dex_cap = Number(val)
  }
})
</script>

<style lang="scss" scoped>
.armour {
  display: flex wrap;
  width: 100%;
}
</style>
