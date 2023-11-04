import Login from '@/pages/LoginPage.vue'
import CharacterSelect from '@/pages/CharacterSelect.vue'
import CharacterSheet from '@/pages/CharacterSheet.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/character-select', component: CharacterSelect },
  { path: '/character', component: CharacterSheet }
]

export { routes }
