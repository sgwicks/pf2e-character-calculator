import { reactive } from 'vue'
import { defineStore } from 'pinia'

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
    price: null
  })

  return { armour }
})
