<template>
  <div class="player-info">
    <h2>Player Info</h2>
    <SGInput v-model="playerName" label="Player Name" />
    <SGInput v-model="character.name" label="Character Name" />
    <SGInput v-model="character.ancestry" label="Ancestry & Heritage" />
    <SGInput v-model="character.background" label="Background" />
    <SGInput v-model="character.class" label="Class" />
    <SGInput v-model="character.size" label="Size" />
    <SGInput v-model="character.alignment" label="Alignment" />
    <SGInput v-model="character.traits" label="Traits" />
    <SGInput v-model="character.deity" label="Deity" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SGInput from '../form/SGInput.vue'

const playerName = ref('')
const character = ref({
  name: '',
  ancestry: '',
  background: '',
  class: '',
  size: '',
  alignment: '',
  traits: '',
  deity: ''
})
</script>

<style scoped>
h2 {
  grid-column: span 2;
  margin-top: -10px;
}
.player-info {
  padding: 20px;
  color: black;
  background-color: white;
  border: 1px solid red;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  min-width: 750px;
}
</style>
