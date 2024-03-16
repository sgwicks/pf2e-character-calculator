<template></template>

<script lang="ts" setup>
import { useCharacterStore } from '@/stores/character'
import { useUserStore } from '@/stores/user'
import { useErrorStore } from '@/stores/error'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()
const characterStore = useCharacterStore()
const errorStore = useErrorStore()

onBeforeMount(() => {
  userStore.$reset()
  characterStore.$reset()
  errorStore.$reset()
  router.push('/')
})
</script>
