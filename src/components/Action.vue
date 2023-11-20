<template>
  <SGInput v-model="action.name" label="Name" />
  <fieldset class="flex">
    <legend>Action</legend>
    <label v-for="cost in costs" class="flex column">
      <ActionIcon :action="cost" :size="16" />
      <input type="radio" name="action" v-model="action.cost" :value="cost" />
    </label>
  </fieldset>
  <div v-if="isSpell">
    <fieldset class="flex">
      <legend>Components</legend>
      <label v-for="(component, key) in components" class="flex column">
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
    v-if="action.cost && ['bonus', 'reaction'].includes(action.cost)"
    v-model="action.trigger"
    label="Trigger"
  />
  <SGInput v-model="traits" label="Traits" />
  <SGInput v-model="action.page" label="Page" />
  <label class="flex column" style="padding: 5px">
    Description
    <textarea v-model="action.description"></textarea>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SGInput from './form/SGInput.vue'
import ActionIcon from './layout/ActionIcon.vue'
import SGCheckbox from './form/SGCheckbox.vue'

const props = defineProps<{
  isSpell?: boolean
}>()

const action = ref<{
  name: string
  cost: ActionTime | null
  traits: string[]
  page: number
  description: string
  trigger: string
}>({
  name: '',
  cost: null,
  traits: [],
  page: 0,
  description: '',
  trigger: ''
})

const traits = computed({
  get: () => action.value.traits.join(', '),
  set: (val) => (action.value.traits = val.split(',').map((trait) => trait.trim()))
})

const costs: ActionTime[] = ['bonus', 'single', 'double', 'triple', 'reaction']

const prepared = ref(false)

const components = ref({
  material: false,
  verbal: false,
  somatic: false
})
</script>
