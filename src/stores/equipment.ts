import { reactive, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useMainStore } from './main'
import { useAttributeStore } from './attribute'

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

export const useEquipmentStore = defineStore(
  'equipment',
  () => {
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

    const getArmourCheckPenalty = computed(() => {
      const attributeStore = useAttributeStore()
      const { attributes } = storeToRefs(attributeStore)
      if (attributes.value.strength.value >= armour.strengthReq) return 0
      else return armour.checkPenalty
    })

    const getArmourSpeedPenalty = computed(() => {
      if (armour.speedPenalty === 0) return 0
      const attributeStore = useAttributeStore()
      const { attributes } = storeToRefs(attributeStore)
      if (attributes.value.strength.value >= armour.strengthReq) return armour.speedPenalty + 5
      else return armour.speedPenalty
    })

    const weapons: Weapon[] = reactive([
      { ...emptyWeapon },
      { ...emptyWeapon, type: 'ranged' },
      { ...emptyWeapon }
    ])

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

    const shield = reactive<Shield>({
      ac: 0,
      hardness: 0,
      hp: 0,
      bt: 0,
      currentHp: 0,
      raised: false,
      name: '',
      rarity: 'common',
      price: null,
      level: 0,
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
  },
  { persist: true }
)
