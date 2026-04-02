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

function Reveal({ children, delay = 0, direction = 'up' }) {
    const [ref, inView] = useInView()
    const transforms = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)', none: 'none' }
    return (
        <div
            ref={ref}
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

// Adjust/extend this list to match your actual projects data
const PREVIEW_PROJECTS = [
    {
        id: 1,
        title: 'Afaq Al Tareq',
        category: ['websites', 'landing page'],
        description: 'A modern, interactive showcase built for Afaq Al Tareq — a professional design that reflects their brand identity.',
        link: 'https://afaqaltariq.sa/',
        ready: true,
        image: './ProjectsImages/project1.png',
    },
    {
        id: 2,
        title: 'The New Muslims',
        category: ['websites'],
        description: 'A full-featured website for new Muslims — combining simplicity with rich, meaningful content.',
        link: 'https://the-new-muslims.com/',
        ready: true,
        image: './ProjectsImages/project2.png',
    },
]

const LABELS = {
    'websites': 'Website',
    'landing page': 'Landing Page',
    'eCommerce': 'eCommerce',
    'mobile app': 'Mobile App',
}

function ProjectCard({ project, index }) {
    const [hovered, setHovered] = useState(false)
    const [ref, inView] = useInView()
    const idx = String(index + 1).padStart(2, '0')

    return (
        <div
            ref={ref}
            className="proj-card-outer"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(36px)',
                transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
            }}
        >
            <article
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="proj-card-inner"
                style={{
                    background: '#fff',
                    border: `1.5px solid ${hovered ? '#04d939' : '#e4ede8'}`,
                    borderRadius: 20, 
                    overflow: 'hidden',
                    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: hovered ? '0 16px 48px rgba(0,72,54,0.1)' : 'none',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Image */}
                {project.image ? (
                    <img
                        src={project.image} alt={project.title}
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
                        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 72, fontWeight: 900, color: 'rgba(0,72,54,0.12)' }}>
                            {idx}
                        </span>
                    </div>
                )}

                {/* Body */}
                <div style={{ padding: '22px 24px 24px', flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {project.category.map(c => (
                                    <span key={c} style={{
                                        fontSize: 10, fontWeight: 700, letterSpacing: '1px',
                                        textTransform: 'uppercase', color: '#004836',
                                        background: 'rgba(0,72,54,0.07)', border: '1px solid rgba(0,72,54,0.15)',
                                        padding: '3px 10px', borderRadius: 30,
                                    }}>
                                        {LABELS[c] || c}
                                    </span>
                                ))}
                            </div>
                            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 11, color: 'rgba(10,26,16,0.2)' }}>{idx}</span>
                        </div>
                        <h3 style={{
                            fontFamily: "'Playfair Display',serif", fontSize: 19, fontWeight: 700,
                            color: '#0a1a10', margin: '0 0 8px', lineHeight: 1.2,
                        }}>{project.title}</h3>
                        <p style={{ fontSize: 13, color: '#6b8a78', lineHeight: 1.7, margin: '0 0 18px' }}>
                            {project.description}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #e4ede8' }}>
                        {project.ready && project.link ? (
                            <a
                                href={project.link} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 7,
                                    fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700,
                                    color: '#004836', textDecoration: 'none', letterSpacing: '0.3px',
                                    transition: 'gap 0.2s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.gap = '12px'}
                                onMouseLeave={e => e.currentTarget.style.gap = '7px'}
                            >
                                View Project
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        ) : (
                            <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(10,26,16,0.3)', letterSpacing: '0.5px' }}>
                                Coming Soon
                            </span>
                        )}
                        <div style={{
                            width: 7, height: 7, borderRadius: '50%',
                            background: project.ready ? '#04d939' : '#e4ede8',
                            boxShadow: project.ready ? '0 0 6px rgba(4,217,57,0.5)' : 'none',
                        }} />
                    </div>
                </div>
            </article>
        </div>
    )
}

export default function ProjectsSection() {
    return (
        <section
            id="projects"
            style={{
                background: '#f7fbf8',
                fontFamily: "'DM Sans', sans-serif",
                padding: 'clamp(80px,10vw,130px) 6vw',
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }
        .proj-pulse { animation: pulse 2s ease-in-out infinite; }
        .proj-cards { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(clamp(250px, 38vw, 400px), 1fr)); 
            gap: 20px; 
            margin-top: 40px;
        }
        .proj-card-outer {
            min-width: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .proj-card-inner {
            height: 100%;
            display: flex; 
            flex-direction: column;
        }
        /* Center grid cards horizontally at mid screens */
        @media (max-width: 1000px) {
            .proj-cards {
                grid-template-columns: repeat(auto-fill, minmax(min(100%, 325px),1fr));
                justify-items: center;
                justify-content: center;
            }
            .proj-card-outer {
                width: 100%;
                max-width: 370px;
                margin-left: auto !important;
                margin-right: auto !important;
            }
        }
        /* At small devices, each card is full width and centered below heading */
        @media (max-width: 700px) {
            .proj-cards {
                grid-template-columns: 1fr;
                gap: 18px;
                justify-items: center;
            }
            .proj-card-outer {
                width: 100%;
                max-width: 97vw;
                margin-left: auto !important;
                margin-right: auto !important;
            }
            .proj-card-inner {
                border-radius: 12px !important;
            }
        }
      `}</style>

            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                <Reveal>
                    <div style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '3px',
                        textTransform: 'uppercase', color: '#04d939', marginBottom: 16,
                    }}>Portfolio</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(28px,4vw,48px)',
                            fontWeight: 900, color: '#0a1a10',
                            lineHeight: 1.1, letterSpacing: '-1.5px', margin: 0,
                        }}>
                            Work we're <span style={{ color: '#004836' }}>proud of.</span>
                        </h2>
                        <a
                            href="/projects"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700,
                                color: '#004836', textDecoration: 'none', letterSpacing: '0.3px',
                                transition: 'gap 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.gap = '14px'}
                            onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                        >
                            View all projects
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                    <div style={{ height: 1, background: 'linear-gradient(90deg, #c8ddd2 0%, rgba(200,221,210,0.2) 60%, transparent 100%)', marginTop: 36 }} />
                </Reveal>

                <div className="proj-cards">
                    {PREVIEW_PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}