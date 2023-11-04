<template>
  <header>
    <PlayerInfo class="col-span-full row-span-7" />
    <Perception class="col-span-5 row-span-4 flex wrap" />
    <HitPoints class="col-span-7 row-span-6 flex wrap" />
    <Movement class="col-span-5 row-span-2 flex wrap" />
  </header>

  <main>
    <!-- Character Sheet -->
    <Attributes class="row-span-9 col-span-2" />
    <SavingThrows class="row-span-6 col-span-5 flex wrap space-between" />
    <ArmourClass class="row-span-6 col-span-5 flex wrap" />
    <Shield class="row-span-3 col-span-4 flex wrap" />
    <Armour class="row-span-4 col-span-6 flex wrap" />
    <WeaponList class="row-span-26 col-span-6" />
    <Skills class="row-span-25 col-span-6" />
    <Feats class="row-span-24 col-span-12 flex wrap" />
    <ActionsExplainer class="row-span-3 col-span-2" />
    <ClassDC class="row-span-3 col-span-6 flex wrap" />
    <ActionList class="row-span-26 col-span-12" />
    <SpellDC class="row-span-3 col-span-10 flex" />
    <SpellList class="row-span-26 col-span-12" />
  </main>
</template>

<script setup lang="ts">
import PlayerInfo from '@/sections/PlayerInfo.vue'
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

import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()
const { getUser } = userStore
const user = getUser()

onBeforeMount(() => {
  if (!user.value) {
    router.push('/')
  }
})
</script>

<style scoped></style>
