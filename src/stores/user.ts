import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

type User = {
  id: number
  name: string
  email: string
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

    return { user, getUser, setUser }
  },
  { persist: true }
)
