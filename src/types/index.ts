type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary'

type Coin = 'cp' | 'sp' | 'gp' | 'pp'

type Cost = {
  amount: number
  type: Coin
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
}
