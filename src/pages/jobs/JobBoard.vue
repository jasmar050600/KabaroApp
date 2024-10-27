<template>
    <div class="page-wrapper">
      <GlobalHeader class="header" />
      
      <div class="content-wrapper">
        <div class="page-container">
          <JobBoardComponent />
        </div>
      </div>
      
      <GlobalFooter class="footer" />
    </div>
  </template>
  
  <script setup lang="ts">
  import GlobalFooter from '@/components/global/GlobalFooter.vue';
  import GlobalHeader from '@/components/global/GlobalHeader.vue';
  import JobBoardComponent from '@/components/jobboard/JobBoardComponent.vue';
  </script>
  
  <style scoped>
  .page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .header {
    flex-shrink: 0;
  }
  
  .content-wrapper {
    flex: 1;
    overflow-y: auto;
    background: #f5f5f5; /* Light background for content area */
  }
  
  .page-container {
    max-width: 1200px;
    margin: 10%;
    padding: 24px;
    min-height: 100%;
  }
  
  .footer {
    flex-shrink: 0;
  }
  </style>