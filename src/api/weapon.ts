import client from '.'

const fetchWeapons = (name: string) => {
  return client.get('/weapons', { params: { name } })
}

const setCharacterWeapon = (character_id: number, weapon_id: number) => {
  return client.post(`/characters/${character_id}/weapons`, { weapon_id })
}

const replaceCharacterWeapon = (
  character_id: number,
  existing_weapon: number,
  new_weapon: number
) => {
  return client.put(`/characters/${character_id}/weapons/${existing_weapon}`, {
    weapon_id: new_weapon
  })
}

const updateCharacterWeapon = (
  character_id: number,
  existing_weapon: number,
  weapon: {
    category?: Weapon['category']
    range?: Weapon['range']
    damage_die_type?: Weapon['damage_die_type']
    damage_die_amount?: Weapon['damage_die_amount']
    damage_type?: Weapon['damage_type']
    hands?: Weapon['hands']
    reload?: Weapon['reload']
    price?: Weapon['price']
    bulk?: Weapon['bulk']
    group?: Weapon['group']
    traits?: Weapon['traits']
  }
) => {
  return client.patch(`/characters/${character_id}/weapons/${existing_weapon}`, { ...weapon })
}

export { fetchWeapons, setCharacterWeapon, replaceCharacterWeapon, updateCharacterWeapon }
