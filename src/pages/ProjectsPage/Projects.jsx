import React, { useEffect, useRef, useState } from 'react'

const PROJECTS = [
    {
        id: 1,
        title: "Afaq Al Tareq",
        category: ["websites", "landing page"],
        description: "A modern, interactive showcase built for Afaq Al Tareq — a professional design that reflects their brand identity.",
        link: "https://afaqaltariq.sa/",
        ready: true,
        image: "./ProjectsImages/project1.png",
    },
    {
        id: 2,
        title: "The New Muslims",
        category: ["websites"],
        description: "A full-featured website for new Muslims — combining simplicity with rich, meaningful content.",
        link: "https://the-new-muslims.com/",
        ready: true,
        image: "./ProjectsImages/project2.png",
    },
]

const FILTERS = [
    { value: 'All', label: 'All' },
    { value: 'websites', label: 'Websites' },
    { value: 'landing page', label: 'Landing Pages' },
    { value: 'eCommerce', label: 'eCommerce' },
    { value: 'mobile app', label: 'Mobile Apps' },
]

const LABELS = {
    'websites': 'Website',
    'landing page': 'Landing Page',
    'eCommerce': 'eCommerce',
    'mobile app': 'Mobile App',
}

/* ── Scroll Reveal Hook ── */
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
        up: 'translateY(36px)',
        left: 'translateX(-36px)',
        right: 'translateX(36px)',
        none: 'none',
    }
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

/* ── Single Project Card ── */
function ProjectCard({ project, index }) {
    const idx = String(index + 1).padStart(2, '0')

    const tags = project.category.map(c => (
        <span key={c} style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '1px',
            textTransform: 'uppercase', color: '#004836',
            background: 'rgba(0,72,54,0.07)', border: '1px solid rgba(0,72,54,0.15)',
            padding: '3px 10px', borderRadius: '30px',
        }}>
            {LABELS[c] || c}
        </span>
    ))

    return (
        <Reveal delay={index * 0.1}>
            <article
                style={{
                    background: '#fff', border: '1.5px solid #e4ede8', borderRadius: '20px',
                    overflow: 'hidden', transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', cursor: 'pointer',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#04d939'
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,72,54,0.1)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e4ede8'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                }}
            >
                {/* Image / Placeholder */}
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                        onError={e => {
                            e.currentTarget.outerHTML = `<div style="width:100%;aspect-ratio:16/9;background:#f0f7f3;display:flex;align-items:center;justify-content:center;border-bottom:1.5px solid #e4ede8"><span style="font-family:'Playfair Display',serif;font-size:72px;font-weight:900;color:rgba(0,72,54,0.12)">${idx}</span></div>`
                        }}
                    />
                ) : (
                    <div style={{
                        width: '100%', aspectRatio: '16/9', background: '#f0f7f3',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderBottom: '1.5px solid #e4ede8',
                    }}>
                        <span style={{
                            fontFamily: "'Playfair Display', serif", fontSize: '72px',
                            fontWeight: 900, color: 'rgba(0,72,54,0.12)', lineHeight: 1,
                        }}>
                            {idx}
                        </span>
                    </div>
                )}

                {/* Body */}
                <div style={{ padding: '22px 24px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>{tags}</div>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '11px', color: 'rgba(10,26,16,0.2)' }}>{idx}</span>
                    </div>
                    <h3 style={{
                        fontFamily: "'Playfair Display', serif", fontSize: '19px', fontWeight: 700,
                        color: '#0a1a10', margin: '0 0 8px', lineHeight: 1.2,
                    }}>
                        {project.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6b8a78', lineHeight: 1.7, margin: '0 0 18px', fontWeight: 400 }}>
                        {project.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #e4ede8' }}>
                        {project.ready && project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                                    fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 700,
                                    color: '#004836', textDecoration: 'none', letterSpacing: '0.3px',
                                    transition: 'gap 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.gap = '12px'}
                                onMouseLeave={e => e.currentTarget.style.gap = '7px'}
                                onClick={e => e.stopPropagation()}
                            >
                                View Project
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        ) : (
                            <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(10,26,16,0.3)', letterSpacing: '0.5px' }}>
                                Coming Soon
                            </span>
                        )}
                        <div style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: project.ready ? '#04d939' : '#e4ede8',
                            boxShadow: project.ready ? '0 0 6px rgba(4,217,57,0.5)' : 'none',
                            animation: project.ready ? 'pulse 2s ease-in-out infinite' : 'none',
                        }} />
                    </div>
                </div>
            </article>
        </Reveal>
    )
}

