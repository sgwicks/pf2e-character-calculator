<template>
  <div class="character-class gap-sm">
    <SGInput :model-value="toTitleCase(characterClass.name)" label="Class" disabled />
    <SGInput :model-value="characterClass.level" label="Level" disabled />
    <SGInput
      :model-value="toTitleCase(characterClass.ability_options[0])"
      label="Key Skill"
      disabled
    />
  </div>
</template>

<script setup lang="ts">
import SGInput from '@/components/form/SGInput.vue'
import { toTitleCase } from '@/utils/index'

defineProps<{
  characterClass: CharacterClass
}>()
</script>

<style lang="scss" scoped>
.character-class {
  display: grid;
  grid-template-columns: 1fr 4em 1fr;
}
</style>
