import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function Counter({ target, suffix = '' }) {
    const [val, setVal] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return
            obs.disconnect()
            let s = 0
            const step = () => {
                s += Math.ceil(target / 40)
                if (s >= target) { setVal(target); return }
                setVal(s); requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
        }, { threshold: 0.5 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [target])
    return <span ref={ref}>{val}{suffix}</span>
}



export default function StatsBand() {
    const { t } = useTranslation()

    const statsData = [
        { num: 2, suffix: '+', label: t('homePage.stats.projectsComp') },
        { num: 98, suffix: '%', label: t('homePage.stats.clientSat') },
        { num: 1, suffix: 'yr', label: t('homePage.stats.industry') },
        { num: 24, suffix: 'h', label: t('homePage.stats.responseTime') },
    ]

    return (
        <div className="bg-brand-deep font-sans grid grid-cols-2 lg:grid-cols-4">
            {statsData.map((s, i) => (
                <div
                    key={s.label}
                    className={`flex flex-col items-center justify-center py-10 lg:py-16 px-5 border-white/5 
                        ${i % 2 === 0 ? 'border-r' : ''} 
                        ${i < 2 ? 'border-b lg:border-b-0' : ''} 
                        ${i === 2 ? 'lg:border-r' : ''}`}
                >
                    <div className="font-serif text-[clamp(36px,5vw,52px)] font-black text-brand-neon tracking-tight leading-none">
                        <Counter target={s.num} suffix={s.suffix} />
                    </div>
                    <div className="text-[11px] font-bold text-white/35 tracking-[2.5px] mt-2.5 uppercase">
                        {s.label}
                    </div>
                </div>
            ))}
        </div>
    )
}