<template>
  <div>
    <CharacterClass :index="0" :class-options="characterClassOptions" />
  </div>
</template>

<script setup lang="ts">
import CharacterClass from './CharacterClass.vue'
import { fetchCharacterClasses } from '@/api/character'
import { onBeforeMount, ref, type Ref } from 'vue'

defineProps<{
  character: Character
}>()

const characterClassOptions: Ref<CharacterClass['name'][]> = ref([])

onBeforeMount(async () => {
  const response = await fetchCharacterClasses()
  characterClassOptions.value = response.data.data.map((item: CharacterClass) => item.name)
})
</script>
