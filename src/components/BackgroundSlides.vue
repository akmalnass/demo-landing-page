<script setup lang="ts">
defineProps<{ images: string[]; active: number }>();
</script>

<template>
    <div class="bg" aria-hidden="true">
        <div
            v-for="(img, i) in images"
            :key="img"
            class="slide"
            :class="{ active: i === active }"
            :style="{ backgroundImage: `url(${img})` }"
        />
        <div class="overlay" />
        </div>
</template>

<style scoped>
.bg {
    position: fixed;
    inset: 0;
    z-index: -1;
}

.slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1s ease;
}
.slide.active {
    opacity: 1;
}
.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0 / 0.45);
}
</style>