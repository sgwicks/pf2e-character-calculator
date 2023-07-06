<template>
  <SGSection title="Action">
    <div><ActionIcon :size="16" action="bonus" /> Bonus</div>
    <div><ActionIcon :size="16" action="single" /> Single</div>
    <div><ActionIcon :size="16" action="double" /> Double</div>
    <div><ActionIcon :size="16" action="triple" /> Triple</div>
    <div><ActionIcon :size="16" action="reaction" /> Reaction</div>
  </SGSection>
</template>

<script setup lang="ts">
import ActionIcon from './layout/ActionIcon.vue'
import SGSection from './layout/SGSection.vue'
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  line-height: 15px;
}
</style>
