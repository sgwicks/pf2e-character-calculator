<template>
  <SGSection title="Health">
    <SGInput v-model="hp.max" label="Max" />
    <SGInput v-model="hp.current" label="Current" />
    <SGInput v-model="hp.temporary" label="Temp" />
    <SGInput v-model="hp.dying" label="Dying" />
    <SGInput v-model="hp.wounded" label="Wounded" />
    <div style="width: 100%">
      <SGInput v-model="resistances" label="Resistances" />
      <SGInput v-model="immunities" label="Immunites" />
      <SGInput v-model="conditions" label="Conditions" />
      <SGInput v-model="weaknesses" label="Weaknesses" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { cloneDeep, debounce } from 'lodash'
import { patchHealth } from '@/api/health'

const characterStore = useCharacterStore()

const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const hp = ref<CharacterHealth>({
  max: 0,
  current: 0,
  temporary: 0,
  dying: 0,
  wounded: 0,
  resistances: [],
  immunities: [],
  conditions: [],
  weaknesses: []
})

const resistances = computed<string>({
  get: () => hp.value.resistances.toString(),
  set: (val) => (hp.value.resistances = val.split(','))
})

const immunities = computed<string>({
  get: () => hp.value.immunities.toString(),
  set: (val) => (hp.value.immunities = val.split(','))
})

const conditions = computed<string>({
  get: () => hp.value.conditions.toString(),
  set: (val) => (hp.value.conditions = val.split(','))
})

const weaknesses = computed<string>({
  get: () => hp.value.weaknesses.toString(),
  set: (val) => (hp.value.weaknesses = val.split(','))
})

const handleUpdateHealth = debounce(async () => {
  if (!character.value) return
  await patchHealth(character.value.id, hp.value)
  syncApiCharacterDown(character.value.id)
}, 1000)

onMounted(() => {
  if (character.value) {
    hp.value = cloneDeep(character.value.health)
  }

  watch(
    hp,
    () => {
      handleUpdateHealth()
    },
    { deep: true }
  )
})
</script>
