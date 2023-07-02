<template>
  <header>
    <div class="wrapper">
      <PlayerInfo />
    </div>
  </header>

  <main>
    <Attributes />
  </main>
</template>

<script setup lang="ts">
import PlayerInfo from './components/sections/PlayerInfo.vue'
import Attributes from './components/sections/Attributes.vue'
</script>

<style scoped></style>