/* ── Main Page ── */
export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('All')

    const filteredProjects = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter(p => p.category.includes(activeFilter))

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f7fbf8', overflowX: 'hidden' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
                @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .5; transform: scale(0.8); } }

                .hero-hero { position: relative; background: #004836; min-height: 88vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 6vw 8vh; overflow: hidden; }
                .hero-bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: clamp(80px,16vw,200px); font-weight: 900; color: rgba(255,255,255,0.03); white-space: nowrap; pointer-events: none; font-family: 'Playfair Display', serif; letter-spacing: -4px; }
                .hero-corner { position: absolute; top: 40px; right: 6vw; font-size: 12px; color: rgba(255,255,255,0.2); letter-spacing: 3px; text-transform: uppercase; writing-mode: vertical-rl; }
                .hero-dots { position: absolute; top: 40px; left: 6vw; display: grid; grid-template-columns: repeat(5,1fr); gap: 8px; opacity: 0.15; }
                .hdot { width: 4px; height: 4px; border-radius: 50%; background: #fff; }
                .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(4,217,57,0.12); border: 1px solid rgba(4,217,57,0.3); border-radius: 30px; padding: 6px 16px; font-size: 12px; font-weight: 700; color: #04d939; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 28px; }
                .pulse-dot { width: 7px; height: 7px; border-radius: 50%; background: #04d939; animation: pulse 2s ease-in-out infinite; }
                .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(40px,7vw,86px); font-weight: 900; color: #fff; line-height: 1.0; letter-spacing: -2px; margin-bottom: 24px; }
                .hero-title span { color: #04d939; font-style: italic; }
                .hero-sub { font-size: clamp(14px,1.5vw,16px); color: rgba(255,255,255,0.5); max-width: 480px; line-height: 1.9; margin-bottom: 48px; }
                .hero-scroll { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.3); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
                .scroll-line { width: 48px; height: 1px; background: rgba(255,255,255,0.2); }

                .fu1 { opacity: 0; animation: fadeUp 0.8s ease 0.2s forwards; }
                .fu2 { opacity: 0; animation: fadeUp 0.8s ease 0.4s forwards; }
                .fu3 { opacity: 0; animation: fadeUp 0.8s ease 0.6s forwards; }
                .fu4 { opacity: 0; animation: fadeUp 0.8s ease 0.8s forwards; }

                .section { padding: clamp(60px,10vw,120px) 6vw; }
                .section-tag { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #04d939; margin-bottom: 16px; }
                .section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,48px); font-weight: 700; color: #0a1a10; line-height: 1.15; letter-spacing: -1px; }
                .section-title span { color: #004836; }

                .filters-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 36px; justify-content: center; }
                .fbtn { padding: 9px 22px; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; border: 1.5px solid #c8ddd2; background: transparent; color: #4a6b58; transition: all 0.25s ease; outline: none; }
                .fbtn:hover { border-color: #004836; color: #004836; }
                .fbtn.active { background: #004836; border-color: #004836; color: #fff; }

                .divider { height: 1px; background: linear-gradient(90deg, #c8ddd2 0%, rgba(200,221,210,0.2) 60%, transparent 100%); margin: 40px 0 0; }
                .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 40px; }

                .cta-section { background: #004836; text-align: center; padding: clamp(80px,12vw,130px) 6vw; position: relative; overflow: hidden; }
                .cta-bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 280px; color: rgba(255,255,255,0.02); font-family: 'Playfair Display', serif; font-weight: 900; pointer-events: none; white-space: nowrap; }
                .cta-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(4,217,57,0.12); border: 1px solid rgba(4,217,57,0.3); border-radius: 30px; padding: 6px 16px; font-size: 12px; font-weight: 700; color: #04d939; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 24px; }
                .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(30px,5vw,60px); font-weight: 900; color: #fff; margin-bottom: 16px; letter-spacing: -1px; line-height: 1.1; }
                .cta-title span { color: #04d939; }
                .cta-sub { font-size: 15px; color: rgba(255,255,255,0.4); margin-bottom: 40px; line-height: 1.7; }
                .cta-btn { display: inline-flex; align-items: center; gap: 10px; background: #04d939; color: #004836; font-size: 14px; font-weight: 800; padding: 16px 36px; border-radius: 50px; text-decoration: none; letter-spacing: 0.3px; transition: all 0.3s; font-family: 'DM Sans', sans-serif; }
                .cta-btn:hover { transform: scale(1.04); box-shadow: 0 0 0 12px rgba(4,217,57,0.1); }

                .empty-state { text-align: center; padding: 80px 0; }
                .empty-badge { display: inline-block; font-size: 14px; color: #6b8a78; background: rgba(0,72,54,0.05); border: 1.5px solid #e4ede8; padding: 12px 28px; border-radius: 50px; }

                @media (max-width: 600px) {
                    .section { padding: 60px 20px; }
                }
            `}</style>

            {/* ── HERO ── */}
            <div className="hero-hero">
                <div className="hero-bg-text">PROJECTS</div>
                <div className="hero-corner">Est. 2026</div>
                <div className="hero-dots">
                    {Array.from({ length: 25 }).map((_, i) => <div key={i} className="hdot" />)}
                </div>
                <div className="fu1">
                    <div className="hero-badge">
                        <span className="pulse-dot" />
                        Our Work
                    </div>
                </div>
                <div className="fu2">
                    <h1 className="hero-title">
                        We build<br />
                        <span>digital</span><br />
                        futures.
                    </h1>
                </div>
                <div className="fu3">
                    <p className="hero-sub">
                        Every project we ship is one we're proud of — from the first spark of an idea to the very last line of code.
                    </p>
                </div>
                <div className="fu4">
                    <div className="hero-scroll">
                        <div className="scroll-line" />
                        Explore projects
                    </div>
                </div>
            </div>

            {/* ── PROJECTS ── */}
            <div className="section" style={{ background: '#f7fbf8' }}>
                <Reveal>
                    <div className="section-tag">Portfolio</div>
                    <h2 className="section-title">Work we're<br /><span>proud of.</span></h2>
                    {/* Center filters with a flexbox parent */}
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <div className="filters-row">
                            {FILTERS.map(f => (
                                <button
                                    key={f.value}
                                    className={`fbtn${activeFilter === f.value ? ' active' : ''}`}
                                    onClick={() => setActiveFilter(f.value)}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="divider" />
                </Reveal>

                {filteredProjects.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-badge">No projects in this category yet — stay tuned.</span>
                    </div>
                ) : (
                    <div className="cards-grid">
                        {filteredProjects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                )}
            </div>

            {/* ── CTA ── */}
            <div className="cta-section">
                <div className="cta-bg-text">→</div>
                <Reveal>
                    <div className="cta-badge">
                        <span className="pulse-dot" />
                        Get in touch
                    </div>
                    <h2 className="cta-title">
                        Your next project<br />
                        <span>starts here.</span>
                    </h2>
                    <p className="cta-sub">Got an idea? We'll turn it into a digital product that exceeds your expectations.</p>
                    <a href="#contact" className="cta-btn">
                        Start a project →
                    </a>
                </Reveal>
            </div>
        </div>
    )
}