import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useCharacterStore } from './character'

export const useMainStore = defineStore(
  'main',
  () => {
    const level = ref(0)

    function getProficiencyValue(prof: number) {
      return prof ? prof + level.value : 0
    }

    const getClassKeySkill = () => {
      const characterStore = useCharacterStore()
      const { character } = storeToRefs(characterStore)
      if (!character.value) return 0
      return character.value.abilities[character.value.character_classes[0].ability_options[0]]
    }

    return {
      level,
      getProficiencyValue,
      getClassKeySkill
    }
  },
  { persist: true }
)
