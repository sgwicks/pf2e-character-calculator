<template>
  <section>
    <div style="width: 100%" class="flex">
      <h2 style="width: 50%">Shield</h2>
      <label>
        Raised?
        <SGCheckbox v-model="shield.raised" />
      </label>
    </div>
    <SGInput v-model="shield.ac" label="AC" />
    <SGInput v-model="shield.hardness" label="Hardness" />
    <SGInput v-model="shield.hp" label="Max HP" />
    <SGInput v-model="shield.bt" label="BT" />
    <SGInput v-model="shield.currentHp" label="Current HP" />
  </section>
</template>

<script setup lang="ts">
import SGInput from '@/components/form/SGInput.vue'
import SGCheckbox from '@/components/form/SGCheckbox.vue'

import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'
import SGSection from '../layout/SGSection.vue'
const equipmentStore = useEquipmentStore()

const { shield } = storeToRefs(equipmentStore)
</script>
