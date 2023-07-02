<template>
  <label>
    {{ label }}
    <input v-if="type === 'number'" v-model.number="value" type="number" :disabled="disabled" />
    <input v-else v-model="value" type="text" :disabled="disabled" />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    label?: string
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)

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
  text-transform: capitalize;
}
</style>
