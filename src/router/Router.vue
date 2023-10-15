<script setup lang="ts">
import Login from '@/pages/Login.vue'
import CharacterSheet from '@/pages/CharacterSheet.vue'
import { type Component, type Ref, onBeforeMount, shallowRef } from 'vue';

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

<template>
  <component :is="currentComponent" @push="(path: string) => setComponent(path)"></component>
</template>
