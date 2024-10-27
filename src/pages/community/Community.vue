<template>
    <div class="page-wrapper">
        <GlobalHeader class="header" />

        <main class="content-wrapper">
            <div class="page-container">
                <h2 class="community-title">Maritime Community</h2>
                <div class="community-container">
                    <CommunityComponent></CommunityComponent>
                </div>
            </div>
        </main>

        <GlobalFooter class="footer" />
    </div>
</template>

<script setup lang="ts">
import GlobalFooter from '@/components/global/GlobalFooter.vue';
import GlobalHeader from '@/components/global/GlobalHeader.vue';
import CommunityComponent from '@/components/community/CommunityComponent.vue';
</script>

<style scoped>
.page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header {
    flex-shrink: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
}

.content-wrapper {
    flex: 1;
    overflow-y: auto;
    background: #f5f5f5;
    margin-top: 84px;
    margin-bottom: 84px;
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.community-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #1e2124;
    margin: 0;
    padding: 0.5rem 0 1.5rem 0;
    position: relative;
    letter-spacing: -0.01em;
    text-align: center;
}

.page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.community-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 800px;
}

.footer {
    flex-shrink: 0;
    margin-top: auto;
}
</style>