import Login from '@/pages/LoginPage.vue'
import CharacterSelect from '@/pages/CharacterSelect.vue'
import CharacterSheet from '@/pages/CharacterSheet.vue'
import CharacterCreate from '@/pages/CharacterCreate.vue'
import Error from '@/pages/Error.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/character-select', component: CharacterSelect },
  { path: '/character/new', component: CharacterCreate },
  { path: '/character/:id', component: CharacterSheet },
  { path: '/error', component: Error }
]

export { routes }
