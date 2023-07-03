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

const emptySkill = {
  attribute: '',
  proficiency: 0,
  item: 0,
  armour: 0
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

  function getProficiencyValue(prof: number) {
    return prof ? prof + level.value : 0
  }

  function getSkillValue(name: string | number) {
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
    level,
    attributes,
    getAttributeModifier,
    setAttribute,
    skills,
    getProficiencyValue,
    getSkillValue,
    setSkillProficiency,
    setSkillItem
  }
})
