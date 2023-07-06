<template>
  <header>
    <div class="wrapper">
      <PlayerInfo />
      <Perception />
      <HitPoints />
      <Movement />
    </div>
  </header>

  <main>
    <Attributes />
    <ClassDC />
    <SavingThrows />
    <Skills />
    <ArmourClass />
    <Armour />
    <WeaponList />
  </main>
</template>

<script setup lang="ts">
import PlayerInfo from './sections/PlayerInfo.vue'
import Perception from './sections/Perception.vue'
import HitPoints from './sections/HitPoints.vue'
import Movement from './sections/Movement.vue'

import Attributes from './sections/Attributes.vue'
import ClassDC from './sections/ClassDC.vue'
import Skills from './sections/Skills.vue'
import ArmourClass from './sections/ArmourClass.vue'
import Armour from '@/components/equipment/Armour.vue'
import WeaponList from './sections/WeaponList.vue'
import SavingThrows from './sections/SavingThrows.vue'
</script>

<style scoped></style>
