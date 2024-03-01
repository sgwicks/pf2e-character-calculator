<template>
  <main>
    <div class="actions-extras-wrapper">
      <ActionsExplainer />
      <ClassDC class="flex wrap align-start" />
    </div>
    <ActionList />
  </main>
</template>

<script setup lang="ts">
import ActionsExplainer from '@/components/ActionsExplainer.vue'
import ActionList from '@/sections/ActionList.vue'
import ClassDC from '@/sections/ClassDC.vue'
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
