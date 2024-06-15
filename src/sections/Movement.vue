<template>
  <SGSection title="Speed">
    <SGInput v-model="maxSpeed" label="Max" />
    <SGInput :model-value="currentSpeed" label="Current" disabled />
  </SGSection>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'

import { patchMovement } from '@/api/movement'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { createHandleUpdate, getArmourSpeedPenalty } = characterStore
const { character } = storeToRefs(characterStore)

const maxSpeed = ref(0)

const currentSpeed = computed(() => maxSpeed.value - getArmourSpeedPenalty())

const handleUpdateMovement = createHandleUpdate<CharacterMovement>(patchMovement)

onBeforeMount(() => {
  if (character.value) {
    maxSpeed.value = character.value.movement.base
  }
})

onMounted(() => {
  watch(maxSpeed, (val) => {
    handleUpdateMovement({ base: val })
  })
})
</script>
