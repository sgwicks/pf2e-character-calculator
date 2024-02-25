import Login from '@/pages/LoginPage.vue'
import CharacterSelect from '@/pages/CharacterSelect.vue'
import CharacterSheetHome from '@/pages/CharacterSheet/index.vue'
import CharacterSheetAttributes from '@/pages/CharacterSheet/Attributes.vue'
import CharacterSheetSkills from '@/pages/CharacterSheet/Skills.vue'
import CharacterSheetFeats from '@/pages/CharacterSheet/Feats.vue'
import CharacterSheetActions from '@/pages/CharacterSheet/Actions.vue'
import CharacterSheetSpells from '@/pages/CharacterSheet/Spells.vue'
import CharacterSheetEquipment from '@/pages/CharacterSheet/Equipment.vue'
import CharacterCreate from '@/pages/CharacterCreate.vue'
import Error from '@/pages/Error.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/character-select', component: CharacterSelect },
  { path: '/character/new', component: CharacterCreate },
  { path: '/character/:id/', component: CharacterSheetHome },
  { path: '/character/:id/attributes', component: CharacterSheetAttributes },
  { path: '/character/:id/skills', component: CharacterSheetSkills },
  { path: '/character/:id/feats', component: CharacterSheetFeats },
  { path: '/character/:id/actions', component: CharacterSheetActions },
  { path: '/character/:id/spells', component: CharacterSheetSpells },
  { path: '/character/:id/equipment', component: CharacterSheetEquipment },
  { path: '/error', component: Error }
]

export { routes }
