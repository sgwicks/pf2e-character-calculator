import client from '.'

const fetchFeats = async (query: {
  name: string
  level: number
  type: CharacterFeat['type']
  character_id: number | null
}) => {
  return client.get('/feats', { params: { ...query } })
}

const addCharacterFeat = async (
  character_id: number,
  feat: {
    feat_id: number
    chosen_level: number
    type: CharacterFeat['type']
  }
) => {
  return client.post(`/characters/${character_id}/feats`, { ...feat })
}

export { fetchFeats, addCharacterFeat }
