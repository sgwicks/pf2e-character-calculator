import client from '.'

const fetchWeapons = (name: string) => {
  return client.get('/weapons', { params: { name } })
}

const setCharacterWeapon = (character_id: number, weapon_id: number) => {
  return client.post(`/characters/${character_id}/weapons`, { weapon_id })
}

const updateCharacterWeapon = (
  character_id: number,
  existing_weapon: number,
  new_weapon: number
) => {
  return client.patch(`/characters/${character_id}/weapons/${existing_weapon}`, {
    weapon_id: new_weapon
  })
}

export { fetchWeapons, setCharacterWeapon, updateCharacterWeapon }
