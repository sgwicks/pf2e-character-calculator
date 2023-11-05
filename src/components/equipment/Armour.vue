<template>
  <SGSection title="Armour">
    <div class="armour">
      <div class="flex wrap">
        <SGInput v-model="armour.name" label="Armour" style="width: 60%" />
        <!-- AC -->
        <SGInput v-model="armour.ac" label="AC" />
        <!-- Dex Cap -->
        <SGInput v-model="dexCapComputed" label="Dex Cap" class="number-input" />
        <!-- Strength Req -->
        <SGInput v-model="armour.strengthReq" label="Strength Required" />
        <!-- Check Penalty -->
        <SGInput v-model="armour.checkPenalty" label="Check Penalty" />
        <!-- Speed Penalty -->
        <SGInput v-model="armour.speedPenalty" label="Speed Penalty" />
      </div>
      <!-- Category (U, L, M, H) -->
      <ArmourType v-model="armour.category" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ArmourType from '@/components/form/ArmourType.vue'
import { computed } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'

const equipmentStore = useEquipmentStore()
const { armour } = storeToRefs(equipmentStore)

const dexCapComputed = computed({
  get: () => (armour.value.dexCap === null ? null : armour.value.dexCap),
  set: (val: any) => {
    if (val === undefined || val === null || val === '') armour.value.dexCap = null
    else armour.value.dexCap = Number(val)
  }
})
</script>

<style lang="scss" scoped>
.armour {
  display: grid;
  grid-template-columns: 4fr 2fr;
}
</style>
