import client from '.'

const fetchCharacter = async (id: number) => {
  return client.get(`/characters/${id}`)
}

const patchCharacter = async (id: number, character: Character) => {
  return client.patch(`/characters/${id}`, character)
}

export { fetchCharacter, patchCharacter }
