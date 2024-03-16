<template>
  <main id="unauthed">
    <form class="flex column" @submit.prevent="submit">
      <SGInput v-model="email" label="Email" />
      <SGInput v-model="password" label="Password" password />
      <button class="margin-md">Submit</button>
    </form>
    <div v-if="error" style="color: red">Incorrect login</div>
    <RouterLink to="signup">Signup</RouterLink>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import SGInput from '@/components/form/SGInput.vue'

const router = useRouter()

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
    router.push('/character-select')
  } catch (err) {
    error.value = true
  }
}
</script>
