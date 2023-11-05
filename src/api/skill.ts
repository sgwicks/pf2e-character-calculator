import client from '.'

const updateSkillProficiency = async (
  characterId: number,
  skillId: number,
  proficiency: number,
  item?: number
) => {
  return client.patch(`/characters/${characterId}/skills/${skillId}`, {
    proficiency,
    item
  })
}

export { updateSkillProficiency }
