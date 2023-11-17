import client from '.'

const updateSavingThrows = async (savingThrows: SavingThrows, id: number) => {
  return client.patch(`/characters/${id}/saving_throws`, savingThrows)
}

export { updateSavingThrows }
