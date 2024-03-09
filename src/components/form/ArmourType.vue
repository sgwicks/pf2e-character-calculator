<template>
  <fieldset class="grid columns-4">
    <legend>Category</legend>
    <label for="unarmour"> Unarmoured </label>
    <input v-model="equipped" name="unarmourf" type="radio" value="U" disabled />
    <label for="light"> Light </label>
    <input v-model="equipped" name="light" type="radio" value="L" disabled />
    <label for="medium"> Medium </label>
    <input v-model="equipped" name="medium" type="radio" value="M" disabled />
    <label for="heavy"> Heavy </label>
    <input v-model="equipped" name="heavy" type="radio" value="H" disabled />
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
