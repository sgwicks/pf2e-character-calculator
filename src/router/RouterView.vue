<template>
  <NavBar @push="(path: string) => setComponent(path)" />
  <component :is="currentComponent" @push="(path: string) => setComponent(path)"></component>
</template>

<script setup lang="ts">
import { type Component, type Ref, onBeforeMount, shallowRef } from 'vue'
import NavBar from '@/sections/NavBar.vue'

// Router components
import Login from '@/pages/LoginPage.vue'
import CharacterSheet from '@/pages/CharacterSheet.vue'

const routes: { [k: string]: Component } = {
  '/': Login,
  '/login': Login,
  '/character': CharacterSheet
}

const currentComponent: Ref<Component> = shallowRef(Login)

const setComponent = (path: string) => {
  window.history.pushState(null, '', path)
  currentComponent.value = routes[path]
}

onBeforeMount(() => {
  setComponent(window.location.pathname)
})
</script>
