<template>
  <main>
    <SpellDC class="actions-extras-wrapper" />
    <SpellList />
  </main>
</template>

<script setup lang="ts">
import SpellList from '@/sections/SpellList.vue'
import SpellDC from '@/sections/SpellDC.vue'
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
}

section {
  flex-grow: 1;
}

.actions-extras-wrapper {
  display: flex;

  @media (max-width: 1279px) {
    flex-direction: column;
  }
}
</style>
