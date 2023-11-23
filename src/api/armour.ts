import client from '.'

const fetchArmours = async (name: string) => {
  return client.get('/armours', { params: { name } })
}

const setCharacterArmour = async (character_id: number, armour_id: number) => {
  return client.post(`/characters/${character_id}/armours/`, { armour_id })
}

const removeCharacterArmour = async (character_id: number, armour_id: number) => {
  return client.delete(`/characters/${character_id}/armours/${armour_id}`)
}

export { fetchArmours, setCharacterArmour, removeCharacterArmour }
