import Login from '@/pages/Unauthed/LoginPage.vue'
import Signup from '@/pages/Unauthed/SignupPage.vue'
import Logout from '@/pages/Unauthed/LogoutPage.vue'
import CharacterSelect from '@/pages/CharacterSelect.vue'
import CharacterSheetHome from '@/pages/CharacterSheet/index.vue'
import CharacterSheetAttributes from '@/pages/CharacterSheet/Attributes.vue'
import CharacterSheetSkills from '@/pages/CharacterSheet/Skills.vue'
import CharacterSheetFeats from '@/pages/CharacterSheet/Feats.vue'
import CharacterSheetActions from '@/pages/CharacterSheet/Actions.vue'
import CharacterSheetSpells from '@/pages/CharacterSheet/Spells.vue'
import CharacterSheetEquipment from '@/pages/CharacterSheet/Equipment.vue'
import CharacterSheetNotes from '@/pages/CharacterSheet/Notes.vue'
import CharacterCreate from '@/pages/CharacterCreate.vue'
import Error from '@/pages/Error.vue'
import type { NavigationGuard } from 'vue-router'
import { useCharacterStore } from '@/stores/character'

const refreshCharacter: NavigationGuard = async (to, from, next) => {
  const [characterId] = to.params.id
  if (!characterId) return false
  const characterStore = useCharacterStore()
  const { syncApiCharacterDown } = characterStore
  await syncApiCharacterDown(Number(characterId))
  return next()
}

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/character-select', component: CharacterSelect },
  { path: '/character/new', component: CharacterCreate },
  { path: '/character/:id/', component: CharacterSheetHome, beforeEnter: refreshCharacter },
  {
    path: '/character/:id/attributes',
    component: CharacterSheetAttributes,
    beforeEnter: refreshCharacter
  },
  { path: '/character/:id/skills', component: CharacterSheetSkills, beforeEnter: refreshCharacter },
  { path: '/character/:id/feats', component: CharacterSheetFeats, beforeEnter: refreshCharacter },
  {
    path: '/character/:id/actions',
    component: CharacterSheetActions,
    beforeEnter: refreshCharacter
  },
  { path: '/character/:id/spells', component: CharacterSheetSpells, beforeEnter: refreshCharacter },
  {
    path: '/character/:id/equipment',
    component: CharacterSheetEquipment,
    beforeEnter: refreshCharacter
  },
  { path: '/character/:id/notes', component: CharacterSheetNotes, beforeEnter: refreshCharacter },
  { path: '/error', component: Error },
  { path: '/logout', component: Logout }
]

export { routes }
