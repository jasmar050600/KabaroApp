<template>
  <section class="hero-section">
    <video 
      ref="videoPlayer"
      class="hero-video" 
      :src="videoSource"
      loop
      muted
      playsinline
      preload="auto"
      disablepictureinpicture 
      disableremoteplayback
      controlslist="nodownload noplaybackrate"
      @canplay="handleCanPlay"
      @loadedmetadata="startPlayback"
      @suspend="handleSuspend"
      @error="handleError"
    >
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
// Import the video directly
import videoSource from '@/assets/videos/welcome-to-kabaro-app-loop.mp4'

export default {
  name: 'HeroSection',
  
  data() {
    return {
      videoSource,
      isVideoLoaded: false,
      playAttempts: 0,
      maxPlayAttempts: 3
    }
  },

  methods: {
    handleCanPlay() {
      this.isVideoLoaded = true;
      this.startPlayback();
    },

    startPlayback() {
      const video = this.$refs.videoPlayer;
      if (!video || this.playAttempts >= this.maxPlayAttempts) return;

      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Reset attempts on successful play
          this.playAttempts = 0;
          console.log('Video started playing successfully');
        }).catch(error => {
          console.warn('Autoplay prevented:', error);
          this.playAttempts++;
          
          // Retry with a slight delay
          if (this.playAttempts < this.maxPlayAttempts) {
            setTimeout(() => {
              this.startPlayback();
            }, 1000);
          }
        });
      }
    },

    handleSuspend() {
      if (!this.isVideoLoaded) {
        this.startPlayback();
      }
    },

    handleError(error) {
      console.error('Video error:', error);
    },

    initializeVideo() {
      const video = this.$refs.videoPlayer;
      if (video) {
        video.defaultMuted = true;
        video.muted = true;
        this.startPlayback();
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initializeVideo();
      
      // Add intersection observer for better performance
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.startPlayback();
            } else {
              if (this.$refs.videoPlayer) {
                this.$refs.videoPlayer.pause();
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      if (this.$el) {
        observer.observe(this.$el);
      }

      // Cleanup observer on component destroy
      this.$once('hook:beforeDestroy', () => {
        observer.disconnect();
      });
    });
  },

  beforeDestroy() {
    if (this.$refs.videoPlayer) {
      this.$refs.videoPlayer.pause();
      this.$refs.videoPlayer.removeAttribute('src');
      this.$refs.videoPlayer.load();
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 80vh;
  overflow: hidden;
  background-color: #1a1a1a; /* Fallback color if video fails to load */
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
}

/* Hide all video controls */
.hero-video::-webkit-media-controls,
.hero-video::-webkit-media-controls-panel,
.hero-video::-webkit-media-controls-play-button,
.hero-video::-webkit-media-controls-start-playback-button,
.hero-video::-webkit-media-controls-cast-button,
.hero-video::-webkit-media-controls-overlay-play-button,
.hero-video::-webkit-media-controls-overlay-play-button-placeholder {
  display: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  opacity: 0 !important;
}

.hero-video::-webkit-media-controls-enclosure {
  display: none !important;
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
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: Poppins, sans-serif;
}

.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.primary-btn,
.secondary-btn {
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 140px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.primary-btn {
  background: #8cc63e;
  color: white;
  border: 2px solid #8cc63e;
  font-family: Poppins, sans-serif;
}

.secondary-btn {
  background: transparent;
  color: white;
  border: 2px solid white;
  font-family: Poppins, sans-serif;
}

.primary-btn:hover {
  background: #7db32e;
  transform: translateY(-2px);
  border-color: #7db32e;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
  }

  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    gap: 0.75rem;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
  }
}

.hero-video:not([playsinline]) {
  display: none;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  z-index: 0;
}

.hero-content {
  user-select: none;
  -webkit-user-select: none;
}
</style>