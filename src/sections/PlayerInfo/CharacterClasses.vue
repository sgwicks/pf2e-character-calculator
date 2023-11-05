<template>
  <SGSection title="Character Class">
    <div class="grid columns-2 gap-lg">
      <CharacterClass
        v-for="(character_class, i) in character.character_classes"
        :key="'class-' + character_class.id"
        :index="i"
        :class-options="characterClassOptions"
      />
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
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
