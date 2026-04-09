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

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
    const [ref, inView] = useInView()
    const transforms = {
        up: 'translate-y-9',
        left: '-translate-x-9',
        right: 'translate-x-9',
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

export default function AboutSection() {
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

    const PILLARS = [
        t('homePage.about.pillars.clean'),
        t('homePage.about.pillars.onTime'),
        t('homePage.about.pillars.honest'),
        t('homePage.about.pillars.support')
    ]

    return (
        <section id="about" className="bg-brand-light font-sans py-20 px-6 lg:px-12 md:py-32 overflow-hidden">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 min-[901px]:grid-cols-2 gap-12 min-[901px]:gap-20 items-center">

                {/* ── LEFT ── */}
                <div>
                    <Reveal>
                        <div className="text-[11px] font-bold tracking-[3px] uppercase text-brand-neon mb-4">
                            {t('homePage.about.portfolio')}
                        </div>
                        <h2 className="font-serif text-[clamp(32px,5vw,52px)] font-black text-brand-dark leading-[1.1] tracking-[-1.5px] mb-6">
                            {t('homePage.about.weAre')}<br />
                            <span className="text-brand-deep italic">{t('homePage.about.p2b')}</span><br />
                            {t('homePage.about.agency')}
                        </h2>
                        <p className="text-[15px] leading-relaxed text-[#6b8a78] mb-4 max-w-[480px]">
                            {t('homePage.about.p1')}
                        </p>
                        <p className="text-[14px] leading-relaxed text-[#6b8a78] mb-9 max-w-[480px]">
                            {t('homePage.about.p2a')}{' '}
                            <strong className="text-brand-deep font-bold">{t('homePage.about.p2b')}</strong>
                            {' '}{t('homePage.about.p2c')}
                        </p>

                        {/* Pillars */}
                        <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                            {PILLARS.map(text => (
                                <div key={text} className="flex items-center gap-2">
                                    <div className="w-[26px] h-[26px] rounded-lg shrink-0 bg-brand-neon/12 flex items-center justify-center text-[12px] text-brand-neon">
                                        ✦
                                    </div>
                                    <span className="text-[13px] font-bold text-brand-deep">{text}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* ── RIGHT ── */}
                <Reveal direction="right" delay={0.15}>
                    <div className="relative min-h-[420px] w-full">

                        {/* Mission card */}
                        <div className="bg-brand-deep rounded-[20px] p-10 md:p-9 text-white relative z-[1]">
                            <div className="text-[10px] font-bold tracking-[3px] uppercase text-brand-neon/50 mb-[18px]">
                                {t('homePage.about.ourMission')}
                            </div>
                            <p className="font-serif text-[clamp(18px,2vw,22px)] font-bold leading-[1.4] tracking-[-0.5px]">
                                {t('homePage.about.missionP1')}{' '}
                                <span className="text-brand-neon">{t('homePage.about.missionP2')}</span>
                                {' '}{t('homePage.about.missionP3')}
                            </p>

                            {/* Mini stats */}
                            <div className="grid grid-cols-3 gap-2.5 mt-8">
                                {[
                                    [`${apiStats.projectsCount || 2}+`, t('homePage.about.miniStats.projects')],
                                    [`${apiStats.successRate || 98}%`, t('homePage.about.miniStats.satisfied')],
                                    [`${Math.max(1, new Date().getFullYear() - 2025)}yr`, t('homePage.about.miniStats.experience')]
                                ].map(([n, l], idx) => (
                                    <div key={idx} className="bg-white/6 rounded-xl py-3.5 text-center">
                                        <div className="font-serif text-[22px] font-black text-brand-neon leading-none">{n}</div>
                                        <div className="text-[11px] text-white/40 mt-1">{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Always Improving badge */}
                        <div className="absolute -bottom-5 right-0 bg-white border border-brand-neon/30 rounded-2xl px-[18px] py-3.5 flex items-center gap-2.5 shadow-[0_12px_36px_rgba(0,72,54,0.1)] z-[2]">
                            <div className="w-[38px] h-[38px] rounded-full bg-brand-deep shrink-0 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04d939" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-[13px] font-bold text-brand-deep leading-none">{t('homePage.about.alwaysImproving')}</div>
                                <div className="text-[11px] text-[#6b8a78] mt-1">{t('homePage.about.latestTech')}</div>
                            </div>
                        </div>

                        {/* Founded badge */}
                        <div className="absolute -bottom-5 left-0 bg-brand-light border border-brand-border rounded-2xl px-5 py-3.5 shadow-[0_8px_24px_rgba(0,72,54,0.07)] z-[2]">
                            <div className="text-[10px] font-bold tracking-[2px] text-[#6b8a78] uppercase mb-1">{t('homePage.about.founded')}</div>
                            <div className="font-serif text-[28px] font-black text-brand-deep tracking-tighter">2026</div>
                        </div>

                    </div>
                </Reveal>
            </div>
        </section>
    )
}