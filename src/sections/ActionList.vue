<template>
  <SGSection v-if="character" title="Actions">
    <Action v-for="action in character.actions" :key="action.id" :actionId="action.id" />
    <hr />
    <Action :actionId="0" />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import Action from '@/components/Action.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { character } = storeToRefs(characterStore)
</script>
