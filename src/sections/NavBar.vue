<template>
  <header v-if="user" class="full-width flex space-between">
    <div v-if="character" class="tabs" style="color: black">
      <RouterLink :to="`/character/${character.id}/`">Home</RouterLink>
      &nbsp; | &nbsp;
      <RouterLink :to="`/character/${character.id}/attributes`">Attributes</RouterLink>
      &nbsp;|&nbsp;
      <RouterLink :to="`/character/${character.id}/equipment`">Equipment</RouterLink>
      &nbsp;|&nbsp;
      <RouterLink :to="`/character/${character.id}/skills`">Skills</RouterLink>
      &nbsp;|&nbsp;
      <RouterLink :to="`/character/${character.id}/feats`">Feats</RouterLink>
      &nbsp;|&nbsp;
      <RouterLink :to="`/character/${character.id}/actions`">Actions</RouterLink>
      &nbsp;|&nbsp;
      <RouterLink :to="`/character/${character.id}/Spells`">Spells</RouterLink>
    </div>
    <RouterLink to="/logout" @click="logout">Logout</RouterLink>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useCharacterStore } from '@/stores/character'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { logout } from '@/api/auth'

const userStore = useUserStore()
const { getUser } = userStore

const characterStore = useCharacterStore()
const { character } = storeToRefs(characterStore)

const user = getUser()
</script>
