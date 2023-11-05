import { computed, ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep, debounce, isEqual } from 'lodash'
import { fetchCharacter, patchCharacter } from '@/api/character'

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
    // This is the character we're mutating
    const character: Ref<Character | null> = ref(null)
    // This is whatever the last call to the API produced for comparison
    const prevCharacter: Ref<Character | null> = ref(null)

    const abilities = computed<Character['abilities']>({
      get: () => character.value?.abilities || baseAttributes,
      set: (val: Character['abilities']) => {
        if (!character.value) return
        character.value.abilities = val
      }
    })

    // When we update character, update the API after 3 seconds
    const save = debounce(async (val) => {
      if (isEqual(val, prevCharacter.value)) return

      try {
        console.log('saving')
        const updatedCharacter = await patchCharacter(val.id, val)
        character.value = cloneDeep(updatedCharacter.data.data)
        prevCharacter.value = cloneDeep(updatedCharacter.data.data)
      } catch (err) {
        console.error(err)
      }
    }, 3000)

    const syncApiCharacterDown = async (id: number) => {
      const response = await fetchCharacter(id)
      character.value = cloneDeep(response.data.data)
      prevCharacter.value = cloneDeep(response.data.data)
    }

    watch(character, save, { deep: true })

    return {
      character,
      abilities,
      syncApiCharacterDown
    }
  },
  { persist: true }
)
