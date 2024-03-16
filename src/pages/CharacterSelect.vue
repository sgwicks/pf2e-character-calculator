<template>
  <div v-if="user && user.characters?.length">
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
import { useCharacterStore } from '@/stores/character'
import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'

const characterStore = useCharacterStore()

const userStore = useUserStore()
const { getUser, refreshUser } = userStore
const user = getUser()
onBeforeMount(async () => {
  characterStore.$reset()
  await refreshUser()
})
</script>
