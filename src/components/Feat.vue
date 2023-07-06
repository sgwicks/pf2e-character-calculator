<template>
    <SGInput v-model="feat" :label="`Level ${requiredLevel}`" :disabled="level < requiredLevel" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SGInput from './form/SGInput.vue';

import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore()
const { level } = storeToRefs(mainStore)

const props = defineProps<{
    requiredLevel: number
}>()

const feat = ref('')
</script>