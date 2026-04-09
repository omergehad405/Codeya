import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

function Reveal({ children, delay = 0, direction = 'up' }) {
    const [ref, inView] = useInView()
    const transforms = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)', none: 'none' }
    return (
        <div
            ref={ref}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : transforms[direction],
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    )
}


const LABELS = {
    'websites': 'Website',
    'landing page': 'Landing Page',
    'eCommerce': 'eCommerce',
    'mobile app': 'Mobile App',
}

function ProjectCard({ project, index }) {
    const { t } = useTranslation()
    const [ref, inView] = useInView()
    const idx = String(index + 1).padStart(2, '0')

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out h-full flex flex-col w-full max-w-[400px] mx-auto min-[901px]:max-w-none
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
        >
            <article className="group bg-white border border-brand-border rounded-[20px] overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-neon hover:shadow-[0_16px_48px_rgba(0,72,54,0.1)] flex flex-col h-full">
                {/* Image */}
                {project.image ? (
                    <img
                        src={project.image} alt={project.title}
                        className="w-full aspect-video object-cover block"
                        onError={e => {
                            e.currentTarget.outerHTML = `<div class="w-full aspect-video bg-[#f0f7f3] flex items-center justify-center border-b border-brand-border"><span class="font-serif text-[72px] font-black text-brand-deep/12">${idx}</span></div>`
                        }}
                    />
                ) : (
                    <div className="w-full aspect-video bg-[#f0f7f3] flex items-center justify-center border-b border-brand-border">
                        <span className="font-serif text-[72px] font-black text-brand-deep/12">
                            {idx}
                        </span>
                    </div>
                )}

                {/* Body */}
                <div className="p-6 md:p-7 flex-grow flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-3.5">
                            <div className="flex gap-1.5 flex-wrap">
                                {project.category.map(c => (
                                    <span key={c} className="text-[10px] font-bold tracking-wider uppercase text-brand-deep bg-brand-deep/7 border border-brand-deep/15 px-2.5 py-0.5 rounded-full">
                                        {LABELS[c] || c}
                                    </span>
                                ))}
                            </div>
                            <span className="font-serif text-[11px] text-brand-dark/20">{idx}</span>
                        </div>
                        <h3 className="font-serif text-[19px] font-bold text-brand-dark mb-2 leading-tight">
                            {project.title}
                        </h3>
                        <p className="text-[13px] text-[#6b8a78] leading-relaxed mb-4.5">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                        {project.ready && project.link ? (
                            <a
                                href={project.link} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-brand-deep no-underline tracking-wide group/link transition-all"
                            >
                                <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                                    {t('projectsCards.viewProject')}
                                </span>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200">
                                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        ) : (
                            <span className="text-[11px] font-medium text-brand-dark/30 tracking-wider uppercase">
                                {t('projectsCards.comingSoon')}
                            </span>
                        )}
                        <div className={`w-1.5 h-1.5 rounded-full ${project.ready ? 'bg-brand-neon shadow-[0_0_6px_rgba(4,217,57,0.5)]' : 'bg-brand-border'}`} />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default function ProjectsSection() {
    const { t } = useTranslation()
    const [previewProjects, setPreviewProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://codeya-backend.onrender.com/api/projects')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const mapped = data.data.projects.slice(0, 3).map(p => ({
                        id: p._id,
                        title: p.name,
                        description: p.description,
                        link: p.link,
                        image: p.image,
                        category: p.category || ['websites'],
                        ready: p.status === 'completed' || !!p.link,
                    }));
                    setPreviewProjects(mapped);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section id="projects" className="bg-brand-light font-sans py-20 px-6 lg:px-12 md:py-32 flex justify-center items-center">
                <span className="text-brand-deep font-serif text-2xl font-bold animate-pulse">Loading projects...</span>
            </section>
        )
    }

    return (
        <section id="projects" className="bg-brand-light font-sans py-20 px-6 lg:px-12 md:py-32">
            <div className="max-w-[1280px] mx-auto w-full">
                <Reveal>
                    <div className="text-[11px] font-bold tracking-[3px] uppercase text-brand-neon mb-4">
                        {t('homePage.projects.portfolio')}
                    </div>
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-black text-brand-dark leading-[1.1] tracking-[-1.5px] m-0">
                            {t('homePage.projects.workWeAre')}<span className="text-brand-deep">{t('homePage.projects.proudOf')}</span>
                        </h2>
                        <a
                            href="/projects"
                            className="inline-flex items-center gap-2 font-sans text-[13px] font-bold text-brand-deep no-underline tracking-wide group transition-all"
                        >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                                {t('homePage.projects.viewAll')}
                            </span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                    <div className="h-[1px] bg-gradient-to-r from-[#c8ddd2] via-[#c8ddd2]/20 to-transparent mt-9" />
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-10 justify-items-center">
                    {previewProjects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
