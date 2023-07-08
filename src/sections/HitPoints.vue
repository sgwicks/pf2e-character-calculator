<template>
  <SGSection title="Health">
    <SGInput v-model="hp.max" label="Max" />
    <SGInput v-model="hp.current" label="Current" />
    <SGInput v-model="hp.temporary" label="Temp" />
    <SGInput v-model="hp.dying" label="Dying" />
    <SGInput v-model="hp.wounded" label="Wounded" />
    <div style="width: 100%">
      <SGInput v-model="hp.resistances" label="Resistances" />
      <SGInput v-model="hp.immunities" label="Immunites" />
      <SGInput v-model="hp.conditions" label="Conditions" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'

const hp = reactive({
  max: 0,
  current: 0,
  temporary: 0,
  dying: 0,
  wounded: 0,
  resistances: '',
  immunities: '',
  conditions: ''
})
</script>
