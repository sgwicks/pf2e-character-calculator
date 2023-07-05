import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAttributeStore = defineStore('attribute', () => {
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

  return {
    attributes,
    getAttributeModifier,
    setAttribute
  }
})
