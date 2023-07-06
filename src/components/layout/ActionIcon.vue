<template>
  <div class="action-icon-wrapper" :style="{ '--size': `${size}px` }">
    <img :src="src" />
  </div>
</template>

<script setup lang="ts">
import action_0 from '@/assets/action_0.png'
import action_1 from '@/assets/action_1.png'
import action_2 from '@/assets/action_2.png'
import action_3 from '@/assets/action_3.png'
import action_r from '@/assets/action_r.png'
import { computed } from 'vue'

const props = defineProps<{
  action: Action
  size: number
}>()

const src = computed(() => {
  switch (props.action) {
    case 'bonus':
      return action_0
    case 'single':
      return action_1
    case 'double':
      return action_2
    case 'triple':
      return action_3
    case 'reaction':
      return action_r
  }
})
</script>

<style scoped>
.action-icon-wrapper {
  height: var(--size);
  width: var(--size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 4px 4px 2px 0;
}

img {
  width: 100%;
  max-height: 100%;
}
</style>
