<template>
  <h3>Shield</h3>
  <SGInput v-model="shield.ac" label="AC" />
  <SGInput v-model="shield.hardness" label="Hardness" />
  <SGInput v-model="shield.hp" label="Max HP" />
  <SGInput v-model="shield.bt" label="BT" />
  <SGInput v-model="shield.currentHp" label="Current HP" />
  <label>
    Raised?
    <SGCheckbox v-model="shield.raised" />
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SGInput from '@/components/form/SGInput.vue'
import SGCheckbox from '@/components/form/SGCheckbox.vue'

import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'
const equipmentStore = useEquipmentStore()

const { shield } = storeToRefs(equipmentStore)
</script>
