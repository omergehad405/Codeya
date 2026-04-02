import React, { useEffect, useRef, useState } from 'react'

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

const services = [
    { num: '01', icon: '⚡', title: 'Web Development', desc: 'Fast, responsive websites and web apps built with modern technologies that scale with your business goals.' },
    { num: '02', icon: '🎨', title: 'UI / UX Design', desc: 'Beautiful, user-centered interfaces that convert visitors into customers and keep them coming back for more.' },
    { num: '03', icon: '🔧', title: 'Backend & APIs', desc: 'Robust server-side solutions, databases, and API integrations that power your digital products reliably.' },
    { num: '04', icon: '📱', title: 'Mobile App Services', desc: 'End-to-end development of powerful and user-friendly mobile applications for iOS and Android.' },
    { num: '05', icon: '🚀', title: 'Performance Tuning', desc: 'Speed matters. We audit, optimize, and ensure every millisecond counts for your user experience and SEO.' },
    { num: '06', icon: '🛡️', title: 'Maintenance & Support', desc: "We don't disappear after launch.Ongoing support, updates, and monitoring keep your product running smoothly." },
]

function ServiceCard({ num, icon, title, desc, index }) {
    const [ref, inView] = useInView()
    const [hovered, setHovered] = useState(false)

    return (
        <div
            ref={ref}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(36px)',
                transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
                height: '100%',
                display: 'flex',
            }}
        >
            <article
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    background: '#fff',
                    border: `1.5px solid ${hovered ? '#04d939' : '#e4ede8'}`,
                    borderRadius: 20,
                    padding: 'clamp(20px,5vw,36px) clamp(12px,4vw,32px)', // responsive paddings
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'default',
                    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: hovered ? '0 16px 48px rgba(0,72,54,0.1)' : 'none',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                {/* accent bar */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                    background: 'linear-gradient(90deg, #04d939, transparent)',
                    transformOrigin: 'left',
                    transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.35s ease',
                }} />

                <div
                    style={{
                        fontSize: 'clamp(10px,2vw,13px)',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        color: '#c8ddd2',
                        marginBottom: 'clamp(12px,2vw,20px)',
                        minHeight: 'clamp(15px,2vw,22px)',
                    }}
                >
                    {num}
                </div>
                <div
                    style={{
                        fontSize: 'clamp(24px,4vw,38px)',
                        marginBottom: 'clamp(10px,2vw,18px)',
                        minHeight: 'clamp(28px,4vw,40px)',
                    }}
                >
                    {icon}
                </div>
                <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(16px,2.4vw,22px)',
                    fontWeight: 700,
                    color: '#0a1a10',
                    marginBottom: 'clamp(7px,1vw,14px)',
                    lineHeight: 1.2,
                }}>{title}</h3>
                <p style={{
                    fontSize: 'clamp(12px,1.5vw,14px)',
                    lineHeight: 1.75,
                    color: '#6b8a78',
                    flex: '1 1 auto',
                }}>{desc}</p>
            </article>
        </div>
    )
}

export default function ServicesSection() {
    return (
        <section
            id="services"
            style={{
                background: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                padding: 'clamp(60px,8vw,130px) 4vw',
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
            gap: clamp(14px,2vw,28px);
            margin-top: 40px;
        }
        @media (max-width: 500px) {
            .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <Reveal>
                    <div style={{
                        fontSize: 'clamp(9px,1.3vw,13px)',
                        fontWeight: 700,
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color: '#04d939',
                        marginBottom: 16,
                    }}>
                        What We Do
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 16,
                    }}>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(22px,4vw,48px)',
                            fontWeight: 900,
                            color: '#0a1a10',
                            lineHeight: 1.1,
                            letterSpacing: '-1.5px',
                            margin: 0,
                        }}>
                            Our <span style={{ color: '#004836' }}>Services.</span>
                        </h2>
                        <p style={{
                            fontSize: 'clamp(12px,1.5vw,16px)',
                            color: '#6b8a78',
                            maxWidth: 380,
                            lineHeight: 1.7,
                            margin: 0,
                        }}>
                            Everything you need to bring your digital product to life — designed and engineered with care.
                        </p>
                    </div>
                    <div style={{
                        height: 1,
                        background: 'linear-gradient(90deg, #c8ddd2 0%, rgba(200,221,210,0.2) 60%, transparent 100%)',
                        marginTop: 36,
                    }} />
                </Reveal>

                <div className="services-grid">
                    {services.map((s, i) => (
                        <ServiceCard key={s.num} {...s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}