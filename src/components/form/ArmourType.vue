<template>
  <fieldset class="flex column space-between">
    <legend>Category</legend>
    <label class="flex space-between">
      Unarmoured
      <input v-model="equipped" name="equipped" type="radio" value="U" />
    </label>
    <label class="flex space-between">
      Light
      <input v-model="equipped" name="equipped" type="radio" value="L" />
    </label>
    <label class="flex space-between">
      Medium
      <input v-model="equipped" name="equipped" type="radio" value="M" />
    </label>
    <label class="flex space-between">
      Heavy
      <input v-model="equipped" name="equipped" type="radio" value="H" />
    </label>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue: ArmourCategory
}>()

const emit = defineEmits(['update:modelValue'])

const equipped = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
