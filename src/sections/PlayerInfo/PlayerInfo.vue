<template>
  <SGSection v-if="character" title="PlayerInfo">
    <div class="player-info">
      <SGInput :model-value="playerName" label="Player Name" disabled />
      <SGInput v-model="character.name" label="Character Name" />
      <SGInput v-model="character.ancestry" label="Ancestry" />
      <SGInput v-model="character.heritage" label="Heritage" />
      <SGInput v-model="character.background" label="Background" />
      <SGInput v-model="character.size" label="Size" />
      <SGInput v-model="traits" label="Traits" />
      <SGInput v-model="character.deity" label="Deity" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGInput from '@/components/form/SGInput.vue'
import SGSection from '@/components/layout/SGSection.vue'
import { useUserStore } from '@/stores/user'
import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const userStore = useUserStore()
const characterStore = useCharacterStore()

const { user } = storeToRefs(userStore)
const { character, level } = storeToRefs(characterStore)

const traits = computed<string | null>({
  get: () => character.value?.traits || null,
  set: (val: string | null) => {
    if (!character.value) return
    if (!val) {
      character.value.traits = null
    } else {
      character.value.traits = val
    }
  }
})

const playerName = user.value?.name || ''
</script>

<style scoped>
.player-info {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
  min-width: 750px;
}

label {
  display: flex;
  flex-direction: column;
}

select {
  background-color: white;
  border: 1px solid #888;
  margin-top: 5px;
  padding: 2px;
  border-radius: 3px;
}
</style>
