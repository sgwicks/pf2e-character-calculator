<template>
  <SGSection title="Character Class">
    <div class="grid columns-2 gap-lg">
      <CharacterClass
        v-for="character_class in character.character_classes"
        :key="'class-' + character_class.id"
        :character-class="character_class"
      />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import CharacterClass from './CharacterClass.vue'

defineProps<{
  character: Character
}>()
</script>
