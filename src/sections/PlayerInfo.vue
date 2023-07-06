<template>
  <SGSection title="PlayerInfo">
    <div class="player-info">
      <SGInput v-model="playerName" label="Player Name" />
      <SGInput v-model="character.name" label="Character Name" />
      <SGInput v-model="character.ancestry" label="Ancestry & Heritage" />
      <SGInput v-model="character.background" label="Background" />
      <label>
        Character Class
        <select v-model="character.class.name">
          <option
            v-for="characterClass in characterClasses"
            :key="characterClass.name"
            :value="characterClass.name"
          >
            {{ characterClass.name }}
          </option>
        </select>
      </label>
      <label>
        Key Skill
        <select v-model="character.class.keySkill" :disabled="keySkillOptions.length < 2">
          <option v-for="attribute in keySkillOptions" :key="attribute" :value="attribute">
            {{ attribute }}
          </option>
        </select>
      </label>
      <SGInput v-model="character.size" label="Size" />
      <SGInput v-model="character.alignment" label="Alignment" />
      <SGInput v-model="character.traits" label="Traits" />
      <SGInput v-model="character.deity" label="Deity" />
      <SGInput v-model="level" label="Level" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SGInput from '@/components/form/SGInput.vue'
import SGSection from '@/components/layout/SGSection.vue'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { level, characterClasses, character } = storeToRefs(store)

const playerName = ref('')

const keySkillOptions = computed(
  () =>
    characterClasses.value.find(({ name }) => name === character.value.class.name)?.keySkill || []
)

const className = computed(() => character.value.class.name)

watch(
  className,
  (val, oldVal) => {
    if (val !== oldVal) {
      character.value.class.keySkill = keySkillOptions.value[0]
    }
  },
  { deep: true }
)
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
