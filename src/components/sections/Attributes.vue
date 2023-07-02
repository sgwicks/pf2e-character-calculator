<template>
  <SGSection title="Attributes">
    <div class="attributes">
      <template v-for="(attribute, key) in attributes">
        <SGInput
          :model-value="attribute.value"
          :label="key"
          @update:model-value="(val) => setAttribute(key, val)"
        />
        <SGInput
          :model-value="`${attribute.modifier >= 0 ? '+' : ''}${attribute.modifier}`"
          label="Modifier"
          disabled
        />
      </template>
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '../layout/SGSection.vue'
import SGInput from '../form/SGInput.vue'
import { useAttributeStore } from '@/stores/attributes'

const { attributes, setAttribute } = useAttributeStore()
</script>

<style scoped>
.attributes {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
}

.modifier {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
}
</style>
