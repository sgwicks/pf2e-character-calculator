<template>
  <main>
    <Skills />
    <SGSection title="Skill Feats">
      <Feat
        v-for="level in skillFeats"
        :required-level="level"
        type="S"
        :key="`skill-feat-${level}`"
      />
    </SGSection>
  </main>
</template>

<script setup lang="ts">
import Feat from '@/components/Feat.vue'
import SGSection from '@/components/layout/SGSection.vue'
import Skills from '@/sections/Skills.vue'

import { ref } from 'vue'

const skillFeats = ref<number[]>([])

for (let i = 1; i < 21; i++) {
  if (i % 2 === 0) {
    skillFeats.value.push(i)
  }
}
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1279px) {
    grid-template-columns: 1fr;
  }
}
</style>
