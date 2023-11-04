<template>
  <div style="text-align: center">
    There was an error:
    <div class="margin-y-sm" style="color: red">{{ error }}</div>
    (log it somehow)
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { storeToRefs } from 'pinia'

const errorStore = useErrorStore()
const { error } = storeToRefs(errorStore)
</script>
