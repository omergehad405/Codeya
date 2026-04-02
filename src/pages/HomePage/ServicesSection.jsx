import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function useInView(threshold = 0.1) {
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

function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
    const [ref, inView] = useInView()
    const transforms = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)', none: 'none' }
    return (
        <div
            ref={ref}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : transforms[direction],
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
                ...style,
            }}
        >
            {children}
        </div>
    )
}


function ServiceCard({ num, icon, title, desc, index }) {
    const [ref, inView] = useInView()

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out h-full flex
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'}`}
            style={{ transitionDelay: `${index * 0.08}s` }}
        >
            <article className="group bg-white border border-brand-border rounded-[20px] p-8 md:p-10 transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-neon hover:shadow-[0_16px_48px_rgba(0,72,54,0.1)] flex flex-col items-start relative overflow-hidden h-full cursor-default">
                {/* accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-neon to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />

                <div className="text-[clamp(10px,2vw,13px)] font-bold tracking-widest text-[#c8ddd2] mb-5 uppercase">
                    {num}
                </div>
                <div className="text-[clamp(24px,4vw,38px)] mb-4">
                    {icon}
                </div>
                <h3 className="font-serif text-[clamp(18px,2.4vw,22px)] font-bold text-brand-dark mb-3.5 leading-tight">
                    {title}
                </h3>
                <p className="text-[clamp(12px,1.5vw,14px)] leading-relaxed text-[#6b8a78] flex-grow">
                    {desc}
                </p>
            </article>
        </div>
    )
}

export default function ServicesSection() {
    const { t } = useTranslation()
    const services = [
        { num: '01', icon: '⚡', title: t('homePage.services.list.web.title'), desc: t('homePage.services.list.web.desc') },
        { num: '02', icon: '🎨', title: t('homePage.services.list.uiux.title'), desc: t('homePage.services.list.uiux.desc') },
        { num: '03', icon: '🔧', title: t('homePage.services.list.backend.title'), desc: t('homePage.services.list.backend.desc') },
        { num: '04', icon: '📱', title: t('homePage.services.list.mobile.title'), desc: t('homePage.services.list.mobile.desc') },
        { num: '05', icon: '🚀', title: t('homePage.services.list.perf.title'), desc: t('homePage.services.list.perf.desc') },
        { num: '06', icon: '🛡️', title: t('homePage.services.list.support.title'), desc: t('homePage.services.list.support.desc') },
    ]

    return (
        <section id="services" className="bg-white font-sans py-20 px-6 lg:px-12 md:py-32 overflow-hidden">
            <div className="max-w-[1280px] mx-auto w-full">
                <Reveal>
                    <div className="text-[clamp(10px,1.3vw,13px)] font-bold tracking-[3px] uppercase text-brand-neon mb-4">
                        {t('homePage.services.whatWeDo')}
                    </div>
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <h2 className="font-serif text-[clamp(24px,4vw,48px)] font-black text-brand-dark leading-[1.1] tracking-[-1.5px] m-0">
                            {t('homePage.services.our')}<span className="text-brand-deep">{t('homePage.services.services')}</span>
                        </h2>
                        <p className="text-[clamp(12px,1.5vw,16px)] text-[#6b8a78] max-w-[380px] leading-relaxed m-0">
                            {t('homePage.services.desc')}
                        </p>
                    </div>
                    <div className="h-[1px] bg-gradient-to-r from-[#c8ddd2] via-[#c8ddd2]/20 to-transparent mt-9" />
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
                    {services.map((s, i) => (
                        <ServiceCard key={s.num} {...s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}