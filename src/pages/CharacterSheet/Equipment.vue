<template>
  <main v-if="character">
    <ArmourClass class="armour" />
    <div class="shield">
      <Armour class="flex-wrap" />

      <Shield class="flex wrap" />
    </div>
    <WeaponList />
  </main>
</template>

<script setup lang="ts">
import Armour from '@/components/equipment/Armour.vue'
import ArmourClass from '@/sections/ArmourClass.vue'
import Shield from '@/components/equipment/Shield.vue'
import WeaponList from '@/sections/WeaponList.vue'

import { useCharacterStore } from '@/stores/character'
import { storeToRefs } from 'pinia'
const characterStore = useCharacterStore()
const { character } = storeToRefs(characterStore)
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  grid-template-areas:
    '. armour'
    '. shield';
  column-gap: 1em;

  @media (max-width: 1279px) {
    grid-template-areas: 'armour' 'shield';
  }
}

.armour {
  grid-area: armour;
}

.shield {
  grid-area: shield;
}
</style>
