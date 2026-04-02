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

function SoonBadge() {
    const [dotCount, setDotCount] = useState(0)
    useEffect(() => {
        const id = setInterval(() => setDotCount(c => (c + 1) % 4), 500)
        return () => clearInterval(id)
    }, [])
    return (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'rgba(4,217,57,0.07)',
                border: '1.5px solid rgba(4,217,57,0.2)',
                borderRadius: 16, padding: '28px 40px',
                flexDirection: 'column',
            }}>
                <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(28px,4vw,42px)',
                    fontWeight: 900, color: '#0a1a10',
                    letterSpacing: '-1.5px',
                }}>
                    Coming Soon<span style={{ color: '#04d939' }}>{'.'.repeat(dotCount)}</span>
                </div>
                <p style={{ fontSize: 14, color: '#6b8a78', lineHeight: 1.7, maxWidth: 400, margin: 0 }}>
                    We'll be publishing client reviews and amazing stories here soon.
                    Stay tuned for authentic testimonials!
                </p>
            </div>
        </div>
    )
}

export default function TestimonialsSection() {
    return (
        <section
            id="testimonials"
            style={{
                background: '#f7fbf8',
                fontFamily: "'DM Sans', sans-serif",
                padding: 'clamp(80px,10vw,130px) 6vw',
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');
      `}</style>

            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <Reveal>
                    <div style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '3px',
                        textTransform: 'uppercase', color: '#04d939', marginBottom: 16,
                    }}>
                        Client Love
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(28px,4vw,48px)',
                            fontWeight: 900, color: '#0a1a10',
                            lineHeight: 1.1, letterSpacing: '-1.5px', margin: 0,
                        }}>
                            What Clients <span style={{ color: '#004836' }}>Say.</span>
                        </h2>
                    </div>
                    <div style={{ height: 1, background: 'linear-gradient(90deg, #c8ddd2 0%, rgba(200,221,210,0.2) 60%, transparent 100%)', marginTop: 36, marginBottom: 40 }} />
                </Reveal>

                <Reveal delay={0.15}>
                    <SoonBadge />
                </Reveal>
            </div>
        </section>
    )
}