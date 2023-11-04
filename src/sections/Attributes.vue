<template>
  <SGSection title="Attributes">
    <div class="flex column">
      <template v-for="(attribute, key) in props.attributes" :key="key">
        <SGInput :model-value="attribute" :label="key" disabled />
      </template>
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'

const props = defineProps<{
  attributes: Character['abilities']
}>()
</script>
