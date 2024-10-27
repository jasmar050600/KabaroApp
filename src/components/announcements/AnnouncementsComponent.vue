<!-- Announcements.vue -->
<template>
  <section class="announcements-section">
    <h2 class="section-title">Latest Announcements</h2>
    <div class="announcements-grid">
      <div v-for="announcement in announcements" :key="announcement.id" class="announcement-card"
        :class="{ 'priority': announcement.isPriority }">
        <div class="announcement-header">
          <span class="announcement-tag" :class="announcement.type">
            {{ announcement.type }}
          </span>
          <span class="announcement-date">{{ announcement.date }}</span>
        </div>
        <h3 class="announcement-title">{{ announcement.title }}</h3>
        <p class="announcement-content">{{ announcement.content }}</p>
        <router-link :to="announcement.link" class="read-more">
          Read More
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Announcements',
  data() {
    return {
      announcements: [
        {
          id: 1,
          type: 'news',
          title: 'Maritime Industry Summit 2024',
          content: 'Join us for the annual Maritime Industry Summit. Network with industry leaders and gain valuable insights.',
          date: 'Nov 18, 2024',
          isPriority: false,
          link: '/announcements/industry-summit'
        },
        {
          id: 2,
          type: 'maintenance',
          title: 'Scheduled Maintenance Notice',
          content: 'Platform maintenance scheduled for November 25th. Some features may be temporarily unavailable.',
          date: 'Nov 25, 2024',
          isPriority: false,
          link: '/announcements/maintenance'
        },
        {
          id: 3,
          type: 'update',
          title: 'New Job Alert Features Released',
          content: 'We have enhanced our job alert system with customizable filters and instant notifications. Find your perfect maritime position faster than ever.',
          date: 'Oct 20, 2024',
          isPriority: true,
          link: '/announcements/job-alerts-update'
        }
      ]
    }
  }
}
</script>

<style scoped>
.announcements-section {
  padding: 2rem;
  width: 75%;
  margin: 0 auto;
}

.section-title {
  color: #1e2124;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: Poppins, sans-serif;
  font-weight: 600;
}

.announcements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.announcement-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.announcement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.announcement-card:active {
  cursor: grabbing;
  border-color: #8dc63f;
}

.announcement-card.priority {
  border-left: 4px solid #8cc63e;
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.announcement-tag {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.announcement-tag.update {
  background: #e3f2fd;
  color: #1976d2;
}

.announcement-tag.news {
  background: #e8f5e9;
  color: #2e7d32;
}

.announcement-tag.maintenance {
  background: #fff3e0;
  color: #f57c00;
}

.announcement-date {
  color: #666;
  font-size: 0.9rem;
}

.announcement-title {
  color: #1e2124;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  font-family: Poppins, sans-serif;
  font-weight: 600;
}

.announcement-content {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  color: #8cc63e;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #7ab52f;
}

@media (max-width: 768px) {
  .announcements-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .announcements-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>