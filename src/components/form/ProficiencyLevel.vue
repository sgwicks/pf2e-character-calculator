<template>
  <table>
    <tr style="background-color: blueviolet">
      <td>T</td>
      <td>E</td>
      <td>M</td>
      <td>L</td>
    </tr>
    <tr>
      <td><SGCheckbox v-model="trained" /></td>
      <td><SGCheckbox v-model="expert" /></td>
      <td><SGCheckbox v-model="master" /></td>
      <td><SGCheckbox v-model="legendary" /></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SGCheckbox from './SGCheckbox.vue'

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits(['update:modelValue'])

const trained = computed({
  get: () => props.modelValue >= 2,
  set: (val) => (val ? emit('update:modelValue', 2) : emit('update:modelValue', 0))
})

const expert = computed({
  get: () => props.modelValue >= 4,
  set: (val) => (val ? emit('update:modelValue', 4) : emit('update:modelValue', 2))
})

const master = computed({
  get: () => props.modelValue >= 6,
  set: (val) => (val ? emit('update:modelValue', 6) : emit('update:modelValue', 4))
})

const legendary = computed({
  get: () => props.modelValue >= 8,
  set: (val) => (val ? emit('update:modelValue', 8) : emit('update:modelValue', 6))
})
</script>

<style scoped></style>
