import client from '.'

const patchMovement = async (id: number, movement: Partial<CharacterMovement>) => {
  return client.patch(`/characters/${id}/movement`, { ...movement })
}

export { patchMovement }
