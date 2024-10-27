<template>
    <section class="job-board-section">
        <div class="job-listings">
            <div v-for="job in jobs" :key="job.id" class="job-card" :class="{ 'featured': job.isFeatured }"
                @mouseenter="job.isHovered = true" @mouseleave="job.isHovered = false">
                <div class="job-header">
                    <div class="company-info">
                        <img :src="getCompanyLogoUrl(job.company)" :alt="job.company" class="company-logo">
                        <div class="company-details">
                            <h3 class="company-name">{{ job.company }}</h3>
                            <span class="location">
                                <i class="fas fa-map-marker-alt"></i>
                                {{ job.location }}
                            </span>
                        </div>
                    </div>
                    <div class="job-tags">
                        <span class="job-type" :class="job.type">{{ job.type }}</span>
                        <span v-if="job.isFeatured" class="featured-tag">Featured</span>
                        <span v-if="isNewJob(job.postedDate)" class="new-tag">New</span>
                    </div>
                </div>

                <div class="job-content">
                    <h2 class="job-title">{{ job.title }}</h2>
                    <p class="job-description">{{ job.description }}</p>

                    <div class="job-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Experience: {{ job.experience }}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Salary: {{ job.salary }}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-ship"></i>
                            <span>Vessel Type: {{ job.vesselType }}</span>
                        </div>
                    </div>

                    <div class="skills-section">
                        <span v-for="skill in job.requiredSkills" :key="skill" class="skill-tag">
                            {{ skill }}
                        </span>
                    </div>
                </div>

                <div class="job-footer">
                    <span class="posted-date">
                        <i class="far fa-clock"></i>
                        Posted {{ formatDate(job.postedDate) }}
                    </span>
                    <div class="action-buttons">
                        <button class="save-btn" :class="{ 'saved': job.isSaved }" @click="toggleSaveJob(job)">
                            <i :class="['fas', job.isSaved ? 'fa-bookmark' : 'fa-bookmark']"></i>
                        </button>
                        <router-link :to="`/jobs/${job.id}`" class="apply-btn">
                            Apply Now
                            <i class="fas fa-arrow-right"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'JobBoardComponent',
    data() {
        return {
            jobs: [
                {
                    id: 1,
                    company: 'Maritime Solutions Ltd',
                    title: 'Chief Engineer',
                    description: 'Seeking experienced Chief Engineer for container vessel. Responsible for overall maintenance and operation of ships machinery.',
                    location: 'Singapore',
                    type: 'full-time',
                    experience: '10+ years',
                    salary: '$12,000 - $15,000/month',
                    vesselType: 'Container Ship',
                    requiredSkills: ['STCW', 'Engine Management', 'Team Leadership', 'Technical Operations'],
                    postedDate: '2024-10-22',
                    isFeatured: true,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 2,
                    company: 'Global Shipping Co',
                    title: 'Second Officer',
                    description: 'Join our team as Second Officer. Responsibilities include navigation watch, cargo operations, and safety compliance.',
                    location: 'Rotterdam, Netherlands',
                    type: 'contract',
                    experience: '5+ years',
                    salary: '$8,000 - $10,000/month',
                    vesselType: 'Bulk Carrier',
                    requiredSkills: ['Navigation', 'ECDIS', 'Cargo Operations', 'Safety Management'],
                    postedDate: '2024-10-23',
                    isFeatured: false,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 3,
                    company: 'Ocean Transport Inc',
                    title: 'Master/Captain',
                    description: 'Experienced Master needed for LNG carrier. Responsible for vessel operations, crew management, and ensuring compliance with maritime regulations.',
                    location: 'Dubai, UAE',
                    type: 'full-time',
                    experience: '15+ years',
                    salary: '$16,000 - $20,000/month',
                    vesselType: 'LNG Carrier',
                    requiredSkills: ['Command Experience', 'LNG Operations', 'ISM Code', 'Crisis Management'],
                    postedDate: '2024-10-21',
                    isFeatured: true,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 4,
                    company: 'Pacific Marine Services',
                    title: 'Third Engineer',
                    description: 'Third Engineer needed for cruise vessel. Handle machinery maintenance, watch duties, and assist Chief Engineer.',
                    location: 'Miami, USA',
                    type: 'contract',
                    experience: '3+ years',
                    salary: '$7,000 - $8,500/month',
                    vesselType: 'Cruise Ship',
                    requiredSkills: ['Marine Engineering', 'Mechanical Systems', 'Safety Procedures', 'Watch Keeping'],
                    postedDate: '2024-10-24',
                    isFeatured: false,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 5,
                    company: 'European Cruises Ltd',
                    title: 'Chief Officer',
                    description: 'Seeking Chief Officer for luxury cruise liner. Oversee deck operations, cargo handling, and safety protocols.',
                    location: 'Barcelona, Spain',
                    type: 'full-time',
                    experience: '8+ years',
                    salary: '$10,000 - $12,000/month',
                    vesselType: 'Cruise Ship',
                    requiredSkills: ['Deck Operations', 'Crew Management', 'Safety Protocols', 'Passenger Management'],
                    postedDate: '2024-10-23',
                    isFeatured: true,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 6,
                    company: 'Asian Maritime Corp',
                    title: 'Fourth Engineer',
                    description: 'Entry-level position for Fourth Engineer on container vessel. Assist in engine room operations and maintenance.',
                    location: 'Hong Kong',
                    type: 'full-time',
                    experience: '1+ years',
                    salary: '$5,000 - $6,000/month',
                    vesselType: 'Container Ship',
                    requiredSkills: ['Marine Engineering', 'Basic Safety', 'Engine Maintenance', 'Technical Knowledge'],
                    postedDate: '2024-10-24',
                    isFeatured: false,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 7,
                    company: 'Norse Shipping Lines',
                    title: 'Deck Cadet',
                    description: 'Training position for Deck Cadet. Learn navigation, cargo operations, and maritime procedures.',
                    location: 'Oslo, Norway',
                    type: 'training',
                    experience: 'Entry Level',
                    salary: '$2,000 - $3,000/month',
                    vesselType: 'Oil Tanker',
                    requiredSkills: ['Maritime Education', 'Basic Safety Training', 'Physical Fitness', 'English Proficiency'],
                    postedDate: '2024-10-22',
                    isFeatured: false,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 8,
                    company: 'Mediterranean Shipping',
                    title: 'Chief Cook',
                    description: 'Experienced Chief Cook needed for cargo vessel. Manage galley operations and crew meals.',
                    location: 'Piraeus, Greece',
                    type: 'contract',
                    experience: '5+ years',
                    salary: '$4,500 - $5,500/month',
                    vesselType: 'Bulk Carrier',
                    requiredSkills: ['Culinary Experience', 'Menu Planning', 'Inventory Management', 'Food Safety'],
                    postedDate: '2024-10-23',
                    isFeatured: false,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 9,
                    company: 'Gulf Marine Operations',
                    title: 'Electrical Officer',
                    description: 'Electrical Officer needed for offshore vessel. Maintain electrical systems and equipment.',
                    location: 'Abu Dhabi, UAE',
                    type: 'full-time',
                    experience: '6+ years',
                    salary: '$9,000 - $11,000/month',
                    vesselType: 'Offshore Support Vessel',
                    requiredSkills: ['Marine Electrical Systems', 'Troubleshooting', 'Technical Documentation', 'Safety Standards'],
                    postedDate: '2024-10-24',
                    isFeatured: false,
                    isSaved: false,
                    isHovered: false
                },
                {
                    id: 10,
                    company: 'Atlantic Petroleum',
                    title: 'Dynamic Positioning Officer',
                    description: 'DPO needed for offshore operations. Operate DP systems and maintain vessel position during operations.',
                    location: 'Aberdeen, UK',
                    type: 'contract',
                    experience: '4+ years',
                    salary: '$10,000 - $12,000/month',
                    vesselType: 'DP Shuttle Tanker',
                    requiredSkills: ['DP Certification', 'Offshore Experience', 'Navigation Skills', 'Emergency Procedures'],
                    postedDate: '2024-10-22',
                    isFeatured: true,
                    isSaved: false,
                    isHovered: false
                }
            ]
        }
    },
    methods: {
        getCompanyLogoUrl(companyName) {
            const encodedName = encodeURIComponent(companyName)
            return `https://ui-avatars.com/api/?name=${encodedName}&background=8cc63e&color=fff&size=64`
        },
        formatDate(date) {
            const postedDate = new Date(date)
            const today = new Date()
            const diffTime = Math.abs(today - postedDate)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

            if (diffDays === 1) return 'yesterday'
            if (diffDays < 7) return `${diffDays} days ago`
            return postedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        },
        isNewJob(date) {
            const postedDate = new Date(date)
            const today = new Date()
            const diffTime = Math.abs(today - postedDate)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays <= 3
        },
        toggleSaveJob(job) {
            job.isSaved = !job.isSaved
        }
    }
}
</script>

