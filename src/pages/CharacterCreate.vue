<template>
  <main id="unauthed" class="flex column">
    Choose your character name
    <form @submit.prevent="submit">
      <SGInput v-model="name" label="Name" />
      <button type="submit">Submit</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import SGInput from '@/components/form/SGInput.vue'
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'
import { createCharacter } from '@/api/character'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

const name = ref('')

const submit = async () => {
  if (!userStore.user) return
  try {
    const res = await createCharacter(userStore.user?.id, name.value)
    if (res.status === 201) {
      router.push(`/character/${res.data.id}`)
    }
  } catch (err) {
    console.warn(err)
  }
}
</script>
