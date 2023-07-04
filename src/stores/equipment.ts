import { reactive } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useMainStore } from './main'

const emptyWeapon: Weapon = {
  name: '',
  type: 'melee',
  class: 'simple',
  other: null,
  dice: {
    amount: 1,
    size: 2
  },
  bludgeoning: false,
  piercing: false,
  slashing: false,
  specialised: false,
  traits: [],
  price: null,
  bulk: 0,
  item: 0,
  rarity: 'common',
  level: 0
}

export const useEquipmentStore = defineStore('equipment', () => {
  const armour = reactive<Armour>({
    name: '',
    category: 'U',
    ac: 0,
    dexCap: null,
    checkPenalty: 0,
    speedPenalty: 0,
    strengthReq: 0,
    level: 0,
    bulk: 0,
    group: null,
    rarity: 'common',
    price: null,
    traits: []
  })

  const weapons: Weapon[] = reactive([{ ...emptyWeapon }, { ...emptyWeapon, type: 'ranged' }])

  const weaponProficiencies: Proficiencies = reactive({
    simple: 0,
    martial: 0
  })

  function getWeaponProficiency(type: string | null) {
    if (!type) return 0
    if (!weaponProficiencies[type]) return 0
    const mainStore = useMainStore()
    const { level } = storeToRefs(mainStore)
    return weaponProficiencies[type] + level.value
  }

  return { armour, weapons, weaponProficiencies, getWeaponProficiency }
})
