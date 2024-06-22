<template>
  <SGInput
    :model-value="
      abilities[skill.ability] +
      getProficiencyValue(skill.proficiency) +
      skill.item +
      armourCheckPenalty
    "
    :label="skill.name"
    disabled
  />
  <span class="equals" />
  <SGInput :model-value="abilities[skill.ability]" :label="skill.ability.slice(0, 3)" disabled />
  <span class="plus" />
  <SGInput :model-value="getProficiencyValue(skill.proficiency)" label="Prof" disabled />
  <span class="plus" />
  <SGInput
    label="Item"
    :model-value="skill.item"
    @update:model-value="(val) => (updateables.item = val)"
  />
  <template v-if="skill.armour">
    <span class="plus" />
    <SGInput :model-value="armourCheckPenalty" label="Armour" disabled />
  </template>
  <template v-else>
    <span class="plus" style="color: white" aria-hidden />
    <div class="blank-input"></div>
  </template>
  <ProficiencyLevel
    :model-value="skill.proficiency"
    @update:model-value="(val) => (updateables.proficiency = val)"
  />
</template>

<script lang="ts" setup>
import SGInput from '@/components/form/SGInput.vue'
import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { updateSkillProficiency } from '@/api/skill'
import ProficiencyLevel from '@/components/form/ProficiencyLevel.vue'
import { computed, ref, watch } from 'vue'
import { debounce } from 'lodash'
import constants from '@/constants'

const props = defineProps<{
  skill: Skill
}>()

const characterStore = useCharacterStore()
const { getProficiencyValue, getArmourCheckPenalty, syncApiCharacterDown } = characterStore
const { character, abilities } = storeToRefs(characterStore)

const armourCheckPenalty = computed(() => getArmourCheckPenalty())

const updateables = ref({
  item: props.skill.item,
  proficiency: props.skill.proficiency
})

watch(
  updateables,
  () => {
    handleSkillUpdate()
  },
  { deep: true }
)

const handleSkillUpdate = debounce(async () => {
  if (!character.value) return
  await updateSkillProficiency(
    character.value.id,
    props.skill.id,
    updateables.value.proficiency,
    updateables.value.item
  )
  syncApiCharacterDown(character.value.id)
}, constants.AUTOSAVE_INTERVAL)
</script>
@/constants
