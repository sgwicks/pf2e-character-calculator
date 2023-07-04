<template>
  <SGSection title="PlayerInfo">
    <div class="player-info">
      <SGInput v-model="playerName" label="Player Name" />
      <SGInput v-model="character.name" label="Character Name" />
      <SGInput v-model="character.ancestry" label="Ancestry & Heritage" />
      <SGInput v-model="character.background" label="Background" />
      <SGInput v-model="character.class" label="Class" />
      <SGInput v-model="character.size" label="Size" />
      <SGInput v-model="character.alignment" label="Alignment" />
      <SGInput v-model="character.traits" label="Traits" />
      <SGInput v-model="character.deity" label="Deity" />
      <SGInput v-model="level" label="Level" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SGInput from '../form/SGInput.vue'
import SGSection from '../layout/SGSection.vue'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { level } = storeToRefs(store)

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
.player-info {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  min-width: 750px;
}
</style>
