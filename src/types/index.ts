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

interface Item {
  id: number
  name: string
  price: number
  bulk: number
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
  armour_class: number
  dex_cap: number | null
  check_penalty: number
  speed_penalty: number
  strength: number
  group: ArmourGroup
  traits: string[]
}

interface Weapon extends Item {
  category: 'U' | 'S' | 'M' | 'A'
  range: number
  damage_die_type: Dice['size']
  damage_die_amount: number
  damage_type: 'B' | 'P' | 'S'
  reload: number
  hands: 0 | 1 | 2
  group: string
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

type Proficiency = 0 | 2 | 4 | 6 | 8

interface Proficiencies {
  unarmoured: Proficiency
  light: Proficiency
  medium: Proficiency
  heavy: Proficiency
  unarmed: Proficiency
  simple: Proficiency
  martial: Proficiency
  class_dc: Proficiency
  spell_dc: Proficiency
  spell_attack: Proficiency
  other: string
}

type ProficiencyKey = keyof Proficiencies

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
  proficiency: Proficiency
  item: number
}

interface CharacterFeat {
  id: number
  name: string
  description: string
  chosen_level: number
  traits: string[]
  type: 'G' | 'S' | 'A' | 'C' | 'B'
}

interface CharacterAction {
  id: number
  name: string
  description: string | null
  action: ActionTime
  traits: string[] | null
  trigger: string | null
  source_book: string | null
  source_page: number | null
  is_spell: boolean
  components: string[] | null
}

interface CharacterSavingThrows {
  fortitude: Proficiency
  reflex: Proficiency
  will: Proficiency
}

type SavingThrow = keyof CharacterSavingThrows

interface CharacterMovement {
  base: number
  burrow: number
  climb: number
  fly: number
  swim: number
}

interface CharacterPerception {
  proficiency: Proficiency
  item: number
  senses: string[]
}

interface CharacterHealth {
  max: number
  current: number
  temporary: number
  dying: number
  wounded: number
  resistances: string[]
  weaknesses: string[]
  immunities: string[]
  conditions: string[]
}

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
  perception: CharacterPerception
  movement: CharacterMovement
  health: CharacterHealth
  abilities: {
    [key in Attribute]: number
  }
  saving_throws: CharacterSavingThrows
  skills: Skill[]
  feats: CharacterFeat[]
  actions: CharacterAction[]
  character_classes: CharacterClass[]
  items: Item[]
  armours: Armour[]
  weapons: Weapon[]
  proficiencies: Proficiencies
  user: {
    id: number
    name: string
  }
}

type ActionTime = 'bonus' | 'single' | 'double' | 'triple' | 'reaction'

type Result = {
  id: number
  label: string
  value: string
}
