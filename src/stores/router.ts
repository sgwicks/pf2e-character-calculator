import { type Component, type Ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

// Router components
import Login from '@/pages/LoginPage.vue'
import CharacterSelect from '@/pages/CharacterSelect.vue'
import CharacterSheet from '@/pages/CharacterSheet.vue'

export const useRouterStore = defineStore(
  'router',
  () => {
    const routes: { [k: string]: Component } = {
      '/': Login,
      '/login': Login,
      '/character-select': CharacterSelect,
      '/character': CharacterSheet
    }

    const currentComponent: Ref<Component> = shallowRef(Login)

    const setComponent = (path: string) => {
      window.history.pushState(null, '', path)
      currentComponent.value = routes[path]
    }

    return {
      currentComponent,
      setComponent
    }
  },
  { persist: true }
)
