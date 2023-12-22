<template>
  <div class="searchable-input-wrapper">
    <SGInput
      ref="input"
      :model-value="queryStr"
      :label="label"
      :disabled="disabled"
      @update:model-value="handleQuery"
      @focus="() => fetchResults(modelValue.label)"
    />
    <ul v-if="results" ref="resultsList">
      <li v-for="result in results" :key="result.value" @click="() => select(result)">
        {{ result.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, onUnmounted } from 'vue'
import SGInput from './SGInput.vue'
import { debounce } from 'lodash'
import type { AxiosResponse } from 'axios'

const props = defineProps<{
  modelValue: Result
  label?: string
  disabled?: boolean
  query: (string: string) => Promise<AxiosResponse<any, any>>
}>()

const input = ref<InstanceType<typeof SGInput> | null>(null)
const resultsList = ref<Element | null>(null)

const emit = defineEmits(['update:modelValue', 'blur'])

const queryStr = ref<string>(props.modelValue.value)

// We need queryStr to react to modelValue changing, but still be a ref for local changes
const modelValueLabel = computed(() => props.modelValue.label)
watch(modelValueLabel, (val) => (queryStr.value = val))

const handleQuery = debounce((val: string) => {
  if (val.toLowerCase() === queryStr.value.toLowerCase()) return
  queryStr.value = val
  if (val.toLowerCase() === props.modelValue.label.toLowerCase()) return
  fetchResults(val)
}, 500)

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

const fetchResults = async (val: string) => {
  const response = await props.query(val)
  results.value = shapeResults(response.data.data)
}

const select = (result: Result) => {
  emit('update:modelValue', result)
  queryStr.value = result.label
}

const handleClickOutside = (e: MouseEvent) => {
  if (e.target instanceof Element && input.value?.labelRef === e.target.parentElement) {
    // The user is clicking on the input/label
    // Focus has fired and shows results
    // So don't immediately nullify those results
    return
  }
  results.value = null
  if (e.target instanceof Element && resultsList.value !== e.target.parentElement) {
    queryStr.value = props.modelValue.value
    emit('blur')
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
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
  z-index: 100;
}

li {
  cursor: pointer;
  padding: 0 8px;

  &:hover {
    background-color: aquamarine;
  }
}
</style>
