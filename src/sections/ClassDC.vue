<template>
  <SGSection title="Class DC">
    <SGInput :model-value="classDC" label="Total" disabled />
    <span class="equals" />
    <SGInput :model-value="10" disabled label="Base" class="number-input" />
    <span class="plus" />
    <SGInput :model-value="getClassKeySkill(0)" label="Key" disabled />
    <span class="plus" />
    <SGInput :model-value="getProficiencyValue(proficiency)" label="Prof" disabled />
    <ProficiencyLevel v-model="proficiency" />
    <span class="plus" />
    <SGInput v-model="item" label="Item" />
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'
import { computed, ref } from 'vue'

import { useCharacterStore } from '@/stores/character'

const { getProficiencyValue, getClassKeySkill } = useCharacterStore()

const classDC = computed(
  () => 10 + getClassKeySkill(0) + getProficiencyValue(proficiency.value) + item.value
)

const proficiency = ref(0)
const item = ref(0)
</script>
