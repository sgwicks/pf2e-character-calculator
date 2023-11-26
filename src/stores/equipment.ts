import { reactive, computed } from 'vue'
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
  traits: []
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
  traits: []
}

export const useEquipmentStore = defineStore('equipment', () => {
  const characterStore = useCharacterStore()
  const { abilities, character } = storeToRefs(characterStore)
  const { strength } = abilities.value || 0

  const armour = computed<Armour>(() => character.value?.armours?.[0] || emptyArmour)

  const getArmourCheckPenalty = computed(() => {
    if (strength >= armour.value.strength) return 0
    else return armour.value.check_penalty
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

  const weaponProficiencies: Proficiencies = reactive({
    U: 0,
    S: 0,
    M: 0
  })

  function getWeaponProficiency(type: string | null) {
    if (!type) return 0
    if (!weaponProficiencies[type]) return 0

    const characterStore = useCharacterStore()
    const { level } = storeToRefs(characterStore)
    return weaponProficiencies[type] + level.value
  }

  const shield = reactive<Shield>({
    id: 0,
    ac: 0,
    hardness: 0,
    hp: 0,
    bt: 0,
    currentHp: 0,
    raised: false,
    name: '',
    price: 0,
    bulk: 0
  })

  return {
    armour,
    getArmourCheckPenalty,
    getArmourSpeedPenalty,
    weapons,
    weaponProficiencies,
    getWeaponProficiency,
    shield
  }
})
