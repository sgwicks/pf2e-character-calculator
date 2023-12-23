import client from '.'

const addCharacterAction = async (character_id: number, action: Partial<CharacterAction>) => {
  return client.post(`/characters/${character_id}/actions`, { ...action })
}

const updateCharacterAction = async (character_id: number, action: Partial<CharacterAction>) => {
  return client.patch(`/characters/${character_id}/actions/${action.id}`, { ...action })
}

export { addCharacterAction, updateCharacterAction }
