import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore(
  'error',
  () => {
    const error: Ref<null | string> = ref(null)

    function $reset() {
      error.value = null
    }

    return { error, $reset }
  },
  { persist: true }
)
