<template>
  <SGSection title="Skills">
    <div class="skill-grid">
      <Skill v-for="skill in skills" :skill="skill" :key="skill.name" />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import Skill from '@/components/Skill.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { skills } = storeToRefs(characterStore)
</script>

<style scoped>
.skill-grid {
  display: grid;
  grid-auto-rows: 5em;
  gap: 0.25em;
  align-items: end;

  @media (max-width: 1279px) {
    grid-template-columns: 4em repeat(3, 3em) 3.3em auto;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 4em repeat(7, 2em) 3.3em auto;
  }
}

/* Sames CSS class as a label.number */
.blank-input {
  margin: 8px 4px;
  width: 4em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 8px 4px;
  text-transform: capitalize;
  justify-content: space-between;
  font-weight: 600;
  height: 4em;
  font-size: 0.8rem;
}
</style>
