<template>
  <SGSection v-if="character" title="Spells">
    <template v-for="spell in spellList" :key="`spell-${spell.id}`">
      <Action :action-id="spell.id" is-spell />
      <hr />
    </template>
    <Action :action-id="0" is-spell />
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

const spellList = computed(() => character.value?.actions.filter((action) => action.is_spell))
</script>
