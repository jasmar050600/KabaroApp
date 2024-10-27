<template>
    <section class="news-section bg-gray-50 py-8">
        <div class="max-w-5xl mx-auto px-4">
            <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Maritime Industry News</h1>
            <div class="grid gap-8 md:grid-cols-2">
                <div v-for="article in news" :key="article.id" class="news-card">
                    <!-- Article Header -->
                    <div class="article-header">
                        <div class="source-info">
                            <img :src="getSourceLogo(article.source)" :alt="article.source" class="source-logo">
                            <div class="source-details">
                                <h3 class="source-name">{{ article.source }}</h3>
                                <div class="flex items-center text-sm text-gray-500">
                                    <span class="category">{{ article.category }}</span>
                                    <span class="mx-1">•</span>
                                    <span class="publish-date">{{ article.date }}</span>
                                </div>
                            </div>
                        </div>
                        <button class="save-btn">
                            <span class="sr-only">Save</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        </button>
                    </div>

                    <!-- Article Title -->
                    <div class="article-title">
                        <h2>{{ article.title }}</h2>
                    </div>

                    <!-- Article Content -->
                    <div class="article-content">
                        <p>{{ article.summary }}</p>
                    </div>

                    <!-- Article Image -->
                    <div class="article-image-container">
                        <img :src="article.image" :alt="article.title" class="article-image">
                    </div>

                    <!-- Engagement Stats -->
                    <div class="engagement-stats">
                        <div class="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{{ article.views.toLocaleString() }} views</span>
                            <span>•</span>
                            <span>{{ article.shares.toLocaleString() }} shares</span>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="article-actions">
                        <button 
                            class="action-btn" 
                            :class="{ 'active': article.bookmarked }" 
                            @click="toggleBookmark(article)"
                        >
                            <span class="text-xl">🔖</span>
                            <span>Bookmark</span>
                        </button>
                        <button class="action-btn">
                            <span class="text-xl">📰</span>
                            <span>Read More</span>
                        </button>
                        <button class="action-btn">
                            <span class="text-xl">🔗</span>
                            <span>Share</span>
                        </button>
                        <button class="action-btn">
                            <span class="text-xl">🔔</span>
                            <span>Follow</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
    name: 'MaritimeNewsComponent'
});

const news = ref([
    {
        id: 1,
        source: 'Maritime Executive',
        category: 'Industry News',
        title: 'Major Shipping Lines Commit to Green Fuel Transition by 2030',
        summary: 'Leading maritime companies announce ambitious plans to transition 50% of their fleet to green fuels by 2030, marking a significant step towards industry decarbonization.',
        date: '1h ago',
        views: 1523,
        shares: 284,
        bookmarked: false,
        image: '/api/placeholder/800/600'
    },
    {
        id: 2,
        source: 'Lloyds List',
        category: 'Technology',
        title: 'Autonomous Vessel Technology Breakthrough',
        summary: 'Revolutionary AI-powered navigation system successfully completes first trans-Atlantic voyage, promising to reshape the future of maritime operations.',
        date: '3h ago',
        views: 2341,
        shares: 567,
        bookmarked: false,
        image: '/api/placeholder/800/600'
    },
    {
        id: 3,
        source: 'TradeWinds News',
        category: 'Infrastructure',
        title: 'Panama Canal Announces New Transit Protocol',
        summary: 'Panama Canal Authority implements new scheduling system to address ongoing drought concerns and optimize vessel transit efficiency.',
        date: '5h ago',
        views: 1876,
        shares: 423,
        bookmarked: false,
        image: '/api/placeholder/800/600'
    },
    {
        id: 4,
        source: 'Safety at Sea',
        category: 'Security',
        title: 'Gulf of Guinea Piracy Incidents Drop by 60%',
        summary: 'International naval cooperation and enhanced security measures lead to significant reduction in piracy incidents in West African waters.',
        date: '8h ago',
        views: 945,
        shares: 189,
        bookmarked: false,
        image: '/api/placeholder/800/600'
    },
    {
        id: 5,
        source: 'IMO News',
        category: 'Regulations',
        title: 'New Environmental Regulations Set for 2025',
        summary: 'IMO announces stricter emissions standards and introduces new requirements for ballast water management systems.',
        date: '12h ago',
        views: 3267,
        shares: 892,
        bookmarked: false,
        image: '/api/placeholder/800/600'
    },
    {
        id: 6,
        source: 'Port Technology',
        category: 'Operations',
        title: 'Alternative Shipping Routes Gain Popularity',
        summary: 'Shipping companies explore Arctic passages and new maritime corridors amid traditional route congestion and geopolitical challenges.',
        date: '1d ago',
        views: 1654,
        shares: 345,
        bookmarked: false,
        image: '/api/placeholder/800/600'
    }
]);

const getSourceLogo = (name) => {
    const encodedName = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${encodedName}&background=8cc63e&color=fff&size=128&bold=true`;
};

const toggleBookmark = (article) => {
    article.bookmarked = !article.bookmarked;
};
</script>

<style scoped>
:root {
    --primary-color: #8cc63e;
    --primary-dark: #709e32;
    --primary-light: #a4d45e;
}

.news-section {
    min-height: 100vh;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
}

.news-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(140, 198, 62, 0.1);
}

.news-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(140, 198, 62, 0.15);
    border-color: var(--primary-light);
}

.article-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid #f3f4f6;
}

.source-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.source-logo {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    object-fit: cover;
    transition: transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(140, 198, 62, 0.2);
}

.source-logo:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(140, 198, 62, 0.3);
}

.source-name {
    font-weight: 600;
    color: #111827;
    font-size: 1.1rem;
    transition: color 0.2s ease;
}

.source-name:hover {
    color: var(--primary-color);
}

.article-title {
    padding: 1.25rem 1.25rem 0.5rem;
}

.article-title h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.4;
    transition: color 0.2s ease;
}

.article-title h2:hover {
    color: var(--primary-color);
}

.article-content {
    padding: 0 1.25rem 1.25rem;
    color: #4b5563;
    font-size: 1rem;
    line-height: 1.6;
}

.article-image-container {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    background-color: #f9fafb;
}

.article-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.article-image:hover {
    transform: scale(1.05);
}

.engagement-stats {
    padding: 1rem 1.25rem;
    border-top: 1px solid #f3f4f6;
    background-color: #f9fafb;
}

.article-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    padding: 0.75rem;
    background-color: white;
    border-top: 1px solid #f3f4f6;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    color: #6b7280;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    border-radius: 0.5rem;
}

.action-btn:hover {
    color: var(--primary-dark);
    background: rgba(140, 198, 62, 0.1);
    transform: translateY(-2px);
}

.action-btn.active {
    color: var(--primary-color);
    background: rgba(140, 198, 62, 0.15);
}

.save-btn {
    color: red;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}

.save-btn:hover {
    color: var(--primary-color);
    background: rgba(140, 198, 62, 0.1);
    transform: scale(1.1);
}

/* Pulse animation for bookmarking */
@keyframes bookmarkPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
}

.action-btn.active span:first-child {
    animation: bookmarkPulse 0.3s ease-in-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .article-actions {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .article-image-container {
        height: 250px;
    }
    
    .article-title h2 {
        font-size: 1.25rem;
    }
}

@media (max-width: 640px) {
    .source-logo {
        width: 3rem;
        height: 3rem;
    }
    
    .article-actions {
        grid-template-columns: 1fr;
        gap: 0.25rem;
    }
}
</style>