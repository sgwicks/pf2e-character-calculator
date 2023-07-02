import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

interface Attributes {
  strength: {
    value: number
    modifier: number
  }
  dexterity: {
    value: number
    modifier: number
  }
  constitution: {
    value: number
    modifier: number
  }
  intelligence: {
    value: number
    modifier: number
  }
  wisdom: {
    value: number
    modifier: number
  }
  charisma: {
    value: number
    modifier: number
  }
}

interface Skill {
  attribute: string
  proficiency: number
  item: number
  armour: number
}

export const useStore = defineStore('store', () => {
  const level = ref(0)

  const attributes = reactive<Attributes>({
    strength: {
      value: 10,
      modifier: 0
    },
    dexterity: {
      value: 10,
      modifier: 0
    },
    constitution: {
      value: 10,
      modifier: 0
    },
    intelligence: {
      value: 10,
      modifier: 0
    },
    wisdom: {
      value: 10,
      modifier: 0
    },
    charisma: {
      value: 10,
      modifier: 0
    }
  })

  function getAttributeModifier(attr: string) {
    switch (attr) {
      case 'strength':
      case 'dexterity':
      case 'constitution':
      case 'intelligence':
      case 'wisdom':
      case 'charisma':
        return attributes[attr].modifier
      default:
        return 0
    }
  }

  function setAttribute(attr: string, val: number) {
    switch (attr) {
      case 'strength':
      case 'dexterity':
      case 'constitution':
      case 'intelligence':
      case 'wisdom':
      case 'charisma':
        attributes[attr].value = val
        attributes[attr].modifier = Math.floor((val - 10) / 2)
    }
  }

  const skills = reactive<{ [k: string]: Skill }>({
    acrobatics: {
      attribute: 'dexterity',
      proficiency: 0,
      item: 0,
      armour: 0
    }
  })

  function getSkillValue(name: string | number) {
    const skill: Skill = skills[name]
    if (!skill) return 0
    const { attribute, proficiency, item, armour } = skill
    const addLevel = proficiency ? level.value : 0
    return getAttributeModifier(attribute) + addLevel + proficiency + item + armour
  }

  function setSkillProficiency(name: string | number, val: number) {
    skills[name].proficiency = val
  }

  function setSkillItem(name: string | number, val: number) {
    skills[name].item = val
  }

  return {
    level,
    attributes,
    getAttributeModifier,
    setAttribute,
    skills,
    getSkillValue,
    setSkillProficiency,
    setSkillItem
  }
})
