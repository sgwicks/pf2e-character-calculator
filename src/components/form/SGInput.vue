<template>
  <label>
    {{ label }}
    <input v-if="type === 'number'" v-model.number="value" type="number" />
    <input v-else v-model="value" type="text" />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string | number
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const type = typeof props.modelValue === 'number' ? 'number' : 'text'
</script>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>
