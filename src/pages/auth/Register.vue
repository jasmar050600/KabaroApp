<template>
    <section class="register-section">
        <video class="hero-video" autoplay loop muted playsinline>
            <source src="@/assets/videos/welcome-to-kabaro-app-loop.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
        <div class="register-content">
            <RegisterComponent></RegisterComponent>
        </div>
    </section>
</template>

<script setup lang="ts">
import RegisterComponent from '@/components/auth/RegisterComponent.vue';
</script>

<style scoped>
.register-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    height: auto;
    overflow-y: auto;
}

.hero-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.hero-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
}

.register-content {
    position: relative;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    padding: 2rem 1rem;
}
</style>