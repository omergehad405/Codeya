import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'





/* ── Scroll Reveal Hook ── */
function useInView(threshold = 0.12) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
            { threshold }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [threshold])
    return [ref, inView]
}

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
    const [ref, inView] = useInView()
    const transforms = {
        up: 'translate-y-10',
        left: '-translate-x-10',
        right: 'translate-x-10',
        none: 'translate-0',
    }
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className}
                ${inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${transforms[direction]}`}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    )
}

/* ── Single Project Card ── */
function ProjectCard({ project, index, labelsMap }) {
    const { t } = useTranslation()
    const idx = String(index + 1).padStart(2, '0')

    const tags = project.category.map(c => (
        <span key={c} className="text-[10px] font-bold tracking-widest uppercase text-brand-deep bg-brand-deep/7 border border-brand-deep/15 px-2.5 py-1 rounded-full">
            {labelsMap[c] || c}
        </span>
    ))

    return (
        <Reveal delay={index * 0.1}>
            <article className="group bg-white border border-[#e4ede8] rounded-[20px] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-neon hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,72,54,0.1)]">
                {/* Image / Placeholder */}
                {project.image ? (
                    <div className="relative aspect-video overflow-hidden border-b border-[#e4ede8]">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={e => {
                                e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full bg-[#f0f7f3] flex items-center justify-center"><span class="font-serif text-[72px] font-black text-brand-deep/12">${idx}</span></div>`
                            }}
                        />
                    </div>
                ) : (
                    <div className="aspect-video bg-[#f0f7f3] flex items-center justify-center border-b border-[#e4ede8]">
                        <span className="font-serif text-[72px] font-black text-brand-deep/12 leading-none">
                            {idx}
                        </span>
                    </div>
                )}

                {/* Body */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3.5">
                        <div className="flex gap-1.5 flex-wrap">{tags}</div>
                        <span className="font-serif text-[11px] text-brand-dark/20">{idx}</span>
                    </div>
                    <h3 className="font-serif text-[19px] font-bold text-brand-dark mb-2 leading-tight">
                        {project.title}
                    </h3>
                    <p className="text-[13px] text-[#6b8a78] leading-relaxed mb-4 font-normal">
                        {project.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#e4ede8]">
                        {project.ready && project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-sans text-xs font-bold text-brand-deep tracking-tight group/link"
                                onClick={e => e.stopPropagation()}
                            >
                                {t('projectsPage.viewProject')}
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
                                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        ) : (
                            <span className="text-[11px] font-medium text-brand-dark/30 tracking-wider">
                                {t('projectsPage.comingSoon')}
                            </span>
                        )}
                        <div className={`w-2 h-2 rounded-full ${project.ready ? 'bg-brand-neon animate-pulse shadow-[0_0_6px_rgba(4,217,57,0.5)]' : 'bg-[#e4ede8]'}`} />
                    </div>
                </div>
            </article>
        </Reveal>
    )
}

