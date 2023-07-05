import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAttributeStore } from './attribute'

export const useMainStore = defineStore('main', () => {
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

  const character = ref({
    name: '',
    ancestry: '',
    background: '',
    class: {
      name: '',
      keySkill: ''
    },
    size: '',
    alignment: '',
    traits: '',
    deity: ''
  })

  const getClassKeySkill = () => {
    const { getAttributeModifier } = useAttributeStore()
    return getAttributeModifier(character.value.class.keySkill)
  }

  return {
    level,
    getProficiencyValue,
    characterClasses,
    character,
    getClassKeySkill
  }
})
