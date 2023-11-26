import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

type User = {
  id: number
  name: string
  email: string
  characters: {
    id: Character['id']
    name: Character['name']
  }[]
}

export const useUserStore = defineStore(
  'user',
  () => {
    const user: Ref<User | null> = ref(null)

    const getUser = () => user

    const setUser = async (authUser: User | null) => {
      user.value = authUser
      return
    }

    const authToken: Ref<string | null> = ref(null)

    return { user, authToken, getUser, setUser }
  },
  { persist: true }
)
