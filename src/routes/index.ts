import Login from '@/pages/LoginPage.vue'
import CharacterSelect from '@/pages/CharacterSelect.vue'
import CharacterSheet from '@/pages/CharacterSheet.vue'
import CharacterCreate from '@/pages/CharacterCreate.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/character-select', component: CharacterSelect },
  { path: '/character/new', component: CharacterCreate },
  { path: '/character/:id', component: CharacterSheet }
]

export { routes }
