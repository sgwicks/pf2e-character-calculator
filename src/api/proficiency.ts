import client from '.'

const patchProficiency = async (id: number, proficiencies: Partial<Proficiencies>) => {
  return client.patch(`/characters/${id}/proficiency`, { ...proficiencies })
}

export { patchProficiency }
