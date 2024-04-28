import client from '.'

const updateCharacterNotes = async (character_id: number, body: string) => {
  return client.patch(`characters/${character_id}/notes`, { body })
}

export { updateCharacterNotes }
