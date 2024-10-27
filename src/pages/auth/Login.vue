<template>
  <section class="login-section">
      <video class="hero-video" autoplay loop muted playsinline>
          <source src="@/assets/videos/welcome-to-kabaro-app-loop.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      <div class="login-content">
          <div class="login-container">
              <LoginComponent></LoginComponent>
          </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import LoginComponent from '@/components/auth/LoginComponent.vue';
</script>

<style scoped>
.login-section {
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

.login-content {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.login-container {
  width: 60%;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-height: 800px) {
  .login-container {
      margin: 1rem auto;
      padding: 1.5rem;
  }
}
</style>