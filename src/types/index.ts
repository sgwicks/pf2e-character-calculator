type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary'

type Coin = 'cp' | 'sp' | 'gp' | 'pp'

type Cost = {
  amount: number
  type: Coin
}

type Dice = {
  amount: number
  size: 2 | 4 | 6 | 8 | 10 | 12 | 20
}

type Bulk = 'L' | number

interface Item {
  name: string
  rarity: Rarity
  price: Cost | null
  level: number
  bulk: Bulk
}

type ArmourCategory = 'U' | 'L' | 'M' | 'H'
type ArmourGroup =
  | null
  | 'cloth'
  | 'leather'
  | 'wood'
  | 'composite'
  | 'chain'
  | 'skeletal'
  | 'Plate'

interface Armour extends Item {
  category: ArmourCategory
  ac: number
  dexCap: number | null
  checkPenalty: number
  speedPenalty: number
  strengthReq: number
  group: ArmourGroup
  traits: string[]
}

interface Weapon extends Item {
  type: 'melee' | 'ranged'
  class: 'simple' | 'martial' | 'other'
  other: string | null
  dice: Dice
  bludgeoning: boolean
  piercing: boolean
  slashing: boolean
  specialised: boolean
  item: number
  traits: string[]
}

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

type Attribute = keyof Attributes

interface Proficiencies {
  [k: string]: 0 | 2 | 4 | 6 | 8
}

interface CharacterClass {
  name: string
  keySkill: Attribute[]
}
