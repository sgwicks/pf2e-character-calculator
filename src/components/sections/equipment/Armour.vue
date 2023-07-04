<template>
  <SGSection title="Armour">
    <SGInput v-model="name" label="Armour" />
    <!-- Category (U, L, M, H) -->
    <!-- AC -->
    <!-- Dex Cap -->
    <!-- Check Penalty -->
    <!-- Speed Penalty -->
    <!-- Strength Req -->
    <!-- Level -->
    <!-- Bulk -->
    <!-- Group -->
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import { ref } from 'vue'

const name = ref('')
</script>
