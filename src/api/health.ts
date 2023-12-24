import client from '.'

const patchHealth = async (id: number, health: Partial<CharacterHealth>) => {
  return client.patch(`/characters/${id}/health`, { ...health })
}

export { patchHealth }
