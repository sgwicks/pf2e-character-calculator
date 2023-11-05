import { computed, ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from 'lodash'

const baseAttributes: Character['abilities'] = {
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0
}

export const useCharacterStore = defineStore(
  'character',
  () => {
    const character: Ref<Character | null> = ref(null)

    const abilities = computed<Character['abilities']>({
      get: () => character.value?.abilities || baseAttributes,
      set: (val: Character['abilities']) => {
        if (!character.value) return
        character.value.abilities = val
      }
    })

    const getCharacter = () => character

    const setCharacter = (setCharacter: Character | null) => {
      character.value = setCharacter
    }

    // When we update character, update the API after 3 seconds
    const save = debounce(() => {
      console.log('saving')
    }, 3000)

    watch(character, save, { deep: true })

    return {
      character,
      abilities,
      getCharacter,
      setCharacter
    }
  },
  { persist: true }
)
