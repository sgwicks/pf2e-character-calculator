<template>
  <main>
    <Armour class="armour" />
    <Shield class="shield" />
    <ArmourClass class="armour-class" />
    <WeaponList class="weapons" />
  </main>
</template>

<script setup lang="ts">
import Armour from '@/components/equipment/Armour.vue'
import ArmourClass from '@/sections/ArmourClass.vue'
import Shield from '@/components/equipment/Shield.vue'
import WeaponList from '@/sections/WeaponList.vue'
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
}

.armour,
.armour-class,
.shield {
  padding-block: 1em;
}

.armour-class {
  grid-column: 2/3;
  grid-row: 1/2;
  z-index: 1;
}

.armour {
  grid-column: 2/3;
  grid-row: 2/3;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
}

.shield {
  grid-column: 2/3;
  grid-row: 3/4;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
}

.weapons {
  grid-column: 1/3;
  grid-row: 1/-1;
}
</style>
