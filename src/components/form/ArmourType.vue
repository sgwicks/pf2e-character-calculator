<template>
  <fieldset>
    <legend>Category</legend>
    <label>
      U
      <input v-model="equipped" name="equipped" type="radio" value="U" />
    </label>
    <label>
      L
      <input v-model="equipped" name="equipped" type="radio" value="L" />
    </label>
    <label>
      M
      <input v-model="equipped" name="equipped" type="radio" value="M" />
    </label>
    <label>
      H
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
