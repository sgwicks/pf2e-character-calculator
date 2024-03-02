<template>
  <SGSection title="Armour">
    <div class="armour">
      <div class="flex align-start">
        <SGSearchableInput v-model="armourToResult" label="Armour" :query="fetchArmours" />
        <!-- AC -->
        <SGInput v-model="armour.armour_class" label="AC" class="number-input" disabled />
      </div>
      <div class="armour-modifiers">
        <!-- Dex Cap -->
        <SGInput v-model="dexCapComputed" label="Dex Cap" class="number-input" disabled />
        <!-- Strength Req -->
        <SGInput v-model="armour.strength" label="Str Req" class="number-input" disabled />
        <!-- Check Penalty -->
        <SGInput
          :model-value="armour.check_penalty * -1"
          label="Skill"
          class="number-input"
          disabled
        />
        <!-- Speed Penalty -->
        <SGInput
          :model-value="armour.speed_penalty * -1"
          label="Speed"
          class="number-input"
          disabled
        />
      </div>
      <!-- Category (U, L, M, H) -->
      <ArmourType v-model="armour.category" class="col-span-2" />
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
}

.armour-modifiers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(2em, 25%));
  justify-items: end;
  &:deep(label) {
    align-items: end;
  }
}
</style>
