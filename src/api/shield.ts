import client from './index'

const fetchShields = () => {
  return client.get('/shields')
}

const addShield = (character_id: number, shield_id: number) => {
  return client.post(`/characters/${character_id}/shield`, { shield_id })
}

const replaceShield = (character_id: number, shield_id: number) => {
  return client.put(`/characters/${character_id}/shield`, { shield_id })
}

const updateShield = (character_id: number, params: { raised?: boolean; current_hp?: number }) => {
  return client.patch(`/characters/${character_id}/shield`, { ...params })
}

export { fetchShields, addShield, replaceShield, updateShield }
