<template>
  <SGSection title="Spells">
    <Action :action-id="0" is-spell />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import Action from '@/components/Action.vue'
</script>
