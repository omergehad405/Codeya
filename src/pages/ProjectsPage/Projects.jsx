import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SectionHeader from '../../components/SectionHeader'
import ProjectsCards from './ProjectsCards'

// Add missing fields from ProjectsCards.jsx: image (can be null/undefined or specific), keep all keys
// const PROJECTS = [
//     {
//         id: 1,
//         title: 'Lumina Store',
//         category: 'eCommerce',
//         description: 'منصة تسوق متكاملة بتجربة مستخدم سلسة وسرعة خاطفة.',
//         tags: ['React', 'Node.js', 'Stripe'],
//         link: 'https://example.com',
//         accent: '#04d939',
//         ready: true,
//         // From ProjectsCards.jsx structure:
//         image: null,
//     },
//     {
//         id: 2,
//         title: 'AgencyX',
//         category: 'landing page',
//         description: 'صفحة هبوط احترافية لوكالة إبداعية بأنيميشن مبهر.',
//         tags: ['HTML', 'GSAP', 'CSS'],
//         link: 'https://example.com',
//         accent: '#00b8ff',
//         ready: true,
//         image: null,
//     },
//     {
//         id: 3,
//         title: 'MedBook',
//         category: 'mobile app',
//         description: 'تطبيق حجز مواعيد طبية بواجهة بسيطة وتجربة ممتازة.',
//         tags: ['React Native', 'Firebase'],
//         link: 'https://example.com',
//         accent: '#ff6b6b',
//         ready: true,
//         image: null,
//     },
//     {
//         id: 4,
//         title: 'PortfolioOS',
//         category: 'websites',
//         description: 'موقع بورتفوليو بتصميم يحاكي نظام تشغيل كامل.',
//         tags: ['Next.js', 'Framer Motion'],
//         link: 'https://example.com',
//         accent: '#ffd700',
//         ready: true,
//         image: null,
//     },
//     {
//         id: 5,
//         title: 'ShopFlow',
//         category: 'eCommerce',
//         description: 'قريباً — متجر إلكتروني بذكاء اصطناعي لتخصيص التوصيات.',
//         tags: ['AI', 'Python', 'React'],
//         link: null,
//         accent: '#c084fc',
//         ready: false,
//         image: null,
//     },
//     {
//         id: 6,
//         title: 'FitTrack',
//         category: 'mobile app',
//         description: 'قريباً — تطبيق لياقة يتتبع تقدمك اليومي بتصميم محفز.',
//         tags: ['Flutter', 'Firebase'],
//         link: null,
//         accent: '#fb923c',
//         ready: false,
//         image: null,
//     },
// ]

const PROJECTS = []

// In FILTERS, use the filter keyword values for logic, but translation keys for labels via i18n
const FILTERS = [
    { value: 'All', tKey: 'projectsPage.filters.all' },
    { value: 'websites', tKey: 'projectsPage.filters.websites' },
    { value: 'landing page', tKey: 'projectsPage.filters.landingPage' },
    { value: 'eCommerce', tKey: 'projectsPage.filters.eCommerce' },
    { value: 'mobile app', tKey: 'projectsPage.filters.mobileApp' }
]

function Projects() {
    const [activeFilter, setActiveFilter] = useState('All')
    const { t } = useTranslation()

    // Filtering logic for projects
    const filteredProjects = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter(project => project.category === activeFilter)

    return (
        <div className="min-h-screen bg-(--main-color)">
            <div className="max-w-6xl mx-auto px-6 pb-20">

                {/* Section Header */}
                <SectionHeader title="projectsPage.section.title" accent="projectsPage.section.accent" subtitle={null} />

                {/* Hero Tagline */}
                <div className="anim-1 text-center mb-14">
                    <h2
                        className="mt-5 text-2xl md:text-4xl font-extrabold "
                        style={{ color: 'var(--second-color)', direction: 'rtl' }}
                    >
                        {t('projectsPage.heroTagline.title')}{' '}
                        <br className="hidden md:block" />
                        <span className="italic" style={{ color: 'var(--text-color)' }}>
                            {t('projectsPage.heroTagline.subtitle')}
                        </span>
                    </h2>
                </div>
                {/* Filters Button - Like Previous One */}
                <div className="flex justify-center mb-10 gap-3 anim-1">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-200 
                                border-2 ${activeFilter === filter.value
                                    ? 'bg-(--second-color) text-(--main-color) border-(--second-color) shadow-lg'
                                    : 'bg-(--main-color) text-(--second-color) border-(--second-color) hover:bg-(--second-color) hover:text-(--main-color)'
                                }`}
                            style={{
                                marginInlineStart: '0.25rem',
                                marginInlineEnd: '0.25rem',
                            }}
                            onClick={() => setActiveFilter(filter.value)}
                        >
                            {t(filter.tKey)}
                        </button>
                    ))}
                </div>

                {/* Projects  */}
                <ProjectsCards projects={filteredProjects} />

                {/* Bottom CTA Banner */}
                <div
                    className="relative text-center mt-20 px-8 py-12 rounded-3xl overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, var(--second-color) 0%, #013326 100%)' }}
                >
                    {/* Glow blob */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none bg-[rgba(4,217,57,0.08)]" />

                    <h3
                        className="text-3xl font-extrabold mb-2"
                        style={{ color: 'var(--main-color)', direction: 'rtl' }}
                    >
                        {t('projectsPage.cta.headline')}
                    </h3>
                    <p
                        className="mb-7"
                        style={{ color: 'rgba(238,243,228,0.65)', direction: 'rtl' }}
                    >
                        {t('projectsPage.cta.paragraph')}
                    </p>
                    <a
                        href="#contact"
                        className="inline-block px-9 py-3.5 rounded-full font-extrabold text-base no-underline transition-all duration-200 hover:-translate-y-1 hover:scale-105"
                        style={{
                            background: 'var(--text-color)',
                            color: '#012340',
                            boxShadow: '0 8px 30px rgba(4,217,57,0.35)',
                        }}
                    >
                        {t('projectsPage.cta.button')}
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Projects