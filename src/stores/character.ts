import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCharacterStore = defineStore(
  'character',
  () => {
    const character: Ref<Character | null> = ref(null)

    const getCharacter = () => character

    const setCharacter = (setCharacter: Character | null) => {
      character.value = setCharacter
    }

    return { character, getCharacter, setCharacter }
  },
  { persist: true }
)
