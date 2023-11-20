import client from '.'

const updateSavingThrows = async (savingThrows: CharacterSavingThrows, id: number) => {
  return client.patch(`/characters/${id}/saving_throws`, savingThrows)
}

export { updateSavingThrows }
