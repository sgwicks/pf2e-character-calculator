<template>
  <main v-if="character">
    <PlayerInfo class="col-span-full row-span-4" />
    <Movement id="movement" class="flex wrap" />
    <Perception :wisdom="character.abilities.wisdom" id="perception" />
    <HitPoints id="health" class="row-span-3" />
    <Attributes id="attributes" />
    <SavingThrows id="saving-throws" class="flex wrap space-between" />
    <Skills id="skills" />
    <ArmourClass :dexterity="character.abilities.dexterity" id="armour-class" class="flex wrap" />
    <Shield id="shield" class="flex wrap" />
    <Armour id="armour" />
    <WeaponList id="weapons" />
    <Feats class="row-span-18 col-span-12 flex wrap" />
    <ActionsExplainer class="row-span-3 col-span-2" />
    <ClassDC class="row-span-3 col-span-6 flex wrap" />
    <ActionList class="row-span-26 col-span-12" />
    <SpellDC class="row-span-3 col-span-10 flex" />
    <SpellList class="row-span-26 col-span-12" />
  </main>
</template>

<script setup lang="ts">
import PlayerInfo from '@/sections/PlayerInfo/PlayerInfo.vue'
import Perception from '@/sections/Perception.vue'
import HitPoints from '@/sections/HitPoints.vue'
import Movement from '@/sections/Movement.vue'
import ActionsExplainer from '@/components/ActionsExplainer.vue'

import Attributes from '@/sections/Attributes.vue'
import ClassDC from '@/sections/ClassDC.vue'
import Skills from '@/sections/Skills.vue'
import ArmourClass from '@/sections/ArmourClass.vue'
import Armour from '@/components/equipment/Armour.vue'
import WeaponList from '@/sections/WeaponList.vue'
import SavingThrows from '@/sections/SavingThrows.vue'
import Feats from '@/sections/Feats.vue'
import ActionList from '@/sections/ActionList.vue'
import SpellList from '@/sections/SpellList.vue'
import SpellDC from '@/sections/SpellDC.vue'
import Shield from '@/components/equipment/Shield.vue'

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

#skills {
  grid-column: 7 / 13;
  grid-row: 9 / 38;
  z-index: 1;
}

#armour-class {
  grid-column: 2 / 7;
  grid-row: 15 / 23;
}

#shield {
  grid-column: 1 / 2;
  grid-row: 16 / 24;
  z-index: 1;
}

#armour {
  grid-column: 1 / 7;
  grid-row: 23 / 27;
}

#weapons {
  grid-column: 1 / 13;
  grid-row: 27 / 49;
}
</style>
