<template>
  <SGSection title="PlayerInfo">
    <div class="player-info">
      <SGInput :model-value="playerName" label="Player Name" disabled />
      <SGInput :model-value="character.name" label="Character Name" disabled />
      <SGInput :model-value="character.ancestry" label="Ancestry & Heritage" disabled />
      <SGInput :model-value="character.background" label="Background" disabled />
      <label>
        Character Class
        <SGInput :model-value="character.character_classes[0].name" disabled />
      </label>
      <label>
        Key Skill
        <select
          :v-model="character.character_classes[0].ability_options"
          :disabled="keySkillOptions.length < 2"
        >
          <option v-for="attribute in keySkillOptions" :key="attribute" :value="attribute">
            {{ attribute }}
          </option>
        </select>
      </label>
      <SGInput :model-value="character.size" label="Size" disabled />
      <SGInput :model-value="character.alignment" label="Alignment" disabled />
      <SGInput :model-value="character.traits?.join(',') || ''" label="Traits" disabled />
      <SGInput :model-value="character.deity" label="Deity" disabled />
      <SGInput :model-value="level" label="Level" disabled />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SGInput from '@/components/form/SGInput.vue'
import SGSection from '@/components/layout/SGSection.vue'
import { useMainStore } from '@/stores/main'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  character: Character
}>()

const mainStore = useMainStore()
const userStore = useUserStore()
const { level, characterClasses } = storeToRefs(mainStore)
const { user } = storeToRefs(userStore)

const playerName = user.value?.name || ''

const keySkillOptions = computed(() => props.character.character_classes[0].ability_options)
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