/* ── Main Page ── */
export default function Projects() {
    const { t } = useTranslation()
    const [activeFilter, setActiveFilter] = useState('All')
    const [apiProjects, setApiProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://codeya-backend.onrender.com/api/projects')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const mapped = data.data.projects.map(p => ({
                        id: p._id,
                        title: p.name,
                        description: p.description,
                        link: p.link,
                        image: p.image,
                        category: p.category || ['websites'],
                        ready: p.status === 'completed' || !!p.link,
                    }));
                    setApiProjects(mapped);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filters = [
        { value: 'All', label: t('projectsPage.filters.all') },
        { value: 'websites', label: t('projectsPage.filters.websites') },
        { value: 'landing page', label: t('projectsPage.filters.landing') },
        { value: 'ecommerce', label: t('projectsPage.filters.ecommerce') },
        { value: 'mobile app', label: t('projectsPage.filters.mobile') },
        { value: 'ui/ux', label: 'UI/UX' },
    ]

    const labels = {
        'websites': t('projectsPage.labels.websites'),
        'landing page': t('projectsPage.labels.landing'),
        'ecommerce': t('projectsPage.labels.ecommerce'),
        'mobile app': t('projectsPage.labels.mobile'),
        'ui/ux': 'UI/UX'
    }

    const filteredProjects = activeFilter === 'All'
        ? apiProjects
        : apiProjects.filter(p => p.category.includes(activeFilter))

    if (loading) {
        return (
            <div className="font-sans min-h-screen bg-brand-light flex justify-center items-center">
                <span className="text-brand-deep font-serif text-2xl font-bold animate-pulse">Loading projects...</span>
            </div>
        )
    }

    return (
        <div className="font-sans bg-brand-light overflow-x-hidden">
            {/* ── HERO ── */}
            <div className="relative bg-brand-deep min-h-[88vh] flex flex-col justify-end px-6 pb-20 md:px-12 lg:px-24 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(80px,16vw,200px)] font-black text-white/[0.03] whitespace-nowrap pointer-events-none tracking-[-4px]">
                    {t('projectsPage.hero.bg')}
                </div>
                <div className="absolute top-10 right-6 md:right-12 font-sans text-xs text-white/20 tracking-[3px] uppercase [writing-mode:vertical-rl]">
                    {t('projectsPage.hero.corner')}
                </div>
                <div className="absolute top-10 left-6 md:left-12 grid grid-cols-5 gap-2 opacity-15">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-white" />
                    ))}
                </div>

                <div className="animate-[fadeUp_0.8s_ease_0.2s_forwards] opacity-0">
                    <div className="inline-flex items-center gap-2 bg-brand-neon/12 border border-brand-neon/30 rounded-full px-4 py-1.5 text-xs font-bold text-brand-neon tracking-widest uppercase mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                        {t('projectsPage.hero.badge')}
                    </div>
                </div>

                <div className="animate-[fadeUp_0.8s_ease_0.4s_forwards] opacity-0">
                    <h1 className="font-serif text-[clamp(40px,7vw,86px)] font-black text-white leading-none tracking-tight mb-6">
                        {t('projectsPage.hero.title1')}<br />
                        <span className="text-brand-neon italic">{t('projectsPage.hero.title2')}</span><br />
                        {t('projectsPage.hero.title3')}
                    </h1>
                </div>

                <div className="animate-[fadeUp_0.8s_ease_0.6s_forwards] opacity-0">
                    <p className="text-[clamp(14px,1.5vw,16px)] text-white/50 max-w-[480px] leading-relaxed mb-12">
                        {t('projectsPage.hero.sub')}
                    </p>
                </div>

                <div className="animate-[fadeUp_0.8s_ease_0.8s_forwards] opacity-0 flex items-center gap-3 text-white/30 text-[10px] tracking-[2px] uppercase">
                    <div className="w-12 h-[1px] bg-white/20" />
                    {t('projectsPage.hero.scroll')}
                </div>
            </div>

            {/* ── PROJECTS ── */}
            <div className="py-20 px-6 md:py-32 lg:px-24 bg-brand-light">
                <Reveal>
                    <div className="text-[11px] font-bold tracking-[3px] uppercase text-brand-neon mb-4">
                        {t('projectsPage.portfolio')}
                    </div>
                    <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-bold text-brand-dark leading-tight tracking-tight">
                        {t('projectsPage.workTitle1')}<br />
                        <span className="text-brand-deep">{t('projectsPage.workTitle2')}</span>
                    </h2>

                    <div className="flex justify-center flex-wrap gap-2.5 mt-9">
                        {filters.map(f => (
                            <button
                                key={f.value}
                                className={`px-5 py-2.5 rounded-full font-sans text-[12px] font-bold tracking-wider cursor-pointer border transition-all duration-200 
                                ${activeFilter === f.value
                                        ? 'bg-brand-deep border-brand-deep text-white shadow-md'
                                        : 'bg-transparent border-[#c8ddd2] text-[#4a6b58] hover:border-brand-deep hover:text-brand-deep'}`}
                                onClick={() => setActiveFilter(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                    <div className="h-[1px] bg-gradient-to-r from-[#c8ddd2] via-[#c8ddd2]/20 to-transparent mt-10" />
                </Reveal>

                {filteredProjects.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="inline-block text-sm text-[#6b8a78] bg-brand-deep/5 border border-[#e4ede8] px-7 py-3 rounded-full">
                            {t('projectsPage.empty')}
                        </span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 max-w-[1280px] mx-auto">
                        {filteredProjects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} labelsMap={labels} />
                        ))}
                    </div>
                )}
            </div>

            {/* ── CTA ── */}
            <div className="bg-brand-deep text-center py-24 px-6 md:py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[280px] font-black text-white/[0.02] whitespace-nowrap pointer-events-none tracking-tighter">
                    →
                </div>
                <div className="relative z-10 max-w-[800px] mx-auto">
                    <Reveal>
                        <div className="inline-flex items-center gap-2 bg-brand-neon/12 border border-brand-neon/30 rounded-full px-4 py-1.5 text-xs font-bold text-brand-neon tracking-widest uppercase mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                            {t('projectsPage.cta.badge')}
                        </div>
                        <h2 className="font-serif text-[clamp(30px,5vw,60px)] font-black text-white mb-4 leading-none tracking-tight">
                            {t('projectsPage.cta.title1')}<br />
                            <span className="text-brand-neon">{t('projectsPage.cta.title2')}</span>
                        </h2>
                        <p className="text-[15px] text-white/40 mb-10 leading-relaxed max-w-[500px] mx-auto">
                            {t('projectsPage.cta.sub')}
                        </p>
                        <a href="/contact" className="inline-flex items-center gap-2.5 bg-brand-neon text-brand-deep text-sm font-black px-9 py-4 rounded-full tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_0_12px_rgba(4,217,57,0.1)]">
                            {t('projectsPage.cta.btn')}
                        </a>
                    </Reveal>
                </div>
            </div>
        </div>
    )
}
