import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useMainStore } from './main'
import { useAttributeStore } from './attribute'

interface Skill {
  attribute: string
  proficiency: number
  item: number
  armour: number
}

const emptySkill = {
  attribute: '',
  proficiency: 0,
  item: 0,
  armour: 0
}

export const useSkillStore = defineStore('skill', () => {
  const skills = reactive<{ [k: string]: Skill }>({
    acrobatics: {
      ...emptySkill,
      attribute: 'dexterity'
    },
    arcana: {
      ...emptySkill,
      attribute: 'intelligence'
    },
    athletics: {
      ...emptySkill,
      attribute: 'strength'
    },
    crafting: {
      ...emptySkill,
      attribute: 'intelligence'
    },
    deception: {
      ...emptySkill,
      attribute: 'charisma'
    },
    diplomacy: {
      ...emptySkill,
      attribute: 'charisma'
    },
    intimidation: {
      ...emptySkill,
      attribute: 'charisma'
    },
    lore_1: {
      ...emptySkill,
      attribute: 'intelligence'
    },
    lore_2: {
      ...emptySkill,
      attribute: 'intelligence'
    },

    medicine: {
      ...emptySkill,
      attribute: 'wisdom'
    },
    nature: {
      ...emptySkill,
      attribute: 'wisdom'
    },
    occultism: {
      ...emptySkill,
      attribute: 'intelligence'
    },
    performance: {
      ...emptySkill,
      attribute: 'charisma'
    },
    religion: {
      ...emptySkill,
      attribute: 'wisdom'
    },
    society: {
      ...emptySkill,
      attribute: 'intelligence'
    },
    stealth: {
      ...emptySkill,
      attribute: 'dexterity'
    },
    survival: {
      ...emptySkill,
      attribute: 'wisdom'
    },
    thievery: {
      ...emptySkill,
      attribute: 'dexterity'
    }
  })

  function getSkillValue(name: string | number) {
    const { getAttributeModifier } = useAttributeStore()
    const { getProficiencyValue } = useMainStore()
    const skill: Skill = skills[name]
    if (!skill) return 0
    const { attribute, proficiency, item, armour } = skill

    return getAttributeModifier(attribute) + getProficiencyValue(proficiency) + item + armour
  }

  function setSkillProficiency(name: string | number, val: number) {
    skills[name].proficiency = val
  }

  function setSkillItem(name: string | number, val: number) {
    skills[name].item = val
  }

  return {
    skills,
    getSkillValue,
    setSkillProficiency,
    setSkillItem
  }
})
