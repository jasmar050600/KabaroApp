<template>
    <section class="community-section">
        <div class="max-w-xl mx-auto">
            <div v-for="post in posts" :key="post.id" class="post-card mb-4">
                <!-- Post Header -->
                <div class="post-header">
                    <div class="user-info">
                        <img :src="getAvatarUrl(post.userName)" :alt="post.userName" class="user-avatar">
                        <div class="user-details">
                            <h3 class="user-name">{{ post.userName }}</h3>
                            <div class="flex items-center text-sm text-gray-500">
                                <span class="user-role">{{ post.userRole }}</span>
                                <span class="mx-1">•</span>
                                <span class="post-date">{{ post.date }}</span>
                            </div>
                        </div>
                    </div>
                    <button class="close-btn">
                        <span class="sr-only">Close</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </button>
                </div>

                <!-- Post Content -->
                <div class="post-content">
                    <p>{{ post.content }}</p>
                </div>

                <!-- Post Image (if available) -->
                <div v-if="post.image" class="post-image-container">
                    <img :src="post.image" :alt="post.imageAlt" class="post-image">
                </div>

                <!-- Engagement Stats -->
                <div class="engagement-stats">
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{{ post.likes }} reactions</span>
                        <span>•</span>
                        <span>{{ post.comments }} comments</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="post-actions">
                    <button class="action-btn" :class="{ 'active': post.liked }" @click="toggleLike(post)">
                        <span class="text-xl">❤️</span>
                        <span>Like</span>
                    </button>
                    <button class="action-btn">
                        <span class="text-xl">💬</span>
                        <span>Comment</span>
                    </button>
                    <button class="action-btn">
                        <span class="text-xl">🔁</span>
                        <span>Share</span>
                    </button>
                    <button class="action-btn">
                        <span class="text-xl">🏷️</span>
                        <span>Follow</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import BeachCleanupImg from '@/assets/images/community/beach-cleanup.jpg';
import HeavyWeatherImg from '@/assets/images/community/heavy-weather.jpeg';
import ContainerVesselPostingImg from '@/assets/images/community/container-vessel-posting.jpeg';
import RoutingSoftwareImg from '@/assets/images/community/routing-software-image.jpeg';

defineOptions({
    name: 'CommunityComponent'
});

const posts = ref([
    {
        id: 1,
        userName: 'Maritime Safety Forum',
        userRole: 'Community Group',
        content: 'Join our weekly safety discussion! This week\'s topic: "Best Practices for Heavy Weather Navigation." Share your experiences and learn from fellow mariners. Live session starts at 1400 UTC. #MaritimeSafety',
        date: '20m',
        likes: 156,
        comments: 32,
        liked: false,
        image: HeavyWeatherImg
    },
    {
        id: 2,
        userName: 'Filipino Seafarers Hub',
        userRole: 'Community Group',
        content: 'Looking for Filipino crew members! Multiple positions available for a container vessel. Requirements: Valid STCW, minimum 2 years experience. DM for details. #SeafarerJobs #MaritimePH',
        date: '1h',
        likes: 423,
        comments: 89,
        liked: false,
        image: ContainerVesselPostingImg
    },
    {
        id: 3,
        userName: 'Maritime Wellness Circle',
        userRole: 'Support Group',
        content: 'Monthly virtual meetup for seafarers families! Join us this Saturday for games, sharing sessions, and support network building. Special guest: Professional family counselor Ms. Ana Reyes. 🤗',
        date: '2h',
        likes: 234,
        comments: 45,
        liked: false,
        image: null
    },
    {
        id: 4,
        userName: 'Tech Savvy Seafarers',
        userRole: 'Discussion Group',
        content: 'NEW POLL: What is your preferred weather routing software? Share your experiences and help fellow mariners make informed decisions! #MaritimeTech #Navigation',
        date: '4h',
        likes: 567,
        comments: 142,
        liked: false,
        image: RoutingSoftwareImg
    },
    {
        id: 5,
        userName: 'Green Maritime Initiative',
        userRole: 'Environmental Group',
        content: 'Success story: Our beach cleanup drive collected over 500kg of plastic waste! Big thanks to all volunteers from the maritime community. Together, we make a difference! 🌊🌱 #SaveOurOceans',
        date: '6h',
        likes: 789,
        comments: 156,
        liked: false,
        image: BeachCleanupImg
    },
    {
        id: 6,
        userName: 'Maritime Culture Exchange',
        userRole: 'Cultural Group',
        content: 'Celebrate Maritime Day with us! Virtual cultural showcase featuring traditional songs, dances, and stories from different seafaring nations. Register now for this Saturday\'s event! 🎭🎨',
        date: '8h',
        likes: 345,
        comments: 67,
        liked: false,
        image: null
    }
]);

const getAvatarUrl = (name) => {
    const encodedName = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${encodedName}&background=5FB03F&color=fff&size=128&bold=true`;
};

const toggleLike = (post) => {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
};
</script>

<style scoped>
.post-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    object-fit: cover;
    transition: transform 0.2s ease;
}

.user-avatar:hover {
    transform: scale(1.05);
}

.user-name {
    font-weight: 600;
    color: #111827;
    font-size: 0.975rem;
    transition: color 0.2s ease;
}

.user-name:hover {
    color: #5FB03F;
}

.user-role {
    color: #6b7280;
    font-size: 0.875rem;
}

.close-btn {
    color: #9ca3af;
    border-color: #6b7280;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
}

.close-btn:hover {
    color: #ef4444;
    background: #fee2e2;
    transform: rotate(90deg);
}

.post-content {
    padding: 0 1rem 1rem;
    color: #374151;
    font-size: 0.975rem;
    line-height: 1.5;
}

.post-image-container {
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    height: 320px;
    overflow: hidden;
    padding: 1rem 0;
}

.post-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin: 0 auto;
    transition: transform 0.3s ease;
}

.post-image:hover {
    transform: scale(1.02);
}

.engagement-stats {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.post-actions {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    color: #6b7280;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    position: relative;
}

.action-btn:hover {
    color: #111827;
    background: #f3f4f6;
    border-radius: 0.375rem;
    transform: translateY(-1px);
}

.action-btn::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #5FB03F;
    transition: all 0.2s ease;
    transform: translateX(-50%);
}

.action-btn:hover::after {
    width: 80%;
}

.action-btn.active {
    color: #5FB03F;
}

.action-btn.active::after {
    width: 80%;
}

.action-btn i {
    font-size: 1.25rem;
}

@keyframes heartBeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

.action-btn.active span:first-child {
    animation: heartBeat 0.3s ease-in-out;
}
</style>