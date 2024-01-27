<template>
  <SGSection>
    <SavingThrow title="fortitude" attribute="constitution" />
    <SavingThrow title="reflex" attribute="dexterity" />
    <SavingThrow title="will" attribute="wisdom" />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SavingThrow from '@/components/SavingThrow.vue'
</script>
