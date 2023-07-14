<template>
  <SGInput :model-value="save" disabled :label="title" />
  <span class="equals" />
  <SGInput :model-value="getAttributeModifier(attribute)" :label="attribute.slice(0, 3)" disabled />
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

import { useMainStore } from '@/stores/main'
import { useAttributeStore } from '@/stores/attribute'

const props = defineProps<{
  title: string
  attribute: string
}>()

const { getProficiencyValue } = useMainStore()
const { getAttributeModifier } = useAttributeStore()
const proficiency = ref(0)
const item = ref(0)

const save = computed(
  () => getAttributeModifier(props.attribute) + getProficiencyValue(proficiency.value) + item.value
)
</script>
