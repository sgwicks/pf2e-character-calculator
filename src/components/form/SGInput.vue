<template>
  <label ref="labelRef" :class="{ number: type === 'number' }">
    <span>{{ label }}</span>
    <input
      v-if="type === 'number'"
      v-model.number="value"
      type="number"
      :disabled="disabled"
      v-maska:[mask]
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
    <input
      v-else
      v-model="value"
      type="text"
      :disabled="disabled"
      v-maska:[mask]
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { vMaska, type MaskInputOptions } from 'maska'

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null
    label?: string
    disabled?: boolean
    mask?: MaskInputOptions
  }>(),
  {
    disabled: false
  }
)

const labelRef = ref<Element | null>(null)

defineExpose({ labelRef })

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const value = computed({
  get: () => (props.modelValue === null ? '' : props.modelValue),
  set: (val) => emit('update:modelValue', val)
})

const type = typeof props.modelValue === 'number' ? 'number' : 'text'
</script>

<style scoped lang="scss">
label {
  display: flex;
  flex-direction: column;
  margin: 0.5em 0.25em;
  text-transform: capitalize;
  justify-content: space-between;
  height: 4em;
  font-size: 0.8em;

  > span {
    font-weight: 600;
    white-space: nowrap;
    @media (max-width: 1279px) {
      overflow: hidden;
      text-overflow: '.';
    }
  }
}
</style>
