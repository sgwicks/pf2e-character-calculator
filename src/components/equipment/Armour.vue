<template>
  <SGSection title="Armour">
    <SGInput v-model="armour.name" label="Armour" />
    <!-- AC -->
    <SGInput v-model="armour.ac" label="AC" />
    <!-- Dex Cap -->
    <SGInput v-model="dexCapComputed" label="Dex Cap" class="number-input" />
    <!-- Check Penalty -->
    <SGInput v-model="armour.checkPenalty" label="Check Penalty" />
    <!-- Speed Penalty -->
    <SGInput v-model="armour.speedPenalty" label="Speed Penalty" />
    <!-- Strength Req -->
    <SGInput v-model="armour.strengthReq" label="Strength Requirement" />
    <!-- Category (U, L, M, H) -->
    <ArmourType v-model="armour.category" />
    <Shield />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ArmourType from '@/components/form/ArmourType.vue'
import Shield from './Shield.vue'
import { computed } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'

const equipmentStore = useEquipmentStore()
const { armour } = storeToRefs(equipmentStore)

const dexCapComputed = computed({
  get: () => (armour.value.dexCap === null ? null : armour.value.dexCap),
  set: (val: any) => {
    console.log(val)
    if (val === undefined || val === null || val === '') armour.value.dexCap = null
    else armour.value.dexCap = Number(val)
  }
})
</script>
