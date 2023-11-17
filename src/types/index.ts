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
  hardness: number
  max_hp: number
  break_threshold: number
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

interface Shield extends Item {
  ac: number
  hardness: number
  hp: number
  bt: number
  currentHp: number
  raised: boolean
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
  id: number
  name: string
  level: number
  hit_points_per_level: number
  ability_options: Attribute[]
  chosen_ability: Attribute | null
}

interface Skill {
  id: number
  name: string
  ability: Attribute
  armour: boolean
  proficiency: number
  item: number
}

interface Feat {
  id: number
  name: string
  description: string
}

interface Action {
  id: number
  name: string
  description: string
  action: ActionTime
  traits: string[] | null
  source_book: string
  source_page: number
  is_spell: boolean
  components: string[] | null
}

interface SavingThrows {
  fortitude: number
  reflex: number
  will: number
}

type SavingThrow = keyof SavingThrows

interface Character {
  id: number
  name: string
  ancestry: string | null
  heritage: string | null
  background: string | null
  size: string | null
  alignment: string | null
  traits: string | null
  deity: string | null
  abilities: {
    [key in Attribute]: number
  }
  saving_throws: SavingThrows
  skills: Skill[]
  feats: Feat[]
  actions: []
  character_classes: CharacterClass[]
  items: Item[]
  user: {
    id: number
    name: string
  }
}

type ActionTime = 'bonus' | 'single' | 'double' | 'triple' | 'reaction'
