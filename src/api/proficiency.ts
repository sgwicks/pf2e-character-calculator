import client from '.'

const patchProficiency = async (
  id: number,
  proficiencies: {
    unarmed?: Proficiency
    simple?: Proficiency
    martial?: Proficiency
    unarmoured?: Proficiency
    light?: Proficiency
    medium?: Proficiency
    heavy?: Proficiency
  }
) => {
  return client.patch(`/characters/${id}/proficiency`, { ...proficiencies })
}

export { patchProficiency }