<style scoped>
.job-board-section {
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
}

.job-listings {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.job-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid #eee;
    position: relative;
    overflow: hidden;
}

.job-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.job-card.featured::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: #8cc63e;
    border-radius: 4px 0 0 4px;
}

.job-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
}

.company-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.company-logo {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
}

.company-details {
    display: flex;
    flex-direction: column;
}

.company-name {
    color: #1e2124;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
}

.location {
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.job-tags {
    display: flex;
    gap: 0.8rem;
}

.job-type {
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.job-type.full-time {
    background: #e8f5e9;
    color: #2e7d32;
}

.job-type.contract {
    background: #e3f2fd;
    color: #1976d2;
}

.featured-tag,
.new-tag {
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.featured-tag {
    background: #8cc63e;
    color: white;
}

.new-tag {
    background: #fff3e0;
    color: #f57c00;
}

.job-content {
    margin-bottom: 1.5rem;
}

.job-title {
    color: #1e2124;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.job-description {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.job-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: #444;
    font-size: 0.9rem;
}

.skills-section {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1rem;
}

.skill-tag {
    background: #f5f5f5;
    color: #444;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    transition: all 0.3s ease;
}

.skill-tag:hover {
    background: #8cc63e;
    color: white;
}

.job-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
}




.posted-date {
    color: #666;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.action-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.save-btn {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.5rem;
    transition: all 0.3s ease;
}

.save-btn:hover,
.save-btn.saved {
    color: #8cc63e;
}

.apply-btn {
    background: #8cc63e;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    transition: all 0.3s ease;
}

.apply-btn:hover {
    background: #7ab52f;
    transform: translateX(4px);
}

@media (max-width: 768px) {
    .job-board-section {
        padding: 1rem;
    }

    .job-header {
        flex-direction: column;
        gap: 1rem;
    }

    .job-tags {
        width: 100%;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .job-details {
        grid-template-columns: 1fr;
    }

    .job-footer {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .action-buttons {
        width: 100%;
        justify-content: space-between;
    }
}
</style>