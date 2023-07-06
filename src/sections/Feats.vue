<template>
    <!-- Ancestry -->
    <SGSection title="Ancestry Feats">
        <Feat :required-level="1" />
        <Feat v-for="level in ancestryFeats" :required-level="level" :key="`ancestry-feat-${level}`" />
    </SGSection>
    <!-- Class -->
    <SGSection title="Class Feats">
        <Feat v-for="level in classFeats" :required-level="level" :key="`class-feat-${level}`" />
    </SGSection>
    <!-- Skill -->
    <SGSection title="Skill Feats">
        <Feat v-for="level in skillFeats" :required-level="level" :key="`skill-feat-${level}`" />
    </SGSection>
    <!-- General -->
    <SGSection title="General Feats">
        <Feat v-for="level in generalFeats" :required-level="level" :key="`general-feat-${level}`" />
    </SGSection>
</template>

<script setup lang="ts">
import Feat from '@/components/Feat.vue';
import SGSection from '@/components/layout/SGSection.vue';
import { ref } from 'vue';

const skillFeats = ref<number[]>([])
const generalFeats = ref<number[]>([3, 7, 11, 15, 19])
const ancestryFeats = ref([1, 5, 9, 13, 17])
const classFeats = ref([1])

for (let i = 1; i < 21; i++) {
    if (i % 2 === 0) {
        skillFeats.value.push(i)
        classFeats.value.push(i)
    }
}
</script>