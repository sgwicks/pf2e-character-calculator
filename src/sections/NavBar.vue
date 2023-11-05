<template>
  <header class="full-width flex justify-end">
    <RouterLink v-if="user" to="/" @click="logout">Logout</RouterLink>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const { getUser, setUser } = userStore

const user = getUser()

const logout = async () => {
  await setUser(null)
}
</script>
