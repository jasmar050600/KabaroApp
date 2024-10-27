<template>
  <section class="key-features">
    <div class="features-grid">
      <div class="feature-card" v-for="(feature, index) in features" :key="index">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'KeyFeatures',
  data() {
    return {
      features: [
        {
          title: 'Maritime Job Board',
          description: 'Access thousands of maritime career opportunities worldwide, updated daily.'
        },
        {
          title: 'Industry News',
          description: 'Stay informed with the latest maritime industry news and market trends.'
        },
        {
          title: 'Maritime Community',
          description: 'Connect with fellow maritime professionals and expand your network.'
        }
      ]
    }
  },
};
</script>

<style scoped>
.key-features {
  padding: 2rem 2rem 4rem;
  background-color: #ffffff;
  margin: 0 auto;
}

.date-display {
  text-align: center;
  font-size: 1.25rem;
  color: #ff0000;
  margin-bottom: 3rem;
  font-family: Poppins, sans-serif;
  font-weight: 400;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 1rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 180px;
  border: 2px solid transparent;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-color: #8dc63f;
}

.feature-card:active {
  border-color: #333;
  transform: translateY(-2px);
}

.feature-card h3 {
  color: #8dc63f;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-family: Poppins, sans-serif;
  font-weight: bold;
  transition: color 0.3s ease;
}


.feature-card p {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
  max-width: 280px;
  transition: color 0.3s ease;
}

.feature-card:hover p {
  color: black;
}

.feature-card:hover h3 {
  color: rgb(107, 175, 11);
}

@media (max-width: 1024px) {
  .features-grid {
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.75rem;
  }
}

@media (max-width: 768px) {
  .key-features {
    padding: 2rem 1rem 3rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .date-display {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .feature-card {
    padding: 1.5rem;
    min-height: auto;
  }
}

/* Ensure smooth font rendering */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>