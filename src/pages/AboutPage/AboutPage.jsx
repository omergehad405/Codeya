import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'



function useInView(threshold = 0.15) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [threshold])
    return [ref, inView]
}

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
    const [ref, inView] = useInView()
    const transforms = {
        up: 'translate-y-10',
        left: '-translate-x-10',
        right: 'translate-x-10',
        none: 'translate-0'
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

export default function AboutPage() {
    const { t } = useTranslation()
    const [apiStats, setApiStats] = useState({ projectsCount: 2, successRate: 98 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('https://codeya-backend.onrender.com/api/stats');
                const result = await res.json();
                if (result.status === 'success') {
                    setApiStats(result.data);
                }
            } catch (err) { }
        };
        fetchStats();
    }, []);

    const stats = [
        { num: `${apiStats.projectsCount || 2}+`, label: t('aboutPage.stats.projects') },
        { num: `${apiStats.successRate || 98}%`, label: t('aboutPage.stats.satisfaction') },
        { num: `${Math.max(1, new Date().getFullYear() - 2025)}+`, label: t('aboutPage.stats.years') },
        { num: '24h', label: t('aboutPage.stats.response') },
    ]

    const values = [
        { icon: '⚡', title: t('aboutPage.values.speedTitle'), desc: t('aboutPage.values.speedDesc') },
        { icon: '🔍', title: t('aboutPage.values.transparencyTitle'), desc: t('aboutPage.values.transparencyDesc') },
        { icon: '🤝', title: t('aboutPage.values.partnersTitle'), desc: t('aboutPage.values.partnersDesc') },
        { icon: '🚀', title: t('aboutPage.values.scaleTitle'), desc: t('aboutPage.values.scaleDesc') },
    ]

    const statsRef = useRef(null)

    return (
        <div className="font-sans bg-brand-light overflow-x-hidden">
            {/* ── HERO ── */}
            <div className="relative bg-brand-deep min-h-[92vh] flex flex-col justify-end px-6 pb-20 md:px-12 lg:px-24 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(100px,18vw,220px)] font-black text-white/[0.03] whitespace-nowrap pointer-events-none tracking-[-4px]">
                    CODEYAA
                </div>
                <div className="absolute top-10 right-6 md:right-12 font-sans text-xs text-white/20 tracking-[3px] uppercase [writing-mode:vertical-rl]">
                    Est. 2026
                </div>
                <div className="absolute top-10 left-6 md:left-12 grid grid-cols-5 gap-2 opacity-15">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-white" />
                    ))}
                </div>

                <div className="animate-[fadeUp_0.8s_ease_0.2s_forwards] opacity-0">
                    <div className="inline-flex items-center gap-2 bg-brand-neon/12 border border-brand-neon/30 rounded-full px-4 py-1.5 text-xs font-bold text-brand-neon tracking-widest uppercase mb-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                        {t('aboutPage.hero.badge')}
                    </div>
                </div>

                <div className="animate-[fadeUp_0.8s_ease_0.4s_forwards] opacity-0">
                    <h1 className="font-serif text-[clamp(42px,7vw,90px)] font-black text-white leading-none tracking-tight mb-6">
                        {t('aboutPage.hero.title1')}<br />
                        <span className="text-brand-neon">{t('aboutPage.hero.title2')}</span><br />
                        {t('aboutPage.hero.title3')}
                    </h1>
                </div>

                <div className="animate-[fadeUp_0.8s_ease_0.6s_forwards] opacity-0">
                    <p className="text-[clamp(14px,1.5vw,17px)] text-white/55 max-w-[500px] leading-relaxed mb-12">
                        {t('aboutPage.hero.sub')}
                    </p>
                </div>

                <div className="flex items-center gap-3 text-white/30 text-[10px] tracking-[2px] uppercase">
                    <div className="w-12 h-[1px] bg-white/20" />
                    {t('aboutPage.hero.scroll')}
                </div>
            </div>

            {/* ── STORY ── */}
            <div className="py-20 px-6 md:py-32 lg:px-24 bg-brand-light">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 min-[901px]:grid-cols-2 gap-12 min-[901px]:gap-20 items-center">
                    <FadeIn direction="left">
                        <div>
                            <div className="text-[11px] font-bold tracking-[3px] uppercase text-brand-neon mb-4">
                                {t('aboutPage.story.tag')}
                            </div>
                            <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-black text-brand-dark leading-tight tracking-tight mb-8">
                                {t('aboutPage.story.title1')}<br />
                                <span className="text-brand-deep">{t('aboutPage.story.title2')}</span>
                            </h2>
                            <div className="space-y-4 text-[15px] text-[#4a6b58] leading-relaxed">
                                <p>
                                    {t('aboutPage.story.p1')} <strong className="text-brand-deep font-bold">2026</strong>{t('aboutPage.story.p1part2')}
                                </p>
                                <p>{t('aboutPage.story.p2')}</p>
                                <p>{t('aboutPage.story.p3')}</p>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="right" delay={0.15}>
                        <div className="relative">
                            <div className="bg-brand-deep rounded-[24px] p-10 text-white relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-brand-neon/8" />
                                <div className="font-serif text-[72px] font-black text-brand-neon/15 leading-none mb-2">26</div>
                                <p className="text-lg font-semibold text-white leading-relaxed mb-5">{t('aboutPage.story.quote')}</p>
                                <p className="text-xs text-[#7aab96] tracking-wider uppercase">{t('aboutPage.story.author')}</p>
                            </div>
                            <div className="absolute -bottom-5 left-10 bg-brand-neon text-brand-deep text-xs font-black px-5 py-2.5 rounded-full tracking-wide shadow-[0_8px_24px_rgba(4,217,57,0.3)]">
                                {t('aboutPage.story.floatingTag')}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* ── STATS ── */}
            <div className="stats-section bg-brand-deep" ref={statsRef}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px]">
                    {stats.map((s, i) => (
                        <FadeIn key={s.label} delay={i * 0.1}>
                            <div className="p-10 md:p-14 text-center border-white/5 min-[901px]:border-r last:border-r-0">
                                <div className="font-serif text-[clamp(36px,4vw,60px)] font-black text-brand-neon leading-none mb-2.5">
                                    {s.num}
                                </div>
                                <div className="text-xs text-white/40 tracking-[1.5px] uppercase">
                                    {s.label}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>

            {/* ── VALUES ── */}
            <div className="py-20 px-6 md:py-32 lg:px-24 bg-brand-light">
                <div className="max-w-[1280px] mx-auto">
                    <FadeIn>
                        <div className="text-[11px] font-bold tracking-[3px] uppercase text-brand-neon mb-4">
                            {t('aboutPage.principles.tag')}
                        </div>
                        <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-black text-brand-dark leading-tight tracking-tight">
                            {t('aboutPage.principles.title1')}<span className="text-brand-deep">{t('aboutPage.principles.title2')}</span>
                        </h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
                        {values.map((v, i) => (
                            <FadeIn key={v.title} delay={i * 0.1}>
                                <div className="bg-white border border-brand-border rounded-[20px] p-8 transition-all duration-300 cursor-default hover:border-brand-neon hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,72,54,0.08)]">
                                    <span className="text-[28px] mb-4 block">{v.icon}</span>
                                    <div className="text-base font-bold text-brand-dark mb-2">{v.title}</div>
                                    <div className="text-[13px] text-[#6b8a78] leading-relaxed">{v.desc}</div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── CTA ── */}
            <div className="bg-brand-dark text-center py-24 px-6 md:py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(150px,25vw,300px)] font-black text-white/[0.015] whitespace-nowrap pointer-events-none tracking-tighter">
                    →
                </div>
                <div className="relative z-10 max-w-[800px] mx-auto">
                    <FadeIn>
                        <h2 className="font-serif text-[clamp(32px,5vw,64px)] font-black text-white mb-5 tracking-tight">
                            {t('aboutPage.cta.title1')}<br />
                            <span className="text-brand-neon">{t('aboutPage.cta.title2')}</span>
                        </h2>
                        <p className="text-[15px] text-white/40 mb-10">{t('aboutPage.cta.sub')}</p>
                        <a href="/contact" className="inline-flex items-center gap-2.5 bg-brand-neon text-brand-deep text-sm font-black px-9 py-4 rounded-full tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_0_12px_rgba(4,217,57,0.1)]">
                            {t('aboutPage.cta.btn')}
                        </a>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
