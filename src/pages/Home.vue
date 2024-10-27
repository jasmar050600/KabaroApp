<template>
  <div class="main-container">
    <!-- Global Header -->
    <GlobalHeader />

    <!-- Hero Section-->
    <div class="section-spacing">
      <HeroSection></HeroSection>
    </div>

    <!-- Announcements Section -->
    <div class="section-spacing">
      <Announcements></Announcements>
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

    <!-- Community Posts Section -->
    <div class="section-spacing">
      <CommunityPostsComponent></CommunityPostsComponent>
    </div>

    <!-- Job Board Section with Browse Jobs Button -->
    <div class="jobs-container">
      <div class="jobs-header">
        <h2 class="jobs-title">Job Postings</h2>
      </div>
      <div class="section-spacing">
        <JobBoardComponent></JobBoardComponent>
      </div>

      <div class="browse-jobs-container">
        <router-link to="/jobs/jobboard" class="browse-jobs-button">
          Browse More
        </router-link>
      </div>
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
import Announcements from '@/components/announcements/AnnouncementsComponent.vue';
import CommunityPostsComponent from '@/components/community/CommunityPostsComponent.vue';
import JobBoardComponent from '@/components/jobboard/JobBoardComponent.vue';
import HeroSection from '@/components/hero/HeroSection.vue';

export default {
  name: 'Home',
  components: {
    GlobalHeader,
    GlobalFooter,
    KeyFeatures,
    TimeClock,
    Currency,
    Announcements,
    CommunityPostsComponent,
    JobBoardComponent,
    HeroSection
  },
};
</script>

<style scoped>
.main-container {
  background-color: white;
  min-height: 100vh;
  width: 100%;
}

.section-spacing {
  margin: 4rem 0;
}

.jobs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.jobs-header {
  width: 100%;
  text-align: center;
}

.jobs-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1e2124;
  margin: 0;
  padding: 1rem 0;
}

.browse-jobs-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem 0 4rem 0;
}

.browse-jobs-button {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: #8dc63f;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.browse-jobs-button:hover {
  background-color: #7db32e;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .jobs-title {
    font-size: 1.25rem;
  }
  
  .browse-jobs-container {
    padding: 1.5rem 0 3rem 0;
  }
  
  .browse-jobs-button {
    padding: 0.625rem 1.5rem;
    font-size: 0.875rem;
  }
}
</style>