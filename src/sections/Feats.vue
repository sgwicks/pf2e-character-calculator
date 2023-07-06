<template>
    <!-- Ancestry -->
    <SGSection title="Feats">
        <div><h3>Ancestry Feats</h3>
            <Feat :required-level="1" />
            <Feat v-for="level in ancestryFeats" :required-level="level" :key="`ancestry-feat-${level}`" />
        </div>
        <!-- Class -->
        <div>
            <h3>Class Feats</h3>
            <Feat v-for="level in classFeats" :required-level="level" :key="`class-feat-${level}`" />
        </div>
        <!-- Skill -->
        <div>
            <h3>Skill Feats</h3>
            <Feat v-for="level in skillFeats" :required-level="level" :key="`skill-feat-${level}`" />

        </div>
        <!-- General -->
<div>
    <h3>General Feats</h3>
    <Feat v-for="level in generalFeats" :required-level="level" :key="`general-feat-${level}`" />
</div>
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