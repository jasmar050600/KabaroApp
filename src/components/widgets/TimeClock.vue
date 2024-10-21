<template>
  <div class="time-clock-wrapper">
    <div class="clock-container">
      <h2 class="title">World Clock</h2>
      <div class="clock-items-container">
        <template v-for="(zone, index) in timeZones" :key="index">
          <div class="clock-item">
            <div class="location">{{ zone.name }}</div>
            <div class="time">{{ getTime(zone.timezone) }}</div>
            <div class="date">{{ getDate(zone.timezone) }}</div>
          </div>
          <div v-if="index < timeZones.length - 1" class="divider">|</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeClock',
  data() {
    return {
      currentTime: new Date(),
      timer: null,
      timeZones: [
        { name: 'New York', timezone: 'America/New_York' },
        { name: 'London', timezone: 'Europe/London' },
        { name: 'Manila', timezone: 'Asia/Manila' },
        { name: 'Tokyo', timezone: 'Asia/Tokyo' },
        { name: 'Sydney', timezone: 'Australia/Sydney' }
      ]
    }
  },
  methods: {
    updateTime() {
      this.currentTime = new Date()
    },
    getTime(timezone) {
      return this.currentTime.toLocaleTimeString('en-US', { 
        timeZone: timezone, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      })
    },
    getDate(timezone) {
      return this.currentTime.toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    }
  },
  mounted() {
    this.timer = setInterval(this.updateTime, 1000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.time-clock-wrapper {
  max-width: 75%;
  margin: 0 auto;
  padding: 1rem;
  font-family: Poppins, sans-serif;
}

.clock-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.clock-items-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clock-item {
  flex: 1;
  text-align: center;
  padding: 0.5rem;
}

.location {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
}

.time {
  font-size: 1.25rem;
  font-weight: bold;
  color: #4CAF50;
  margin-bottom: 0.25rem;
}

.date {
  font-size: 0.8rem;
  color: #666;
}

.divider {
  font-size: 1.5rem;
  color: #ccc;
  margin: 0 0.5rem;
}

@media (max-width: 768px) {
  .clock-items-container {
    flex-direction: column;
  }

  .clock-item {
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }

  .clock-item:last-child {
    border-bottom: none;
  }

  .divider {
    display: none;
  }
}
</style>