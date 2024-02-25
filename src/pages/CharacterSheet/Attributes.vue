<template>
  <main id="attributes" v-if="character">
    <PlayerInfo class="col-span-full row-span-4" />
    <Movement id="movement" class="flex wrap" />
    <Perception :wisdom="character.abilities.wisdom" id="perception" />
    <HitPoints id="health" class="row-span-3" />
    <Attributes id="attributes" />
    <SavingThrows id="saving-throws" class="flex wrap space-between" />
  </main>
</template>

<script setup lang="ts">
import PlayerInfo from '@/sections/PlayerInfo/PlayerInfo.vue'
import Perception from '@/sections/Perception.vue'
import HitPoints from '@/sections/HitPoints.vue'
import Movement from '@/sections/Movement.vue'

import Attributes from '@/sections/Attributes.vue'
import SavingThrows from '@/sections/SavingThrows.vue'

import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCharacterStore } from '@/stores/character'
import { useErrorStore } from '@/stores/error'

import { onBeforeMount } from 'vue'

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const { getUser } = userStore
const user = getUser()

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const errorStore = useErrorStore()
const { error } = storeToRefs(errorStore)

onBeforeMount(() => {
  if (!user.value) {
    router.push('/')
    return
  }

  const charId = Number(route.params.id)

  if (!charId) {
    error.value = 'Character id must be a number'
    router.replace('/error')
    return
  }

  // Resets the character on page reload
  try {
    syncApiCharacterDown(charId)
  } catch (err) {
    router.push('/')
  }
})
</script>

<style scoped>
#movement {
  grid-column: 11 / 13;
  grid-row: 5 / 7;
  z-index: 2;
  display: flex;
  justify-content: space-around;
}

#perception {
  grid-column: 2 / 6;
  grid-row: 5 / 9;
}

#health {
  grid-column: 6 / 13;
  grid-row: 5 / 9;
}

#attributes {
  grid-column: 1 / 2;
  grid-row: 5 / 16;
  z-index: 2;
}

#saving-throws {
  grid-column: 2 / 7;
  grid-row: 9 / 15;
}
</style>
