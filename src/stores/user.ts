import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchUser } from '@/api/user'

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

    const refreshUser = async () => {
      if (!user.value) return
      const response = await fetchUser(user.value?.id)
      const freshUser = response.data.data
      setUser(freshUser)
    }

    function $reset() {
      user.value = null
    }

    return { user, authToken, getUser, setUser, refreshUser, $reset }
  },
  { persist: true }
)
