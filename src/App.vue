<template>
  <header>
    <PlayerInfo class="col-span-full" />
    <Perception class="col-span-4" />
    <HitPoints class="col-span-4" />
    <Movement class="col-span-4" />
  </header>

  <main>
    <Attributes class="row-span-5 col-span-4" />
    <ArmourClass class="row-span-3 col-span-4 flex wrap" />
    <Armour class="row-span-6 col-span-4 flex wrap" />
    <SavingThrows class="row-span-3 col-span-4 flex wrap" />
    <ClassDC class="row-span-1 col-span-4 flex wrap" />
    <WeaponList class="col-span-6" />
    <Skills class="col-span-6" />
    <Feats class="col-span-12 flex" />
    <ActionsExplainer class="col-span-2" />
    <ActionList class="col-span-10" />
    <SpellDC class="row-span-2 col-span-2" />
    <SpellList class="col-span-10" />
  </main>
</template>

<script setup lang="ts">
import PlayerInfo from './sections/PlayerInfo.vue'
import Perception from './sections/Perception.vue'
import HitPoints from './sections/HitPoints.vue'
import Movement from './sections/Movement.vue'
import ActionsExplainer from './components/ActionsExplainer.vue'

import Attributes from './sections/Attributes.vue'
import ClassDC from './sections/ClassDC.vue'
import Skills from './sections/Skills.vue'
import ArmourClass from './sections/ArmourClass.vue'
import Armour from '@/components/equipment/Armour.vue'
import WeaponList from './sections/WeaponList.vue'
import SavingThrows from './sections/SavingThrows.vue'
import Feats from './sections/Feats.vue'
import ActionList from './sections/ActionList.vue'
import SpellList from './sections/SpellList.vue'
import SpellDC from './sections/SpellDC.vue'
</script>

<style scoped></style>
