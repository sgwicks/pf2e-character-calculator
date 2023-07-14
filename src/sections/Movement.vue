<template>
  <SGSection title="Movement">
    <SGInput v-model="maxSpeed" label="Max Speed" />
    <SGInput :model-value="currentSpeed" label="Current" disabled />
  </SGSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'

import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'
const equipmentStore = useEquipmentStore()
const { getArmourSpeedPenalty } = storeToRefs(equipmentStore)

const maxSpeed = ref(0)
const currentSpeed = computed(() => maxSpeed.value + getArmourSpeedPenalty.value)
</script>
