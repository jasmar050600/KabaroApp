<template>
  <section class="user-posts-section">
    <h2 class="section-title">Community Posts</h2>
    <div class="carousel-container" ref="carousel" @mousedown="startDrag" @mousemove="drag" @mouseup="endDrag"
      @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">
      <div class="carousel-track" :style="{ transform: `translateX(${-offset}px)` }">
        <div v-for="post in duplicatedPosts" :key="post.id" class="post-card">
          <div class="post-header">
            <div class="user-info">
              <img :src="getAvatarUrl(post.userName)" :alt="post.userName" class="user-avatar">
              <div class="user-details">
                <h3 class="user-name">{{ post.userName }}</h3>
                <span class="user-role">{{ post.userRole }}</span>
              </div>
            </div>
            <span class="post-date">{{ post.date }}</span>
          </div>
          <div class="post-content">
            <p>{{ post.content }}</p>
            <img v-if="post.image" :src="post.image" :alt="post.imageAlt" class="post-image" loading="lazy">
          </div>
          <div class="post-footer">
            <div class="interaction-buttons">
              <button class="interact-btn like-btn" :class="{ 'active': post.liked }" @click="toggleLike(post)">
                <i class="fas fa-heart"></i>
                <span>{{ post.likes }}</span>
              </button>
              <button class="interact-btn comment-btn">
                <i class="fas fa-comment"></i>
                <span>{{ post.comments }}</span>
              </button>
            </div>
            <button class="share-btn">
              <i class="fas fa-share"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'UserPosts',
  setup() {
    const carousel = ref(null);
    const offset = ref(0);
    const cardWidth = ref(0);
    const isDragging = ref(false);
    const startX = ref(0);
    const startOffset = ref(0);

    const userPosts = [
      {
        id: 1,
        userName: 'John Smith',
        userRole: 'Chief Engineer',
        content: 'Just completed my certification in Advanced Marine Engineering. Ready for new challenges!',
        date: '2 hours ago',
        likes: 24,
        comments: 5,
        liked: false
      },
      {
        id: 2,
        userName: 'Sarah Chen',
        userRole: 'Project Manager',
        content: 'Leading our team presentation on sustainable energy solutions today. Excited to share our findings!',
        date: '4 hours ago',
        likes: 42,
        comments: 8,
        liked: true
      },
      {
        id: 3,
        userName: 'Mike Johnson',
        userRole: 'Software Developer',
        content: 'Just pushed a major update to our cloud infrastructure. Performance improvements across the board! 🚀',
        date: '6 hours ago',
        likes: 31,
        comments: 12,
        liked: false
      },
      {
        id: 4,
        userName: 'Emily Rodriguez',
        userRole: 'UX Designer',
        content: 'New design system documentation is live! Check it out and let me know your thoughts.',
        date: '1 day ago',
        likes: 56,
        comments: 15,
        liked: true
      },
      {
        id: 5,
        userName: 'David Kim',
        userRole: 'Data Scientist',
        content: 'Fascinating insights from our latest A/B test results. Machine learning models showing 95% accuracy!',
        date: '1 day ago',
        likes: 89,
        comments: 23,
        liked: false
      },
      {
        id: 6,
        userName: 'Lisa Wong',
        userRole: 'Product Owner',
        content: 'Q4 roadmap is finalized. Thanks everyone for their input. Looking forward to an amazing quarter!',
        date: '2 days ago',
        likes: 73,
        comments: 18,
        liked: true
      },
      {
        id: 7,
        userName: 'James Mitchell',
        userRole: 'DevOps Engineer',
        content: 'Successfully migrated our entire infrastructure to Kubernetes. Deployment time reduced by 60%! 💪',
        date: '2 days ago',
        likes: 112,
        comments: 27,
        liked: false
      },
      {
        id: 8,
        userName: 'Anna Kowalski',
        userRole: 'Quality Assurance',
        content: 'New automated testing framework implemented. Coverage now at 92% across all core modules.',
        date: '3 days ago',
        likes: 45,
        comments: 9,
        liked: true
      },
      {
        id: 9,
        userName: 'Robert Taylor',
        userRole: 'Systems Architect',
        content: 'Published my article on microservices architecture best practices. Link in comments!',
        date: '3 days ago',
        likes: 167,
        comments: 34,
        liked: true
      },
      {
        id: 10,
        userName: 'Maria Garcia',
        userRole: 'Frontend Developer',
        content: 'Just launched our new responsive dashboard. Check out the sleek dark mode! 🌙',
        date: '4 days ago',
        likes: 93,
        comments: 21,
        liked: false
      }
    ];

    const duplicatedPosts = computed(() => [...userPosts, ...userPosts, ...userPosts]);

    const startDrag = (e) => {
      isDragging.value = true;
      startX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      startOffset.value = offset.value;
      if (carousel.value) {
        carousel.value.style.cursor = 'grabbing';
      }
    };

    const drag = (e) => {
      if (!isDragging.value) return;
      const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const diff = startX.value - currentX;
      offset.value = startOffset.value + diff;
      checkBoundary();
    };

    const endDrag = () => {
      isDragging.value = false;
      if (carousel.value) {
        carousel.value.style.cursor = 'grab';
      }
    };

    const checkBoundary = () => {
      const maxOffset = cardWidth.value * userPosts.length;
      if (offset.value < 0) {
        offset.value += maxOffset;
      } else if (offset.value >= maxOffset) {
        offset.value -= maxOffset;
      }
    };

    let animationId;
    const animate = () => {
      offset.value += 0.5;
      checkBoundary();
      animationId = requestAnimationFrame(animate);
    };

    onMounted(() => {
      if (carousel.value) {
        cardWidth.value = carousel.value.offsetWidth;
        animationId = requestAnimationFrame(animate);
      }
    });

    onUnmounted(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });

    const getAvatarUrl = (name) => {
      const encodedName = encodeURIComponent(name);
      return `https://ui-avatars.com/api/?name=${encodedName}&background=8cc63e&color=fff&size=40&bold=true&rounded=true`;
    };

    const toggleLike = (post) => {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    };

    return {
      carousel,
      offset,
      duplicatedPosts,
      startDrag,
      drag,
      endDrag,
      getAvatarUrl,
      toggleLike
    };
  }
};
</script>

<style scoped>
.user-posts-section {
  padding: 2rem;
  max-width: 80%;
  margin: 0 auto;
  position: relative;
}

.section-title {
  color: #1e2124;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: grab;
  padding: 1rem;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.carousel-container:hover {
  border-color: #8dc63f;
}

.carousel-container:active {
  cursor: grabbing;
  border-color: #8dc63f;
}

.carousel-track {
  display: flex;
  transition: transform 0.1s ease;
}

.post-card {
  flex: 0 0 100%;
  padding: 2rem;
  box-sizing: border-box;
  background: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  max-height: 250px;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.post-card:active {
  cursor: grabbing;
  border-color: #8dc63f;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: #1e2124;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.user-role {
  color: #666;
  font-size: 0.85rem;
}

.post-date {
  color: #666;
  font-size: 0.85rem;
}

.post-content {
  color: #333;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 1rem 0;
}

.post-image {
  width: 100%;
  border-radius: 8px;
  margin-top: 1rem;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.interaction-buttons {
  display: flex;
  gap: 1rem;
}

.interact-btn {
  background: none;
  border: none;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.interact-btn:hover,
.interact-btn.active {
  color: #8cc63e;
}

.share-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.share-btn:hover {
  color: #8cc63e;
}

@media (max-width: 768px) {
  .user-posts-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .post-card {
    padding: 1.5rem;
  }
}
</style>