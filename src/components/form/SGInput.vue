<template>
  <label>
    {{ label }}
    <input v-model="value" />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>
