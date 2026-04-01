import React, { useEffect, useRef, useState } from 'react'

const stats = [
    { num: '2+', label: 'Projects Shipped' },
    { num: '98%', label: 'Client Satisfaction' },
    { num: '1+', label: 'Years Building' },
    { num: '24h', label: 'Avg. Response Time' },
]

const values = [
    { icon: '⚡', title: 'Speed without shortcuts', desc: 'We move fast — but never at the cost of quality. Every line of code matters.' },
    { icon: '🔍', title: 'Radical transparency', desc: 'No fluff, no hidden costs. You always know where your project stands.' },
    { icon: '🤝', title: 'Partners, not vendors', desc: "We treat your business like it's ours. Your win is our win." },
    { icon: '🚀', title: 'Built to scale', desc: 'We architect with growth in mind. What we build today handles tomorrow.' },
]

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
    const transforms = { up: 'translateY(40px)', left: 'translateX(-40px)', right: 'translateX(40px)', none: 'none' }
    return (
        <div
            ref={ref}
            className={className}
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

export default function AboutPage() {
    const [count, setCount] = useState({ p: 0, c: 0, y: 0 })
    const statsRef = useRef(null)
    const [statsVisible, setStatsVisible] = useState(false)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setStatsVisible(true) },
            { threshold: 0.3 }
        )
        if (statsRef.current) obs.observe(statsRef.current)
        return () => obs.disconnect()
    }, [])

    return (
        <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#f7fbf8', overflowX: 'hidden' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .about-hero { position: relative; background: #004836; min-height: 92vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 6vw 8vh; overflow: hidden; }
                .hero-bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: clamp(100px,18vw,220px); font-weight: 900; color: rgba(255,255,255,0.03); white-space: nowrap; pointer-events: none; font-family: 'Playfair Display', serif; letter-spacing: -4px; }
                .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(4,217,57,0.12); border: 1px solid rgba(4,217,57,0.3); border-radius: 30px; padding: 6px 16px; font-size: 12px; font-weight: 600; color: #04d939; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 28px; }
                .pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: #04d939; animation: pulse 2s ease-in-out infinite; }
                @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }
                .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(42px, 7vw, 90px); font-weight: 900; color: #fff; line-height: 1.0; letter-spacing: -2px; margin-bottom: 24px; }
                .hero-title span { color: #04d939; }
                .hero-sub { font-size: clamp(14px, 1.5vw, 17px); color: rgba(255,255,255,0.55); max-width: 500px; line-height: 1.8; margin-bottom: 48px; }
                .hero-scroll { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.3); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
                .scroll-line { width: 48px; height: 1px; background: rgba(255,255,255,0.2); }
                .hero-corner { position: absolute; top: 40px; right: 6vw; font-size: 12px; color: rgba(255,255,255,0.2); letter-spacing: 3px; text-transform: uppercase; writing-mode: vertical-rl; }
                .hero-dots { position: absolute; top: 40px; left: 6vw; display: grid; grid-template-columns: repeat(5,1fr); gap: 8px; opacity: 0.15; }
                .hdot { width: 4px; height: 4px; border-radius: 50%; background: #fff; }

                .section { padding: clamp(60px, 10vw, 120px) 6vw; }
                .section-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #04d939; margin-bottom: 16px; }
                .section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: #0a1a10; line-height: 1.15; letter-spacing: -1px; }
                .section-title span { color: #004836; }

                .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
                .story-text p { font-size: 15px; color: #4a6b58; line-height: 1.9; margin-bottom: 18px; }
                .story-text p strong { color: #004836; font-weight: 700; }
                .story-visual { position: relative; }
                .story-card { background: #004836; border-radius: 24px; padding: 40px; color: #fff; position: relative; overflow: hidden; }
                .story-card::before { content: ''; position: absolute; top: -40px; right: -40px; width: 180px; height: 180px; border-radius: 50%; background: rgba(4,217,57,0.08); }
                .story-year { font-size: 72px; font-weight: 900; color: rgba(4,217,57,0.15); font-family: 'Playfair Display', serif; line-height: 1; margin-bottom: 8px; }
                .story-quote { font-size: 18px; font-weight: 600; color: #fff; line-height: 1.5; margin-bottom: 20px; }
                .story-author { font-size: 12px; color: #7aab96; letter-spacing: 1px; }
                .floating-tag { position: absolute; bottom: -20px; left: 40px; background: #04d939; color: #004836; font-size: 12px; font-weight: 800; padding: 10px 20px; border-radius: 30px; letter-spacing: 0.5px; box-shadow: 0 8px 24px rgba(4,217,57,0.3); }

                .stats-section { background: #004836; }
                .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
                .stat-block { padding: 60px 40px; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); }
                .stat-block:last-child { border-right: none; }
                .stat-num { font-family: 'Playfair Display', serif; font-size: clamp(36px,4vw,60px); font-weight: 900; color: #04d939; line-height: 1; margin-bottom: 10px; }
                .stat-label { font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 1.5px; text-transform: uppercase; }

                .values-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 48px; }
                .value-card { background: #fff; border: 1.5px solid #e4ede8; border-radius: 20px; padding: 32px; transition: all 0.3s ease; cursor: default; }
                .value-card:hover { border-color: #04d939; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,72,54,0.08); }
                .value-icon { font-size: 28px; margin-bottom: 16px; display: block; }
                .value-title { font-size: 16px; font-weight: 700; color: #0a1a10; margin-bottom: 8px; }
                .value-desc { font-size: 13px; color: #6b8a78; line-height: 1.7; }

                .team-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 48px; }
                .team-card { border-radius: 20px; overflow: hidden; cursor: pointer; transition: transform 0.3s ease; position: relative; }
                .team-card:hover { transform: translateY(-8px); }
                .team-avatar { aspect-ratio: 3/4; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; }
                .team-emoji { font-size: 52px; margin-bottom: 12px; }
                .team-name { font-size: 14px; font-weight: 700; color: #fff; text-align: center; padding: 0 12px; }
                .team-role { font-size: 11px; color: rgba(255,255,255,0.55); text-align: center; margin-top: 4px; letter-spacing: 0.3px; }
                .team-overlay { position: absolute; inset: 0; background: rgba(4,217,57,0.92); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; opacity: 0; transition: opacity 0.3s ease; }
                .team-card:hover .team-overlay { opacity: 1; }
                .team-overlay p { font-size: 13px; color: #004836; font-weight: 600; text-align: center; line-height: 1.6; }

                .cta-section { background: #0a1a10; text-align: center; padding: clamp(80px,12vw,140px) 6vw; position: relative; overflow: hidden; }
                .cta-bg { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 300px; color: rgba(255,255,255,0.015); font-family: 'Playfair Display', serif; font-weight: 900; pointer-events: none; white-space: nowrap; }
                .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(32px,5vw,64px); font-weight: 900; color: #fff; margin-bottom: 20px; letter-spacing: -1px; }
                .cta-title span { color: #04d939; }
                .cta-sub { font-size: 15px; color: rgba(255,255,255,0.4); margin-bottom: 40px; }
                .cta-btn { display: inline-flex; align-items: center; gap: 10px; background: #04d939; color: #004836; font-size: 14px; font-weight: 800; padding: 16px 36px; border-radius: 50px; text-decoration: none; letter-spacing: 0.3px; transition: all 0.3s; box-shadow: 0 0 0 0 rgba(4,217,57,0.4); }
                .cta-btn:hover { transform: scale(1.04); box-shadow: 0 0 0 12px rgba(4,217,57,0.1); }

                @media (max-width: 900px) {
                    .story-grid { grid-template-columns: 1fr; gap: 40px; }
                    .stats-grid { grid-template-columns: 1fr 1fr; }
                    .stat-block:nth-child(2) { border-right: none; }
                    .values-grid { grid-template-columns: 1fr; }
                    .team-grid { grid-template-columns: repeat(3,1fr); }
                }
                @media (max-width: 580px) {
                    .team-grid { grid-template-columns: 1fr 1fr; }
                    .stats-grid { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

            {/* ── HERO ── */}
            <div className="about-hero">
                <div className="hero-bg-text">CODEYAA</div>
                <div className="hero-corner">Est. 2026</div>
                <div className="hero-dots">
                    {Array.from({ length: 25 }).map((_, i) => <div key={i} className="hdot" />)}
                </div>
                <div style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.2s forwards' }}>
                    <div className="hero-badge">
                        <span className="pulse-dot" />
                        Our Story
                    </div>
                </div>
                <div style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.4s forwards' }}>
                    <h1 className="hero-title">
                        We build<br />
                        <span>digital</span><br />
                        futures.
                    </h1>
                </div>
                <div style={{ opacity: 0, animation: 'fadeUp 0.8s ease 0.6s forwards' }}>
                    <p className="hero-sub">
                        Codeyaa is a brand-new software studio with bold ambitions. We're a startup born to move fast, craft quality, and help you win. Size doesn't scare us — it keeps us sharp. Let's grow together.
                    </p>
                </div>
                <div className="hero-scroll">
                    <div className="scroll-line" />
                    Scroll to explore
                </div>
                <style>{`
                    @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
                `}</style>
            </div>

            {/* ── STORY ── */}
            <div className="section" style={{ background: '#f7fbf8' }}>
                <div className="story-grid">
                    <FadeIn direction="left">
                        <div className="story-text">
                            <div className="section-tag">Our story</div>
                            <h2 className="section-title" style={{ marginBottom: 32 }}>
                                Fresh ideas.<br />
                                <span>Startup energy.</span>
                            </h2>
                            <p>
                                Codeyaa was founded in <strong>2026</strong>, right in the heart of the digital era's next wave. We believe that startups—like yours—deserve tech partners who are as fast, motivated, and hungry as they are.
                            </p>
                            <p>
                                We're a new team, but we move with the urgency and imagination that modern business demands. Side by side, we’ll turn scrappy beginnings into amazing launches, products, and results.
                            </p>
                            <p>
                                If you want a team that's all-in on your vision, driven for impact, and unrestrained by "the old ways" — let’s make something powerful together.
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn direction="right" delay={0.15}>
                        <div className="story-visual">
                            <div className="story-card">
                                <div className="story-year">26</div>
                                <p className="story-quote">"We're a startup just like you — ready to build the future, one line at a time."</p>
                                <p className="story-author">— The Codeyaa Team</p>
                            </div>
                            <div className="floating-tag">Startup Energy ⚡</div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* ── STATS ── */}
            <div className="stats-section section" ref={statsRef} style={{ padding: 0 }}>
                <div className="stats-grid">
                    {stats.map((s, i) => (
                        <FadeIn key={s.label} delay={i * 0.1}>
                            <div className="stat-block">
                                <div className="stat-num">{s.num}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>

            {/* ── VALUES ── */}
            <div className="section" style={{ background: '#f7fbf8' }}>
                <FadeIn>
                    <div className="section-tag">What drives us</div>
                    <h2 className="section-title">
                        Built on <span>principles.</span>
                    </h2>
                </FadeIn>
                <div className="values-grid">
                    {values.map((v, i) => (
                        <FadeIn key={v.title} delay={i * 0.1}>
                            <div className="value-card">
                                <span className="value-icon">{v.icon}</span>
                                <div className="value-title">{v.title}</div>
                                <div className="value-desc">{v.desc}</div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>


            {/* ── CTA ── */}
            <div className="cta-section">
                <div className="cta-bg">→</div>
                <FadeIn>
                    <h2 className="cta-title">
                        Ready to build<br />
                        <span>something great?</span>
                    </h2>
                    <p className="cta-sub">Let's turn your idea into a product people love.</p>
                    <a href="/contact" className="cta-btn">
                        Start a project →
                    </a>
                </FadeIn>
            </div>

        </div>
    )
}