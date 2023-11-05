import client from '.'

const fetchCharacter = async (id: number) => {
  return client.get(`/characters/${id}`)
}

const patchCharacter = async (id: number, character: Character) => {
  return client.patch(`/characters/${id}`, character)
}

const fetchCharacterClasses = async () => {
  return client.get('/character_classes')
}

const updateCharacterClass = async (
  characterId: number,
  classId: number,
  { level, key_ability }: { level: number; key_ability: string }
) => {
  return client.patch(`/characters/${characterId}/character_classes/${classId}`, {
    level,
    key_ability
  })
}

const addCharacterClass = async (characterId: number, { class_name }: { class_name: string }) => {
  return client.post(`/characters/${characterId}/character_classes`, { class_name })
}

const removeCharacterClass = async (characterId: number, classId: number) => {
  return client.delete(`/characters/${characterId}/character_classes/${classId}`)
}

export {
  fetchCharacter,
  patchCharacter,
  fetchCharacterClasses,
  updateCharacterClass,
  addCharacterClass,
  removeCharacterClass
}
