import React, { useEffect, useRef, useState } from 'react'

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

export default function ContactSection() {
    return (
        <section
            id="contact"
            style={{
                background: '#004836',
                fontFamily: "'DM Sans', sans-serif",
                padding: 'clamp(100px,12vw,150px) 6vw',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=Playfair+Display:ital,wght@0,900;1,900&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }
        .contact-pulse { animation: pulse 2s ease-in-out infinite; }
        .contact-cards { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 16px; 
            max-width: 900px; 
            margin: 0 auto; 
            justify-content: center; 
        }
        .contact-card-item {
            flex: 1 1 210px;
            min-width: 180px;
            max-width: 100%;
            box-sizing: border-box;
        }
        @media (max-width: 900px) {
            .contact-cards { gap: 12px; }
            .contact-card-item { flex: 1 1 45%; min-width: 140px;}
        }
        @media (max-width: 700px) { 
            .contact-cards { flex-direction: row; flex-wrap: wrap; gap: 12px; }
            .contact-card-item { flex: 1 1 100%; min-width: 130px;}
        }
      `}</style>

            {/* Radial glow */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, rgba(4,217,57,0.06) 0%, transparent 65%)',
            }} />

            {/* Large bg text */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(120px,20vw,280px)',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.02)',
                whiteSpace: 'nowrap', pointerEvents: 'none',
                letterSpacing: '-4px',
            }}>→</div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <Reveal>
                    {/* Badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(4,217,57,0.12)',
                        border: '1px solid rgba(4,217,57,0.3)',
                        borderRadius: 100, padding: '6px 16px',
                        fontSize: 12, fontWeight: 700, color: '#04d939',
                        letterSpacing: '1px', textTransform: 'uppercase',
                        marginBottom: 24,
                    }}>
                        <span className="contact-pulse" style={{
                            width: 7, height: 7, borderRadius: '50%',
                            background: '#04d939', display: 'inline-block',
                        }} />
                        Get in touch
                    </div>

                    {/* Heading */}
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(34px,5vw,64px)',
                        fontWeight: 900, color: '#fff',
                        lineHeight: 1.05, letterSpacing: '-2px',
                        marginBottom: 16,
                    }}>
                        Ready to Build<br />
                        <span style={{ color: '#04d939', fontStyle: 'italic' }}>Something Great?</span>
                    </h2>

                    {/* Sub */}
                    <p style={{
                        fontSize: 15, color: 'rgba(255,255,255,0.45)',
                        maxWidth: 440, margin: '0 auto 44px',
                        lineHeight: 1.8,
                    }}>
                        Code Your Agency. Reach out — we'll get back to you within 24 hours
                        with a clear plan and honest pricing.
                    </p>

                    {/* Cards */}
                    <div className="contact-cards">
                        {contacts.map((c, i) => (
                            <ContactCard key={c.type} contact={c} delay={i * 0.08} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

function ContactCard({ contact: c, delay }) {
    const [hovered, setHovered] = useState(false)
    return (
        <a
            className="contact-card-item"
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                borderRadius: 16, padding: '24px 16px',
                textDecoration: 'none',
                background: hovered ? 'rgba(4,217,57,0.1)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${hovered ? 'rgba(4,217,57,0.4)' : 'rgba(4,217,57,0.15)'}`,
                transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                boxSizing: 'border-box'
            }}
        >
            <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(4,217,57,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 12,
            }}>
                {c.icon}
            </div>
            <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '1.5px',
                color: 'rgba(4,217,57,0.5)', marginBottom: 6,
                textTransform: 'uppercase',
            }}>
                {c.type}
            </div>
            <div style={{
                fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.4, wordBreak: 'break-all', textAlign: 'center',
            }}>
                {c.val}
            </div>
        </a>
    )
}