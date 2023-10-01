<template>
  <form @submit.prevent="submit">
    <label>
      Email
      <input v-model="email">
    </label>
    <label>
      Password
      <input v-model="password" type="password">
    </label>
    <button>Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();
const { setUser } = userStore;


const email = ref('');
const password = ref('');

const submit = async () => {
  const res = await login(email.value, password.value)

  setUser(res.data.data)
}
</script>