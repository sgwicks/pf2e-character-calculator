<template>
  <SGSection title="Perception">
    <SGInput :model-value="perception" label="Per" disabled />
    <span class="equals" />
    <SGInput :model-value="wisdom" label="Wis" disabled />
    <ProficiencyLevel v-model="proficiency" />
    <SGInput v-model="item" label="Item" />
    <SGInput v-model="senses" label="Senses" style="width: 100%" />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'

import { useCharacterStore } from '@/stores/character'

import { ref, computed } from 'vue'

const props = defineProps<{
  wisdom: number
}>()

const { getProficiencyValue } = useCharacterStore()

const proficiency = ref(0)
const item = ref(0)

const perception = computed(
  () => props.wisdom + getProficiencyValue(proficiency.value) + item.value
)

const senses = ref('')
</script>
