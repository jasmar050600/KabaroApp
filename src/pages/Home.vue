<template>
  <div class="main-container">
    <!-- Global Header -->
    <GlobalHeader />
    <!-- Hero Section-->
    <div class="section-spacing">
      <HeroSection></HeroSection>
    </div>
    <!-- Time Clock Section -->
    <div class="section-spacing">
      <TimeClock></TimeClock>
    </div>
    <!-- Currency Widget -->
    <div class="section-spacing">
      <Currency></Currency>
    </div>
    <!-- Key Features Section -->
    <div class="section-spacing">
      <KeyFeatures></KeyFeatures>
    </div>
    <!-- Global Footer -->
    <GlobalFooter />
  </div>
</template>

<script>
import GlobalHeader from '@/components/global/GlobalHeader.vue';
import GlobalFooter from '@/components/global/GlobalFooter.vue';
import KeyFeatures from '@/components/features/KeyFeatures.vue';
import TimeClock from '@/components/widgets/TimeClock.vue';
import Currency from '@/components/widgets/Currency.vue';

export default {
  name: 'Home',
  components: {
    GlobalHeader,
    GlobalFooter,
    KeyFeatures,
    TimeClock,
    Currency,
  },
};
</script>

<style scoped>
.section-spacing {
  margin: 4rem 0;
}

.main-container {
  background-color: white;
  min-height: 100vh;
  width: 100%;
}

@media (max-width: 768px) {
  .section-spacing {
    margin: 2rem 0;
  }
}
</style>