<template>
  <NavBar />
  <RouterView />
</template>

<script setup lang="ts">
import NavBar from '@/sections/NavBar.vue'
import { RouterView, useRouter } from 'vue-router'

import { globalRouter } from './routes/globalRouter'

const router = useRouter()
globalRouter.router = router
</script>

<style scoped></style>
