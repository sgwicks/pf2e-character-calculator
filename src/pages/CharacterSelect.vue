<template>
  <div v-if="user && user.characters.length">
    <RouterLink
      v-for="character in user.characters"
      :key="character.id"
      :to="`/character/${character.id}`"
      class="router-button margin-y-sm"
    >
      {{ character.name }}
    </RouterLink>
  </div>
  <RouterLink to="/character/new" class="router-button margin-y-sm">
    Create new character
  </RouterLink>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const { getUser } = userStore
const user = getUser()
</script>
