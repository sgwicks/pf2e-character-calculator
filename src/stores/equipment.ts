import { computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useCharacterStore } from './character'

const emptyWeapon: Weapon = {
  id: 0,
  name: '',
  category: 'S',
  range: 5,
  damage_die_type: 4,
  damage_die_amount: 1,
  damage_type: 'B',
  reload: 0,
  hands: 1,
  price: 0,
  bulk: 0,
  group: 'club',
  traits: [],
  hardness: 0,
  max_hp: 0,
  break_threshold: 0
}

const emptyArmour: Armour = {
  id: 0,
  name: '',
  category: 'U',
  armour_class: 0,
  dex_cap: null,
  check_penalty: 0,
  speed_penalty: 0,
  strength: 0,
  bulk: 0,
  group: null,
  price: 0,
  traits: [],
  hardness: 0,
  max_hp: 0,
  break_threshold: 0
}

const emptyShield: Shield = {
  id: 0,
  name: '',
  hardness: 0,
  max_hp: 0,
  break_threshold: 0,
  bulk: 0,
  price: 0,
  armour_class: 0,
  current_hp: 0,
  raised: false
}

export const useEquipmentStore = defineStore('equipment', () => {
  const characterStore = useCharacterStore()
  const { abilities, character } = storeToRefs(characterStore)
  const { strength } = abilities.value || 0

  const armour = computed<Armour>(() => character.value?.armours?.[0] || emptyArmour)

  const getArmourCheckPenalty = computed(() => {
    if (strength >= armour.value.strength) return 0
    else return armour.value.check_penalty * -1
  })

  const getArmourSpeedPenalty = computed(() => {
    if (armour.value.speed_penalty === 0) return 0
    if (strength >= armour.value.strength) return armour.value.speed_penalty + 5
    else return armour.value.speed_penalty
  })

  const weapons = computed<Weapon[]>(() => {
    if (!character.value) return []
    return [0, 1, 2].map((i) => {
      if (!character.value) return { ...emptyWeapon }
      return character.value.weapons[i] || { ...emptyWeapon }
    })
  })

  function weaponProficiencyMapper(type: Weapon['category']) {
    switch (type) {
      case 'U':
        return 'unarmed'
      case 'S':
        return 'simple'
      case 'M':
        return 'martial'
      case 'A':
      default:
        return 'other'
    }
  }

  function getWeaponProficiency(type: Weapon['category']) {
    if (!type) return 0

    const proficiency = weaponProficiencyMapper(type)
    if (proficiency === 'other') return 0 // TODO: Handle Advanced weapons
    if (!character?.value?.proficiencies[proficiency]) return 0

    const characterStore = useCharacterStore()
    const { level } = storeToRefs(characterStore)
    return character.value.proficiencies[proficiency] + level.value
  }

  const shield = computed<Shield>(() => character.value?.shield || emptyShield)

  return {
    armour,
    getArmourCheckPenalty,
    getArmourSpeedPenalty,
    weapons,
    getWeaponProficiency,
    shield
  }
})
