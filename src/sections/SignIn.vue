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
  <div v-if="error" style="color:red">
    Incorrect login
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { login } from '@/api/auth'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();
const { setUser } = userStore;

const emit = defineEmits(['push'])


const email = ref('');
const password = ref('');

const error = ref(false);

const submit = async () => {
  try {
    const res = await login(email.value, password.value)
    error.value = false
    await setUser(res.data.data)
    emit('push', '/character')
  } catch (err) {
    error.value = true
  }
}
</script>