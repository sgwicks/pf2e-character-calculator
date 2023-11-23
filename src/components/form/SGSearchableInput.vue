<template>
  <div class="searchable-input-wrapper">
    <SGInput :model-value="modelValue.label" @update:model-value="handleQuery" :label="label" />
    <ul v-if="results">
      <li v-for="result in results" :key="result.value" @click="() => select(result)">
        {{ result.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SGInput from './SGInput.vue'
import { fetchArmours } from '@/api/armour'

const props = defineProps<{
  modelValue: Result
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const query = ref<string>('')

const handleQuery = (val: string) => {
  if (val.toLowerCase() === props.modelValue.label.toLowerCase()) return
  query.value = val
}

const results = ref<Result[] | null>(null)

const shapeResults = (data: Record<string, any>[]): Result[] => {
  return data.map((item) => {
    return {
      id: item.id,
      label: item.name,
      value: item.name
    }
  })
}

watch(query, async (val) => {
  if (val.length < 3) return
  const response = await fetchArmours(val)
  results.value = shapeResults(response.data.data)
})

const select = (result: Result) => {
  results.value = null
  query.value = ''
  emit('update:modelValue', result)
}
</script>

<style>
.searchable-input-wrapper {
  position: relative;
}

ul {
  position: absolute;
  background-color: white;
  border: 1px solid black;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 8px 0;
}

li {
  cursor: pointer;
  padding: 0 8px;

  &:hover {
    background-color: aquamarine;
  }
}
</style>
