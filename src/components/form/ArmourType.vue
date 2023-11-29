<template>
  <fieldset class="flex column space-between">
    <legend>Category</legend>
    <label class="flex space-between">
      Unarmoured
      <input v-model="equipped" name="equipped" type="radio" value="U" disabled />
    </label>
    <label class="flex space-between">
      Light
      <input v-model="equipped" name="equipped" type="radio" value="L" disabled />
    </label>
    <label class="flex space-between">
      Medium
      <input v-model="equipped" name="equipped" type="radio" value="M" disabled />
    </label>
    <label class="flex space-between">
      Heavy
      <input v-model="equipped" name="equipped" type="radio" value="H" disabled />
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: ArmourCategory
}>()

const emit = defineEmits(['update:modelValue'])

const equipped = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
