<template>
  <section>
    <div style="width: 100%" class="flex">
      <h2 style="width: 50%">Shield</h2>
      <SGSearchableInput v-model="shieldToResult" label="Shield" :query="fetchShields" />
      <label>
        Raised?
        <SGCheckbox v-model="raised" />
      </label>
    </div>
    <SGInput :model-value="shield.armour_class" label="AC" disabled />
    <SGInput :model-value="shield.hardness" label="Hardness" disabled />
    <SGInput :model-value="shield.max_hp" label="Max HP" disabled />
    <SGInput :model-value="shield.break_threshold" label="BT" disabled />
    <SGInput v-model="current_hp" label="Current HP" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { fetchShields, addShield, replaceShield, updateShield } from '@/api/shield'

import SGInput from '@/components/form/SGInput.vue'
import SGCheckbox from '@/components/form/SGCheckbox.vue'
import SGSearchableInput from '../form/SGSearchableInput.vue'

import { useCharacterStore } from '@/stores/character'

import { storeToRefs } from 'pinia'

const emptyShield: Shield = {
  id: 0,
  name: '',
  hardness: 0,
  max_hp: 0,
  break_threshold: 0,
  bulk: 0,
  price: 0,
  armour_class: 0,
  current_hp: 0,
  raised: false
}

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const shield = computed(() => character.value?.shield || emptyShield)

const shieldToResult = computed<Result>({
  get: () => ({
    id: shield.value.id,
    label: shield.value.name,
    value: shield.value.name
  }),
  set: async (val) => {
    if (!character.value) return
    if (val.label === shield.value.name) return
    if (shield.value.id === 0) {
      // This is a new shield
      await addShield(character.value.id, val.id)
    } else {
      await replaceShield(character.value.id, val.id)
    }
    syncApiCharacterDown(character.value.id)
  }
})

const raised = computed({
  get: () => shield.value.raised,
  set: async (val) => {
    if (!character.value) return
    if (shield.value.id === 0) return
    if (shield.value.raised === val) return
    await updateShield(character.value.id, { raised: val })
    syncApiCharacterDown(character.value.id)
  }
})

const current_hp = computed({
  get: () => shield.value.current_hp,
  set: async (val) => {
    if (!character.value) return
    if (shield.value.id === 0) return
    if (shield.value.current_hp === val) return
    await updateShield(character.value.id, { current_hp: val })
    syncApiCharacterDown(character.value.id)
  }
})
</script>
