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

function Reveal({ children, delay = 0 }) {
    const [ref, inView] = useInView()
    return (
        <div
            ref={ref}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(36px)',
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    )
}

const contacts = [
    {
        href: 'mailto:codeyaa01@gmail.com', type: 'EMAIL', val: 'codeyaa01@gmail.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#04d939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
    },
    {
        href: 'https://wa.me/20110710609', type: 'WHATSAPP', val: '+20 110 710 609',
        icon: (
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#04d939" />
                <path d="M23.51 19.81c-.36-.18-2.12-1.05-2.44-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.15 1.41-.21.24-.42.27-.78.09a6.54 6.54 0 0 1-1.93-1.19 7.15 7.15 0 0 1-1.34-1.68c-.14-.24-.01-.37.11-.49.12-.12.27-.3.39-.45.13-.14.18-.24.27-.39.09-.15.05-.3-.03-.48-.08-.18-.82-1.97-1.13-2.69-.29-.72-.59-.62-.81-.63-.21-.01-.46-.01-.71-.01-.25 0-.65.09-.99.45-.34.36-1.3 1.17-1.3 2.84s1.33 3.3 1.52 3.53c.18.22 2.62 4.12 6.58 5.14.42.11.75.18 1.01.29.42.18.81.15 1.11.09.33-.06 1.02-.42 1.16-.83.15-.42.15-.78.11-.85-.03-.07-.14-.11-.3-.17z" fill="#004836" />
            </svg>
        ),
    },
    {
        href: 'https://www.facebook.com/profile.php?id=61578461982344', type: 'FACEBOOK', val: 'Codeya',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#04d939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        href: 'https://www.instagram.com/codeyaa01/', type: 'INSTAGRAM', val: '@codeyaa01',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#04d939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="#04d939" stroke="none" />
            </svg>
        ),
    },
]

function ContactCard({ contact: c }) {
    return (
        <a
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="group flex flex-col items-center bg-white/6 border border-brand-neon/15 rounded-2xl p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-brand-neon/10 hover:border-brand-neon/40 w-full"
        >
            <div className="w-11 h-11 rounded-xl bg-brand-neon/12 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                {c.icon}
            </div>
            <div className="text-[10px] font-bold tracking-widest text-brand-neon/50 mb-1.5 uppercase">
                {c.type}
            </div>
            <div className="text-[11px] font-medium text-white/70 leading-relaxed break-all text-center">
                {c.val}
            </div>
        </a>
    )
}


export default function ContactSection() {
    const { t } = useTranslation()
    return (
        <section id="contact" className="bg-brand-deep font-sans py-24 px-6 md:py-32 lg:px-12 relative overflow-hidden text-center">
            
            {/* Radial glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(4,217,57,0.06)_0%,transparent_65%)]" />

            {/* Large bg text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(120px,20vw,280px)] font-black text-white/[0.02] whitespace-nowrap pointer-events-none tracking-[-4px]">
                →
            </div>

            <div className="relative z-[1]">
                <Reveal>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-brand-neon/12 border border-brand-neon/30 rounded-full px-4 py-1.5 font-sans text-xs font-bold text-brand-neon tracking-wider uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                        {t('homePage.contact.getInTouch')}
                    </div>

                    {/* Heading */}
                    <h2 className="font-serif text-[clamp(34px,5vw,64px)] font-black text-white leading-[1.05] tracking-[-2px] mb-4">
                        {t('homePage.contact.readyToBuild')}<br />
                        <span className="text-brand-neon italic">{t('homePage.contact.somethingGreat')}</span>
                    </h2>

                    {/* Sub */}
                    <p className="text-[15px] text-white/45 max-w-[440px] mx-auto mb-11 leading-relaxed">
                        {t('homePage.contact.desc')}
                    </p>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1000px] mx-auto justify-items-center">
                        {contacts.map((c, i) => (
                            <ContactCard key={c.type} contact={c} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}