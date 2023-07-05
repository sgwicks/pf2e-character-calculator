<template>
  <header>
    <div class="wrapper">
      <PlayerInfo />
    </div>
  </header>

  <main>
    <Attributes />
    <SavingThrowsVue />
    <Skills />
    <ArmourClass />
    <Armour />
    <WeaponList />
  </main>
</template>

<script setup lang="ts">
import PlayerInfo from './components/sections/PlayerInfo.vue'
import Attributes from './components/sections/Attributes.vue'
import Skills from './components/sections/Skills.vue'
import ArmourClass from './components/sections/ArmourClass.vue'
import Armour from './components/sections/equipment/Armour.vue'
import WeaponList from './components/sections/WeaponList.vue'
import SavingThrowsVue from './components/sections/SavingThrows.vue'
</script>

<style scoped></style>
