<template>
  <header class="full-width flex justify-end">
    <button v-if="user" @click="logout">Logout</button>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { getUser, setUser } = userStore

const user = getUser()

const emit = defineEmits(['push'])

const logout = async () => {
  await setUser(null)
  emit('push', '/')
}
</script>
