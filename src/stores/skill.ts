import { reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useMainStore } from './main'
import { useAttributeStore } from './attribute'
import { useEquipmentStore } from './equipment'

interface Skill {
  attribute: string
  proficiency: number
  item: number
  armour: boolean
}

const emptySkill = {
  attribute: '',
  proficiency: 0,
  item: 0,
  armour: false
}

export const useSkillStore = defineStore(
  'skill',
  () => {
    const skills = reactive<{ [k: string]: Skill }>({
      acrobatics: {
        ...emptySkill,
        attribute: 'dexterity',
        armour: true
      },
      arcana: {
        ...emptySkill,
        attribute: 'intelligence'
      },
      athletics: {
        ...emptySkill,
        attribute: 'strength',
        armour: true
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
        attribute: 'dexterity',
        armour: true
      },
      survival: {
        ...emptySkill,
        attribute: 'wisdom'
      },
      thievery: {
        ...emptySkill,
        attribute: 'dexterity',
        armour: true
      }
    })

    function getSkillValue(name: string | number) {
      const { getAttributeModifier } = useAttributeStore()
      const { getProficiencyValue } = useMainStore()
      const equipmentStore = useEquipmentStore()
      const { getArmourCheckPenalty } = storeToRefs(equipmentStore)
      const skill: Skill = skills[name]
      if (!skill) return 0
      const { attribute, proficiency, item } = skill

      return (
        getAttributeModifier(attribute) +
        getProficiencyValue(proficiency) +
        item +
        getArmourCheckPenalty.value
      )
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
  },
  { persist: true }
)
