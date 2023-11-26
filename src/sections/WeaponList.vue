<template>
  <SGSection title="Weapons">
    <h3>Proficiencies</h3>
    <div class="flex">
      <label>
        Simple
        <ProficiencyLevel v-model="weaponProficiencies.S" />
      </label>
      <label>
        Martial
        <ProficiencyLevel v-model="weaponProficiencies.M" />
      </label>
    </div>
    <Weapon v-for="(weapon, i) in weapons" :key="`weapon-${i}`" :weapon="weapon" />
  </SGSection>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import SGSection from '@/components/layout/SGSection.vue'
import Weapon from '@/components/equipment/Weapon.vue'
import { useEquipmentStore } from '@/stores/equipment'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'

const equipmentStore = useEquipmentStore()
const { weapons, weaponProficiencies } = storeToRefs(equipmentStore)
</script>
