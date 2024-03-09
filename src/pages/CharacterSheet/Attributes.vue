<template>
  <main id="attributes-page" v-if="character">
    <PlayerInfo id="player-info" />
    <hr class="full-width" />
    <Attributes id="attributes" />
    <SavingThrows id="saving-throws" />
    <div>
      <Movement id="movement" class="flex wrap" />
      <Perception id="perception" :wisdom="character.abilities.wisdom" />
    </div>
    <HitPoints id="health" />
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

<style lang="scss" scoped>
#attributes-page {
  display: flex;
  flex-wrap: wrap;
}

#player-info {
  width: 100%;
}

#health {
  flex: 1 1 min-content;
}
</style>
