<template>
  <template v-if="character && action">
    <SGInput v-model="action.name" label="Name" />
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
      <textarea v-model="description"></textarea>
    </label>
  </template>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type TextareaHTMLAttributes } from 'vue'
import SGInput from './form/SGInput.vue'
import ActionIcon from './layout/ActionIcon.vue'
import SGCheckbox from './form/SGCheckbox.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
import { cloneDeep, debounce, isEqual, pickBy } from 'lodash'

import { addCharacterAction, updateCharacterAction } from '@/api/action'

import constants from '@/contstants'

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

const costs: ActionTime[] = ['bonus', 'single', 'double', 'triple', 'reaction']

const characterStore = useCharacterStore()
const { syncApiCharacterDown } = characterStore
const { character } = storeToRefs(characterStore)

const handleActionChange = debounce(async (val: CharacterAction) => {
  if (!character.value || !action.value) return // This makes Typescript happy
  if (!val.name) return // This is a new empty action
  if (isEqual(val, originalAction.value)) return // This is the same action being reloaded
  if (action.value.id === 0) {
    // This is an empty action being updated
    await addCharacterAction(character.value.id, pickBy(val))
    syncApiCharacterDown(character.value.id)
    // After syncing we'll have the new action, so reset this one to empty
    action.value = cloneDeep(emptyAction)
  } else {
    // This is an existing action being updated
    await updateCharacterAction(character.value.id, pickBy(val))
    syncApiCharacterDown(character.value.id)
  }
  originalAction.value = cloneDeep(val)
}, constants.AUTOSAVE_INTERVAL)

const originalAction = ref<CharacterAction | null>(null)
const action = ref<CharacterAction | null>(null)

watch(
  action,
  (val: CharacterAction | null, oldVal) => {
    if (!val || !oldVal) return
    handleActionChange(val)
  },
  { deep: true }
)

const description = computed<TextareaHTMLAttributes['value']>({
  get: () => action.value?.description || '',
  set: (val) => {
    if (!action.value) return
    action.value.description = val?.toString() || null
  }
})

// Needs to be a ref so that radio buttons update on it
const actionTime = ref<ActionTime>('single')
// But we still watch it, so we can change update action when it updates
watch(actionTime, (val) => {
  if (!action.value) return
  action.value.action = val
})

const traits = computed({
  get: () => action.value?.traits?.join(', ') || '',
  set: (val: string) => {
    if (!action.value) return
    const newTraits = val.split(',').map((trait) => trait.trim())
    if (newTraits !== action.value.traits) {
      action.value.traits = newTraits
    }
  }
})

onMounted(() => {
  const characterAction =
    character.value?.actions.find((action) => action.id === props.actionId) || emptyAction
  originalAction.value = cloneDeep(characterAction)
  action.value = cloneDeep(characterAction)
  actionTime.value = characterAction.action
})

/**
 * Spell stuff
 */

const prepared = ref(false)

const components = ref({
  material: false,
  verbal: false,
  somatic: false
})
</script>
