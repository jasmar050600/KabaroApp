<template>
  <section class="hero-section">
    <video 
      ref="heroVideo"
      class="hero-video" 
      autoplay 
      muted 
      playsinline
      loop
      preload="auto"
    >
      <source src="@/assets/videos/welcome-to-kabaro-app-loop.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">Welcome to Kabaro App</h1>
      <p class="hero-subtitle">Your Gateway to Maritime Opportunities</p>
      <div class="hero-buttons">
        <router-link to="/jobs" class="primary-btn">Find Jobs</router-link>
        <router-link to="/news" class="secondary-btn">Latest News</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  mounted() {
    // Ensure video plays on mobile devices
    const video = this.$refs.heroVideo;
    
    // Play video when component mounts
    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.log('Video autoplay failed:', err);
      }
    };

    playVideo();

    // Handle visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    });
  },
  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('visibilitychange', () => {});
  }
};
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 80vh;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  text-align: center;
  padding: 0 1rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: Poppins, sans-serif;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.primary-btn, .secondary-btn {
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.primary-btn {
  background: #8cc63e;
  color: white;
  font-family: Poppins, sans-serif;
}

.secondary-btn {
  background: transparent;
  color: white;
  border: 2px solid white;
  font-family: Poppins, sans-serif;
}

.primary-btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}
</style>