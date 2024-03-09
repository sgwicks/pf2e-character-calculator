<template>
  <div v-if="characterClass" class="character-class gap-sm">
    <label>
      <span>Class</span>
      <select v-model="characterClassModel">
        <option
          v-for="classOption in classOptions"
          :key="classOption"
          :value="classOption.toLowerCase()"
        >
          {{ classOption }}
        </option>
        <option v-if="index > 0" value="remove">{{ '<-- remove -->' }}</option>
      </select>
    </label>
    <SGInput v-model="levelModel" label="Level" />
    <label>
      <span>Key Skill</span>
      <select v-model="selectedAbilityModel">
        <option
          v-for="ability in characterClass.ability_options"
          :key="`ability-option-${ability}`"
          :value="ability"
        >
          {{ toTitleCase(ability) }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SGInput from '@/components/form/SGInput.vue'
import { toTitleCase } from '@/utils/index'
import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { addCharacterClass, removeCharacterClass, updateCharacterClass } from '@/api/character'

const props = defineProps<{
  index: number
  classOptions: CharacterClass['name'][]
}>()

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const characterClass = computed(() => character.value?.character_classes[props.index])

const characterClassModel = computed({
  get: () => characterClass.value?.name,
  set: async (val) => {
    if (!character.value || !characterClass.value || !val) return
    if (val === 'remove') {
      await removeCharacterClass(character.value.id, characterClass.value.id)
    } else {
      await Promise.all([
        removeCharacterClass(character.value.id, characterClass.value.id),
        addCharacterClass(character.value.id, { class_name: val })
      ])
    }
    syncApiCharacterDown(character.value.id)
  }
})

const selectedAbilityModel = computed<string>({
  get: () => characterClass.value?.chosen_ability || characterClass.value?.ability_options[0] || '',
  set: async (val) => {
    if (!character.value || !characterClass.value || !val) return
    await updateCharacterClass(character.value.id, characterClass.value.id, {
      level: characterClass.value.level,
      key_ability: val
    })
    syncApiCharacterDown(character.value.id)
  }
})

const levelModel = computed<number>({
  get: () => characterClass.value?.level || 0,
  set: async (val) => {
    if (!character.value || !characterClass.value || !val) return
    // No point patching if we're not changing anything
    if (val === characterClass.value.level) return
    await updateCharacterClass(character.value.id, characterClass.value.id, { level: val })
    syncApiCharacterDown(character.value.id)
  }
})
</script>

<style lang="scss" scoped>
.character-class {
  display: grid;
  grid-template-columns: 1fr 4em 1fr;
}

select {
  background-color: white;
  border: 1px solid #888;
  margin-top: 5px;
  padding: 2px;
  border-radius: 3px;
}
</style>
