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
    <SavingThrowsVue />
    <Skills />
    <ArmourClass />
    <Armour />
    <WeaponList />
  </main>
</template>

<script setup lang="ts">
import PlayerInfo from './components/sections/PlayerInfo.vue'
import Perception from './components/sections/Perception.vue'
import HitPoints from './components/sections/HitPoints.vue'
import Movement from './components/sections/Movement.vue'

import Attributes from './components/sections/Attributes.vue'
import ClassDC from './components/sections/ClassDC.vue'
import Skills from './components/sections/Skills.vue'
import ArmourClass from './components/sections/ArmourClass.vue'
import Armour from './components/sections/equipment/Armour.vue'
import WeaponList from './components/sections/WeaponList.vue'
import SavingThrowsVue from './components/sections/saving-throws/index.vue'
</script>

<style scoped></style>
