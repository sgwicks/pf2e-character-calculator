<template>
  <SGSection v-if="character" title="Actions">
    <template v-for="action in actionList" :key="action.id">
      <Action :actionId="action.id" />
      <hr />
    </template>
    <Action :actionId="0" />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import Action from '@/components/Action.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

import { computed } from 'vue'

const characterStore = useCharacterStore()

const { character } = storeToRefs(characterStore)

const actionList = computed(() => character.value?.actions.filter((action) => !action.is_spell))
</script>
