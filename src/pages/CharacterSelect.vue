<template>
  <div v-if="user && user.characters.length">
    <RouterLink v-for="character in user.characters" :key="character.id" to="/character">
      {{ character.name }}
    </RouterLink>
  </div>
  <div v-else>Create new character</div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import RouterLink from '@/router/RouterLink.vue'

const userStore = useUserStore()
const { getUser } = userStore
const user = getUser()
</script>
