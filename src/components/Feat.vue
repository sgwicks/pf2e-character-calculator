<template>
  <SGInput v-model="feat" :label="`Level ${requiredLevel}`" :disabled="level < requiredLevel" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SGInput from './form/SGInput.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { level } = storeToRefs(characterStore)

defineProps<{
  requiredLevel: number
}>()

const feat = ref('')
</script>
