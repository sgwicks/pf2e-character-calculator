<template>
  <SGSection title="Attributes">
    <div class="attributes">
      <template v-for="(attribute, key) in attributes">
        <SGInput
          :model-value="attributes[key].value"
          :label="key"
          @update:model-value="(val) => setAttribute(key, val)"
        />
        <div>{{ key.slice(0, 3) }} modifier: {{ attributes[key].modifier }}</div>
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
</style>
