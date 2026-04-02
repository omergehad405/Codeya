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

function Reveal({ children, delay = 0, direction = 'up', className = '', style = {} }) {
    const [ref, inView] = useInView()
    const transforms = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)', none: 'none' }
    return (
        <div
            ref={ref}
            className={className}
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

const PILLARS = ['Clean Code', 'On-Time Delivery', 'Honest Pricing', 'Full Support']

export default function AboutSection() {
    return (
        <section
            id="about"
            style={{
                background: '#f7fbf8',
                fontFamily: "'DM Sans', sans-serif",
                padding: 'clamp(80px,10vw,130px) 6vw',
                overflow: 'hidden',
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }
        .about-pulse { animation: pulse 2s ease-in-out infinite; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1280px; margin: 0 auto; }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-visual { min-height: 400px !important; }
        }
      `}</style>

            <div className="about-grid">

                {/* ── LEFT ── */}
                <div>
                    <Reveal>
                        <div style={{
                            fontSize: 11, fontWeight: 700, letterSpacing: '3px',
                            textTransform: 'uppercase', color: '#04d939', marginBottom: 16,
                        }}>
                            Portfolio
                        </div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(32px,5vw,52px)',
                            fontWeight: 900, color: '#0a1a10',
                            lineHeight: 1.1, letterSpacing: '-1.5px',
                            marginBottom: 24,
                        }}>
                            We Are<br />
                            <span style={{ color: '#004836', fontStyle: 'italic' }}>Codeya</span><br />
                            Agency.
                        </h2>
                        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#6b8a78', marginBottom: 16, maxWidth: 480 }}>
                            We're a passionate team of developers and designers who believe that great digital
                            products don't happen by accident — they're built with intention, craft, and honest
                            communication.
                        </p>
                        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#6b8a78', marginBottom: 36, maxWidth: 480 }}>
                            Founded with the mission of{' '}
                            <strong style={{ color: '#004836', fontWeight: 700 }}>"Code Your Agency"</strong>
                            {' '}— we help businesses of all sizes take control of their digital presence.
                        </p>

                        {/* Pillars */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }}>
                            {PILLARS.map(t => (
                                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{
                                        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                                        background: 'rgba(4,217,57,0.12)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 12, color: '#04d939',
                                    }}>✦</div>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: '#004836' }}>{t}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* ── RIGHT ── */}
                <Reveal direction="right" delay={0.15}>
                    <div className="about-visual" style={{ position: 'relative', minHeight: 420 }}>

                        {/* Mission card */}
                        <div style={{
                            background: '#004836',
                            borderRadius: 20,
                            padding: '40px 36px',
                            color: '#fff',
                            position: 'relative',
                            zIndex: 1,
                        }}>
                            <div style={{
                                fontSize: 10, fontWeight: 700, letterSpacing: '3px',
                                textTransform: 'uppercase', color: 'rgba(4,217,57,0.5)',
                                marginBottom: 18,
                            }}>
                // OUR MISSION
                            </div>
                            <p style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(18px,2vw,22px)',
                                fontWeight: 700, lineHeight: 1.4,
                                letterSpacing: '-0.5px',
                            }}>
                                We build digital products that{' '}
                                <span style={{ color: '#04d939' }}>actually work</span>
                                {' '}— and look great doing it.
                            </p>

                            {/* Mini stats */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                                gap: 10, marginTop: 32,
                            }}>
                                {[['2+', 'Projects'], ['98%', 'Satisfied'], ['1yr', 'Experience']].map(([n, l]) => (
                                    <div key={l} style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: 12, padding: '14px 0',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{
                                            fontFamily: "'Playfair Display', serif",
                                            fontSize: 22, fontWeight: 900,
                                            color: '#04d939', lineHeight: 1,
                                        }}>{n}</div>
                                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Always Improving badge */}
                        <div style={{
                            position: 'absolute', bottom: -20, right: 0,
                            background: '#fff',
                            border: '1.5px solid rgba(4,217,57,0.3)',
                            borderRadius: 16, padding: '14px 18px',
                            display: 'flex', alignItems: 'center', gap: 10,
                            boxShadow: '0 12px 36px rgba(0,72,54,0.1)',
                            zIndex: 2,
                        }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: '50%',
                                background: '#004836', flexShrink: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04d939" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#004836' }}>Always Improving</div>
                                <div style={{ fontSize: 11, color: '#6b8a78', marginTop: 2 }}>Latest tech stack</div>
                            </div>
                        </div>

                        {/* Founded badge */}
                        <div style={{
                            position: 'absolute', bottom: -20, left: 0,
                            background: '#f7fbf8',
                            border: '1.5px solid #e4ede8',
                            borderRadius: 16, padding: '14px 20px',
                            boxShadow: '0 8px 24px rgba(0,72,54,0.07)',
                            zIndex: 2,
                        }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', color: '#6b8a78', marginBottom: 4 }}>FOUNDED</div>
                            <div style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 28, fontWeight: 900,
                                color: '#004836', letterSpacing: '-1px',
                            }}>2026</div>
                        </div>

                    </div>
                </Reveal>
            </div>
        </section>
    )
}