<template>
  <form class="flex column" @submit.prevent="submit">
    <label class="flex space-between margin-y-sm">
      Email
      <input v-model="email" class="margin-x-sm" />
    </label>
    <label class="flex space-between- margin-y-sm">
      Password
      <input v-model="password" type="password" class="margin-x-sm" />
    </label>
    <button class="margin-md">Submit</button>
  </form>
  <div v-if="error" style="color: red">Incorrect login</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import { useRouterStore } from '@/stores/router'

const { setComponent } = useRouterStore()

const userStore = useUserStore()
const { setUser } = userStore

const email = ref('')
const password = ref('')

const error = ref(false)

const submit = async () => {
  try {
    const res = await login(email.value, password.value)
    error.value = false
    await setUser(res.data.data)
    setComponent('/character-select')
  } catch (err) {
    error.value = true
  }
}
</script>
