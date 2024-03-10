<template>
  <main id="unauthed">
    <form class="flex column" @submit.prevent="submit">
      <SGInput v-model="name" label="Name" />
      <SGInput v-model="email" label="Email" />
      <SGInput v-model="password" label="Password" password />
      <SGInput v-model="checkPassword" label="Repeat Password" password />
      <button class="margin-md">Sign up</button>
    </form>
    <div v-for="error in errorText" style="color: red">{{ error }}</div>
    <RouterLink to="login">Go to Login</RouterLink>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { signup } from '@/api/user'
import { useRouter } from 'vue-router'

import SGInput from '@/components/form/SGInput.vue'
import constants from '@/constants'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const checkPassword = ref('')

const errorText = ref<string[]>([])

const addError = (text: string) => {
  errorText.value.push(text)
}

const resetErrors = () => {
  errorText.value = []
}

const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

const submit = async () => {
  resetErrors()

  // Name validation
  if (!name.value) addError('Name is required')

  // Email validation
  if (!email.value) addError('Email is required')
  if (!emailRegex.test(email.value)) addError('Email must be a valid email')

  // Password validation
  if (!password.value) addError('Password is required')
  if (!checkPassword.value) addError('Repeat Password is required')
  if (password.value.length < constants.MIN_PASSWORD_LENGTH)
    addError('Password must be at least 16 characters')
  if (password.value !== checkPassword.value) addError('Passwords must match')

  if (errorText.value.length > 0) return

  try {
    const res = await signup(name.value, email.value, password.value)
    if (res.status === 201) addError('Success!')
  } catch (err) {
    console.log(err)
    addError('Something went wrong')
  }
}
</script>
