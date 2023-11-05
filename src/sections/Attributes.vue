<template>
  <SGSection title="Attributes">
    <div class="flex column">
      <template v-for="(ability, key) in abilities" :key="key">
        <SGInput
          :model-value="ability"
          :label="key"
          @update:model-value="(value) => alterAbility(key, value)"
        />
      </template>
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { abilities } = storeToRefs(characterStore)

const alterAbility = (ability: Attribute, value: number) => {
  abilities.value = {
    ...abilities.value,
    [ability]: Number(value)
  }
}
</script>
