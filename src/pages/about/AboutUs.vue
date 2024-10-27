
// AboutUs.vue
<template>
    <div class="page-wrapper">
        <GlobalHeader class="header" />
        <main class="content-wrapper">
            <AboutUsComponent />
        </main>
        <GlobalFooter class="footer" />
    </div>
</template>

<script setup lang="ts">
import GlobalFooter from '@/components/global/GlobalFooter.vue';
import GlobalHeader from '@/components/global/GlobalHeader.vue';
import AboutUsComponent from '@/components/about/AboutUsComponent.vue';
</script>

<style scoped>
.page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.9);
}

.content-wrapper {
    flex: 1;
    margin-top: 64px;
}
</style>