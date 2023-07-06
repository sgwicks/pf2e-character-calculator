<template>
  <SGSection title="Health">
    <SGInput v-for="(value, key) in hp" v-model="hp[key]" :label="key" />
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
