import client from '.'

const updatePerception = async (perception: CharacterPerception, id: number) => {
  return client.patch(`/characters/${id}/perception`, perception)
}

export { updatePerception }
