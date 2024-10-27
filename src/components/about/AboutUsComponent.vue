<template>
    <div class="about-content">
        <!-- Hero Section with Parallax -->
        <div class="hero-section" v-motion-slide-visible-once-bottom>
            <div class="hero-content">
                <img 
                    src="@/assets/images/kabaroapp-header.png" 
                    alt="Kabaro App" 
                    class="hero-logo"
                    v-motion
                    :initial="{ opacity: 0, scale: 0.8 }"
                    :enter="{ opacity: 1, scale: 1 }"
                    :delay="200"
                >
                <div class="hero-text">
                    <h1 
                        v-motion
                        :initial="{ opacity: 0, y: 50 }"
                        :enter="{ opacity: 1, y: 0 }"
                        :delay="400"
                    >About Us</h1>
                    <p
                        v-motion
                        :initial="{ opacity: 0, y: 30 }"
                        :enter="{ opacity: 1, y: 0 }"
                        :delay="600"
                    >The Premier Job Board for Filipino Seafarers</p>
                </div>
            </div>
        </div>

        <div class="main-content">
            <div class="content-container">
                <!-- Story Section -->
                <section 
                    class="content-section"
                    v-motion
                    :initial="{ opacity: 0, x: -50 }"
                    :visibleOnce="{ opacity: 1, x: 0 }"
                >
                    <div class="section-icon">
                        <BookOpen class="icon" />
                    </div>
                    <h2>Our Story</h2>
                    <p>Started as Facebook Group in 2017 as Seaman Jobs Phils, the community has grown into a website at the height of the pandemic in 2020. With growing demands from loyal seafarers to apply online and support from manning agencies, a year later, Kabaro App was reborn and retransformed into an Android and web app with a whooping 4.9 star rating.</p>
                </section>

                <!-- Name Origin -->
                <section 
                    class="content-section"
                    v-motion
                    :initial="{ opacity: 0, x: 50 }"
                    :visibleOnce="{ opacity: 1, x: 0 }"
                >
                    <div class="section-icon">
                        <Users class="icon" />
                    </div>
                    <h2>Our Name</h2>
                    <p>"Kabaro" is derived from the Tagalog word meaning "fellow," "companion," or "colleague" - an alias or nickname we used for Pinoy seafarers in our FB group ever since. It means a "fellow brother" or "comrade" which is often a popular term among Filipino men in uniform, police officers, soldiers, or even seafarers.</p>
                </section>

                <!-- Achievements -->
                <section 
                    class="content-section achievements"
                    v-motion
                    :initial="{ opacity: 0, y: 50 }"
                    :visibleOnce="{ opacity: 1, y: 0 }"
                >
                    <div class="section-icon">
                        <Trophy class="icon" />
                    </div>
                    <h2>Our Achievements</h2>
                    <div class="achievement-cards">
                        <div 
                            v-for="(achievement, index) in achievements" 
                            :key="index"
                            class="achievement-card"
                            v-motion
                            :initial="{ opacity: 0, y: 30 }"
                            :visibleOnce="{ opacity: 1, y: 0 }"
                            :delay="index * 200"
                        >
                            <div class="achievement-year">
                                <span class="year">{{ achievement.year }}</span>
                            </div>
                            <div class="achievement-content">
                                <h3>{{ achievement.title }}</h3>
                                <p>{{ achievement.description }}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


const achievements = [
    {
        year: '2023',
        title: 'DICT STEP UP Program',
        description: 'Selected among 33 startups nationwide for the Digital Startup Development and Acceleration Program.'
    },
    {
        year: '2024',
        title: 'DTI Best in Pitch',
        description: 'Awarded Best in Pitch at the DTI Moonshot TNK Pitching Competition in Iloilo City.'
    }
];
</script>

<style scoped>
.about-content {
    width: 100%;
}

.hero-section {
    position: relative;
    background: linear-gradient(135deg, rgba(33, 33, 33, 0.85) 0%, rgba(66, 66, 66, 0.85) 100%),
                url('@/assets/images/kabaro-about.png');
    background-size: cover;
    background-position: center;
    padding: 6rem 2rem;
    color: white;
    text-align: center;
    overflow: hidden;
}

.hero-content {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
}

.hero-logo {
    width: auto;
    height: 140px;
    margin-bottom: 2rem;
    transition: transform 0.3s ease;
}

.hero-logo:hover {
    transform: scale(1.05);
}

.hero-text h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    color: #8dc63f;
}

.hero-text p {
    font-size: 1.5rem;
    opacity: 0.9;
    font-weight: 500;
}

.main-content {
    background: #f8f9fa;
    padding: 4rem 1rem;
}

.content-container {
    max-width: 1000px;
    margin: 0 auto;
}

.content-section {
    background: white;
    border-radius: 1.5rem;
    padding: 3rem;
    margin-bottom: 3rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
}

.content-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(74, 149, 52, 0.15);
}

.section-icon {
    background: #4a9534;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.icon {
    color: white;
    size: 24px;
}

.content-section h2 {
    color: #4a9534;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
}

.content-section p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4b5563;
}

.achievement-cards {
    display: grid;
    gap: 2rem;
    margin-top: 2rem;
}

.achievement-card {
    background: #f8f9fa;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    gap: 2rem;
    transition: all 0.3s ease;
}

.achievement-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(74, 149, 52, 0.1);
    background: white;
}

.achievement-year {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
}

.year {
    font-size: 2rem;
    font-weight: 800;
    color: #4a9534;
    background: rgba(74, 149, 52, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 8px;
}

.achievement-content {
    flex: 1;
}

.achievement-content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e2124;
    margin-bottom: 1rem;
}

.achievement-content p {
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.1rem;
}

@media (max-width: 768px) {
    .hero-section {
        padding: 4rem 1rem;
    }

    .hero-text h1 {
        font-size: 2.5rem;
    }

    .hero-text p {
        font-size: 1.25rem;
    }

    .content-section {
        padding: 2rem;
    }

    .achievement-card {
        flex-direction: column;
        gap: 1.5rem;
        padding: 1.5rem;
    }

    .achievement-year {
        justify-content: flex-start;
    }

    .year {
        font-size: 1.5rem;
    }
}
</style>