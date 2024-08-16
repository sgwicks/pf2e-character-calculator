<template>
  <SGSection>
    <div class="player-info">
      <SGInput model-value="" label="Player Name" loading />
      <SGInput model-value="" label="Character Name" loading />

      <SGInput model-value="" label="Ancestry" loading />
      <SGInput model-value="" label="Heritage" loading />

      <SGInput model-value="" label="Background" loading />
      <SGInput model-value="" label="Size" loading />

      <SGInput model-value="" label="Deity" loading />
      <SGInput model-value="" label="Traits" loading />

      <!-- <CharacterClasses :character="character" class="col-span-2" /> -->
    </div>
  </SGSection>
</template>

<script setup lang="ts">
import SGSection from '@/components/layout/SGSection.vue'
import SGInput from '@/components/form/SGInput.vue'
</script>
