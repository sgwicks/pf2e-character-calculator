<template>
  <template v-if="character">
    <SGInput v-model="name" label="Name" />
    <fieldset class="flex">
      <legend>Action</legend>
      <label v-for="cost in costs" :key="`${action.id}-${cost}`" class="flex column">
        <ActionIcon :action="cost" :size="16" />
        <input
          type="radio"
          :id="`${action.id}-action-${cost}`"
          v-model="actionTime"
          :value="cost"
        />
      </label>
    </fieldset>
    <div v-if="isSpell">
      <fieldset class="flex">
        <legend>Components</legend>
        <label v-for="(component, key) in components" :key="key" class="flex column">
          {{ key[0].toUpperCase() }}
          <SGCheckbox v-model="components[key]" />
        </label>
      </fieldset>
      <label>
        Prepared
        <SGCheckbox v-model="prepared" />
      </label>
    </div>
    <SGInput
      v-if="action.action && ['bonus', 'reaction'].includes(action.action)"
      v-model="action.trigger"
      label="Trigger"
    />
    <SGInput v-model="traits" label="Traits" />
    <SGInput v-model="action.source_book" label="Source Book" />
    <SGInput v-model="action.source_page" label="Page" />
    <label class="flex column" style="padding: 5px">
      Description
      <textarea :model-value="action.description"></textarea>
    </label>
  </template>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import SGInput from './form/SGInput.vue'
import ActionIcon from './layout/ActionIcon.vue'
import SGCheckbox from './form/SGCheckbox.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { debounce, pickBy } from 'lodash'

import { addCharacterAction, updateCharacterAction } from '@/api/action'

const props = defineProps<{
  actionId: number
  isSpell?: boolean
}>()

const emptyAction: CharacterAction = {
  id: 0,
  name: '',
  description: null,
  action: 'single',
  traits: [],
  trigger: null,
  source_book: null,
  source_page: null,
  is_spell: props.isSpell,
  components: null
}

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const action = computed<CharacterAction>({
  get: () => character.value?.actions.find((action) => action.id === props.actionId) || emptyAction,
  set: debounce(async (val: CharacterAction) => {
    if (!character.value) return
    if (val.id === 0) {
      await addCharacterAction(character.value.id, pickBy(val))
      syncApiCharacterDown(character.value.id)
    } else {
      await updateCharacterAction(character.value.id, pickBy(val))
      syncApiCharacterDown(character.value.id)
    }
  }, 300)
})

const name = computed<string>({
  get: () => action.value.name,
  set: (val: string) => {
    if (val !== action.value.name) {
      action.value = { ...action.value, name: val }
    }
  }
})

// Needs to be a ref so that radio buttons update on it
const actionTime = ref<ActionTime>('single')
// But we still watch it, so we can change update action when it updates
watch(actionTime, (val) => {
  if (val !== action.value.action) {
    action.value = { ...action.value, action: val }
  }
})

onMounted(() => {
  actionTime.value = action.value.action
})

const traits = computed({
  get: () => action.value.traits?.join(', ') || '',
  set: (val: string) => (action.value.traits = val.split(',').map((trait) => trait.trim()))
})

const costs: ActionTime[] = ['bonus', 'single', 'double', 'triple', 'reaction']

const prepared = ref(false)

const components = ref({
  material: false,
  verbal: false,
  somatic: false
})
</script>
