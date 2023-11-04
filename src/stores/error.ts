import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore(
  'error',
  () => {
    const error: Ref<null | string> = ref(null)

    return { error }
  },
  { persist: true }
)
