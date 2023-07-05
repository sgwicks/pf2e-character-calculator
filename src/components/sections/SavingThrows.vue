<template>
  <SGSection title="Saving Throws">
    <SavingThrow title="Fortitude" attribute="constitution" />
    <SavingThrow title="Reflex" attribute="dexterity" />
    <SavingThrow title="Will" attribute="wisdom" />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '../layout/SGSection.vue'
import SavingThrow from './SavingThrow.vue'
</script>
