import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

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

  return { attributes, setAttribute }
})
