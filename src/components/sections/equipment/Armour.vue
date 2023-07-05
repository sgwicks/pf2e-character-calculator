<template>
  <SGSection title="Armour">
    <SGInput v-model="armour.name" label="Armour" />
    <!-- Category (U, L, M, H) -->
    Category
    <ArmourType v-model="armour.category" />
    <!-- AC -->
    <SGInput v-model="armour.ac" label="AC" />
    <!-- Dex Cap -->
    <SGInput v-model="dexCapComputed" label="Dex Cap" />
    <!-- Check Penalty -->
    <SGInput v-model="armour.checkPenalty" label="Check Penalty" />
    <!-- Speed Penalty -->
    <SGInput v-model="armour.speedPenalty" label="Speed Penalty" />
    <!-- Strength Req -->
    <SGInput v-model="armour.strengthReq" label="Strength Requirement" />
    <!-- Level -->
    <SGInput v-model="armour.level" label="Level" />
    <!-- Bulk -->
    <SGInput v-model="armour.bulk" label="Bulk" />
    ---
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
  get: () => (armour.value.dexCap ? armour.value.dexCap : 0),
  set: (val: any) => {
    if (val === undefined || val === null) armour.value.dexCap = null
    else if (typeof val === 'number') armour.value.dexCap = val
  }
})
</script>
