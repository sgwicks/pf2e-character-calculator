import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const level = ref(0)

  function getProficiencyValue(prof: number) {
    return prof ? prof + level.value : 0
  }

  return {
    level,
    getProficiencyValue
  }
})
