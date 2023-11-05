<template>
  <SGInput :model-value="save" disabled :label="title" />
  <span class="equals" />
  <SGInput :model-value="value" :label="attribute.slice(0, 3)" disabled />
  <span class="plus" />
  <SGInput :model-value="getProficiencyValue(proficiency)" label="prof" disabled />
  <span class="plus" />
  <SGInput v-model="item" label="Item" />
  <ProficiencyLevel v-model="proficiency" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  title: string
  attribute: Attribute
}>()

const characterStore = useCharacterStore()
const { abilities } = storeToRefs(characterStore)
const value = computed(() => abilities.value[props.attribute] || 0)

const { getProficiencyValue } = useCharacterStore()

const proficiency = ref(0)
const item = ref(0)

const save = computed(() => value.value + getProficiencyValue(proficiency.value) + item.value)
</script>
