<template>
    <div class="page-wrapper">
        <GlobalHeader class="header" />

        <main class="content-wrapper">
            <div class="page-container">
                <h2 class="user-feed-title">User Feeds</h2>
                <div class="feed-container">
                    <UserFeedComponent></UserFeedComponent>
                </div>
            </div>
        </main>

        <GlobalFooter class="footer" />
    </div>
</template>

<script setup lang="ts">
import GlobalFooter from '@/components/global/GlobalFooter.vue';
import GlobalHeader from '@/components/global/GlobalHeader.vue';
import UserFeedComponent from '@/components/userfeed/UserFeedComponent.vue';
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
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.user-feed-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #1e2124;
    margin: 0;
    padding: 0.5rem 0 1.5rem 0;
    position: relative;
    letter-spacing: -0.01em;
    text-align: center; /* Center the title text */
}

.page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
    display: flex; /* Add flex display */
    flex-direction: column; /* Stack children vertically */
    align-items: center; /* Center children horizontally */
}

.feed-container {
    display: flex;
    flex-direction: column; /* Stack feed items vertically */
    align-items: center; /* Center feed items horizontally */
    width: 100%;
    max-width: 800px; /* Optional: limit the width of the feed for better readability */
}

.footer {
    flex-shrink: 0;
    margin-top: auto;
}
</style>
