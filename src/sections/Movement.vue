<template>
  <SGSection title="Movement">
    <SGInput v-model="maxSpeed" label="Max Speed" />
    <SGInput :model-value="currentSpeed" label="Current" disabled />
  </SGSection>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'

import { patchMovement } from '@/api/movement'

import { useCharacterStore } from '@/stores/character'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { createHandleUpdate } = characterStore
const { character } = storeToRefs(characterStore)

const equipmentStore = useEquipmentStore()
const { getArmourSpeedPenalty } = storeToRefs(equipmentStore)

const maxSpeed = ref(0)

const currentSpeed = computed(() => maxSpeed.value + getArmourSpeedPenalty.value)

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
