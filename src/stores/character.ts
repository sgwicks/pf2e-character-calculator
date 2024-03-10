import { computed, ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep, debounce, isEqual } from 'lodash'
import { fetchCharacter, patchCharacter } from '@/api/character'
import type { AxiosResponse } from 'axios'
import constants from '@/contstants'

const baseAttributes: Character['abilities'] = {
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0
}

const baseSavingThrows: Character['saving_throws'] = {
  fortitude: 0,
  reflex: 0,
  will: 0
}

const basePerception: Character['perception'] = {
  proficiency: 0,
  item: 0,
  senses: []
}

const baseMovement: Character['movement'] = {
  base: 0,
  burrow: 0,
  climb: 0,
  fly: 0,
  swim: 0
}

const baseHealth: Character['health'] = {
  max: 0,
  current: 0,
  temporary: 0,
  dying: 0,
  wounded: 0,
  resistances: [],
  weaknesses: [],
  immunities: [],
  conditions: []
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
        character.value.abilities = cloneDeep(val)
      }
    })

    const savingThrows = computed<Character['saving_throws']>(
      () => character.value?.saving_throws || baseSavingThrows
    )

    const perception = computed<Character['perception']>(
      () => character.value?.perception || basePerception
    )

    const movement = computed<Character['movement']>(
      () => character.value?.movement || baseMovement
    )

    const health = computed<Character['health']>(() => character.value?.health || baseHealth)

    const skills = computed<Character['skills']>(() => character.value?.skills || [])

    const level = computed(() => {
      if (!character.value) return 0
      return character.value.character_classes.reduce((acc, character_class) => {
        return (acc += character_class.level)
      }, 0)
    })

    function getProficiencyValue(prof: number) {
      return prof ? prof + level.value : 0
    }

    function getClassKeySkill(index: number) {
      if (!character.value) return 0
      return character.value.abilities[character.value.character_classes[index].ability_options[0]]
    }

    // When we update character, update the API after 3 seconds
    const save = debounce(async (val) => {
      if (isEqual(val, prevCharacter.value)) return

      try {
        const updatedCharacter = await patchCharacter(val.id, val)
        character.value = cloneDeep(updatedCharacter.data.data)
        prevCharacter.value = cloneDeep(updatedCharacter.data.data)
      } catch (err) {
        console.error(err)
      }
    }, constants.AUTOSAVE_INTERVAL)

    watch(character, save, { deep: true })

    const syncApiCharacterDown = debounce(async (id: number) => {
      const response = await fetchCharacter(id)
      character.value = cloneDeep(response.data.data)
      prevCharacter.value = cloneDeep(response.data.data)
    }, constants.AUTOSAVE_INTERVAL)

    function createHandleUpdate<T>(
      patch: (character_id: number, params: Partial<T>) => Promise<AxiosResponse<any, any>>
    ) {
      return debounce(async (params: Partial<T>) => {
        if (!character.value) return
        await patch(character.value.id, params)
        syncApiCharacterDown(character.value.id)
      }, constants.AUTOSAVE_INTERVAL)
    }

    return {
      character,
      abilities,
      savingThrows,
      perception,
      movement,
      health,
      skills,
      level,
      getProficiencyValue,
      getClassKeySkill,
      syncApiCharacterDown,
      createHandleUpdate
    }
  },
  { persist: true }
)
