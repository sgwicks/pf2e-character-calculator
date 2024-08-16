<template>
  <label ref="labelRef" :class="{ number: type === 'number' }">
    <span>{{ label }}</span>
    <input
      v-if="type === 'number'"
      v-model.number.lazy="value"
      type="number"
      :disabled="disabled"
      v-maska:[mask]
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
    <input
      v-else
      v-model.lazy.trim="value"
      :type="password ? 'password' : 'text'"
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
    password?: boolean
  }>(),
  {
    disabled: false,
    password: false
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
