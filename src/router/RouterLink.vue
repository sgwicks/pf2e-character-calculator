<template>
  <button @click="push">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { useRouterStore } from '@/stores/router'

const routerStore = useRouterStore()
const { setComponent } = routerStore

const props = defineProps(['to'])

const push = () => {
  setComponent(props.to)
}
</script>
