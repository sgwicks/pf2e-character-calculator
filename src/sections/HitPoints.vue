<template>
  <SGSection title="Hit Points" class="flex wrap">
    <div class="flex">
      <SGInput v-model="hp.max" label="Max" />
      <SGInput v-model="hp.current" label="Current" />
      <SGInput v-model="hp.temporary" label="Temp" />
    </div>
    <div class="flex">
      <SGInput v-model="hp.dying" label="Dying" />
      <SGInput v-model="hp.wounded" label="Wounded" />
    </div>
    <div class="flex column">
      <SGInput v-model="resistances" label="Resistances" />
      <SGInput v-model="immunities" label="Immunites" />
      <SGInput v-model="conditions" label="Conditions" />
      <SGInput v-model="weaknesses" label="Weaknesses" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash'
import { patchHealth } from '@/api/health'

import { arrayToString } from '@/utils'

const characterStore = useCharacterStore()

const { createHandleUpdate } = characterStore
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
  get: () => arrayToString(hp.value.resistances),
  set: (val) => (hp.value.resistances = val.split(','))
})

const immunities = computed<string>({
  get: () => arrayToString(hp.value.immunities),
  set: (val) => (hp.value.immunities = val.split(','))
})

const conditions = computed<string>({
  get: () => arrayToString(hp.value.conditions),
  set: (val) => (hp.value.conditions = val.split(','))
})

const weaknesses = computed<string>({
  get: () => arrayToString(hp.value.weaknesses),
  set: (val) => (hp.value.weaknesses = val.split(','))
})

const handleUpdateHealth = createHandleUpdate<CharacterHealth>(patchHealth)

onBeforeMount(() => {
  if (character.value) {
    hp.value = cloneDeep(character.value.health)
  }
})

onMounted(() => {
  // This allows us to skip watching the pre-mount API sync
  watch(
    hp,
    (val) => {
      handleUpdateHealth(val)
    },
    { deep: true }
  )
})
</script>
