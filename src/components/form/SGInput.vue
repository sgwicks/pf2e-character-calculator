<template>
  <label ref="labelRef" :class="{ number: type === 'number' }">
    <span>{{ label }}</span>
    <input
      v-if="type === 'number'"
      v-model.number.lazy="value"
      :class="{ loading }"
      type="number"
      :disabled="disabled || loading"
      v-maska:[mask]
      @focus="emit('focus')"
      @blur="emit('blur')"
    />
    <input
      v-else
      v-model.lazy.trim="value"
      :class="{ loading }"
      :type="password ? 'password' : 'text'"
      :disabled="disabled || loading"
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
    loading?: boolean
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

<style lang="scss" scoped>
@keyframes loading {
  from {
    background-color: hsl(200, 20%, 95%);
    border-color: hsl(200, 20%, 95%);
  }
  to {
    background-color: hsl(200, 20%, 85%);
    border-color: hsl(200, 20%, 85%);
  }
}

.loading {
  animation: loading 1.3s ease-in-out infinite alternate;
  border-style: solid;
}
</style>
