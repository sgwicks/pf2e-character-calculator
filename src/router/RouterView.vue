<template>
  <NavBar />
  <component :is="currentComponent"></component>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import NavBar from '@/sections/NavBar.vue'
import { useRouterStore } from '@/stores/router'
import { storeToRefs } from 'pinia'

const routerStore = useRouterStore()
const { setComponent } = routerStore
const { currentComponent } = storeToRefs(routerStore)

onBeforeMount(() => {
  setComponent(window.location.pathname)
})
</script>
