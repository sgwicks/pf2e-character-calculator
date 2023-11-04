import { ref, reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useCharacterStore } from './character'

export const useMainStore = defineStore(
  'main',
  () => {
    const level = ref(0)

    function getProficiencyValue(prof: number) {
      return prof ? prof + level.value : 0
    }

    const characterClasses: CharacterClass[] = reactive([
      {
        name: 'alchemist',
        keySkill: ['intelligence']
      },
      {
        name: 'barbarian',
        keySkill: ['strength']
      },
      {
        name: 'bard',
        keySkill: ['charisma']
      },
      {
        name: 'champion',
        keySkill: ['strength', 'dexterity']
      },
      {
        name: 'cleric',
        keySkill: ['wisdom']
      },
      {
        name: 'druid',
        keySkill: ['wisdom']
      },
      {
        name: 'fighter',
        keySkill: ['strength', 'dexterity']
      },
      {
        name: 'investigator',
        keySkill: ['intelligence']
      },
      {
        name: 'magus',
        keySkill: ['strength', 'dexterity']
      },
      {
        name: 'monk',
        keySkill: ['strength', 'dexterity']
      },
      {
        name: 'oracle',
        keySkill: ['charisma']
      },
      {
        name: 'psychic',
        keySkill: ['intelligence', 'charisma']
      },
      {
        name: 'ranger',
        keySkill: ['strength', 'dexterity']
      },
      {
        name: 'rogue',
        keySkill: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
      },
      {
        name: 'sorceror',
        keySkill: ['charisma']
      },
      {
        name: 'summoner',
        keySkill: ['charisma']
      },
      {
        name: 'swashbuckler',
        keySkill: ['dexterity']
      },
      {
        name: 'thaumaturge',
        keySkill: ['charisma']
      },
      {
        name: 'witch',
        keySkill: ['intelligence']
      },
      {
        name: 'wizard',
        keySkill: ['intelligence']
      },
      {
        name: 'gunslinger',
        keySkill: ['dexterity']
      },
      {
        name: 'inventor',
        keySkill: ['intelligence']
      }
    ])

    const getClassKeySkill = () => {
      const characterStore = useCharacterStore()
      const { character } = storeToRefs(characterStore)
      if (!character.value) return 0
      return character.value.abilities[character.value.character_classes[0].ability_options[0]]
    }

    return {
      level,
      getProficiencyValue,
      characterClasses,
      getClassKeySkill
    }
  },
  { persist: true }
)
