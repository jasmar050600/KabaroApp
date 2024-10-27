<template>
    <section class="user-feed-section">
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
                            <path
                                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
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
                        <span>Repost</span>
                    </button>
                    <button class="action-btn">
                        <span class="text-xl">✉️</span>
                        <span>Send</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import engineMaintenanceImg from '@/assets/images/userpost/engine-maintenance.webp';
import sunsetBridgeImg from '@/assets/images/userpost/sunset-bridge.webp';

defineOptions({
    name: 'UserFeedComponent'
});

const posts = ref([
    {
        id: 1,
        userName: 'Capt. Maria Santos',
        userRole: 'Master Mariner',
        content: 'Currently navigating through the South China Sea. Proud to lead an all-Filipino crew on this container vessel. Salamat sa dedikasyon ng ating mga marino! 🚢 #PinoySeafarers',
        date: '15m',
        likes: 527,
        comments: 78,
        liked: false,
        image: null
    },
    {
        id: 2,
        userName: 'Carlos Reyes',
        userRole: 'Chief Engineer',
        content: 'Week 16 at sea: Just completed major engine maintenance with my talented Filipino engineering team. Sharing some tips for aspiring marine engineers - swipe for photos! 🛠️',
        date: '1h',
        likes: 323,
        comments: 67,
        liked: false,
        image: engineMaintenanceImg
    },
    {
        id: 3,
        userName: 'Elena Dela Cruz',
        userRole: 'Second Officer',
        content: 'Beautiful sunset watch today. Sometimes these quiet moments on the bridge remind me why I chose this career. Sending love to my family back home in Cebu! ❤️ #SeafarerLife',
        date: '3h',
        likes: 445,
        comments: 89,
        liked: false,
        image: sunsetBridgeImg
    },
    {
        id: 4,
        userName: 'Marco Bonifacio',
        userRole: 'Third Engineer',
        content: 'First week as Third Engineer complete! Grateful for the mentorship from our Chief Engineer. Learning something new every day about our main engine systems. 💪 #MarineEngineer',
        date: '5h',
        likes: 234,
        comments: 45,
        liked: false,
        image: null
    },
    {
        id: 5,
        userName: 'Isabella Ruiz',
        userRole: 'Deck Cadet',
        content: 'Day 45 of my cadetship: Finally mastering celestial navigation! Nothing beats the feeling of getting an accurate fix using just the sextant and stars. ⭐️ #FutureMaster',
        date: '6h',
        likes: 167,
        comments: 34,
        liked: false,
        image: null
    },
    {
        id: 6,
        userName: 'Ramon Fernandez',
        userRole: 'Chief Officer',
        content: 'Port arrival in Singapore tomorrow. Busy preparing paperwork and coordinating with port authorities. Miss my kids but duty calls! 🚢📝 #SeafarersLife',
        date: '8h',
        likes: 289,
        comments: 56,
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