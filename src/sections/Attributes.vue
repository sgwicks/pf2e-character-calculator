<template>
  <SGSection title="Attributes">
    <div class="attributes">
      <template v-for="(attribute, key) in store.attributes">
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
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import { useAttributeStore } from '@/stores/attribute'

const store = useAttributeStore()
const { setAttribute } = store
</script>

<style scoped>
.attributes {
  display: grid;
  grid-template-columns: 75px 50px;
  gap: 10px;
}
</style>
