import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

// Mapping is now by translation key, not a fixed Arabic value.
const CATEGORY_TRANSLATE_MAP = {
    websites: 'projectsPage.filters.websites',
    'landing page': 'projectsPage.filters.landingPage',
    eCommerce: 'projectsPage.filters.eCommerce',
    'mobile app': 'projectsPage.filters.mobileApp',
}

/* ─── Inject global CSS once ─────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Tajawal:wght@300;400;500;700&display=swap');

  :root {
    --main-color: #eef3e4;
    --second-color: #004836;
    --background-color: #012340;
    --text-color: #6b7a6a;
  }

  /* ── entry animation ── */
  .pc-card {
    opacity: 0;
    transform: translateY(36px);
    transition:
      opacity  0.65s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.35s ease;
  }
  .pc-card.pc-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── hover lift ── */
  .pc-card:hover {
    box-shadow:
      0 32px 64px -12px rgba(1, 35, 64, 0.45),
      0 0 0 1px rgba(0, 72, 54, 0.18);
  }
  .pc-card.pc-visible:hover {
    transform: translateY(-6px);
  }

  /* ── image zoom ── */
  .pc-img {
    transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .pc-card:hover .pc-img {
    transform: scale(1.07);
  }

  /* ── shimmer overlay on hover ── */
  .pc-img-overlay {
    background: linear-gradient(
      160deg,
      rgba(0,72,54,0.0) 40%,
      rgba(0,72,54,0.45) 100%
    );
    transition: opacity 0.4s ease;
    opacity: 0;
  }
  .pc-card:hover .pc-img-overlay {
    opacity: 1;
  }

  /* ── tag hover ── */
  .pc-tag {
    transition: background 0.2s ease, color 0.2s ease;
  }
  .pc-tag:hover {
    background: var(--second-color) !important;
    color: var(--main-color) !important;
    border-color: var(--second-color) !important;
  }

  /* ── arrow link ── */
  .pc-link-arrow {
    transition: transform 0.25s ease, opacity 0.25s ease;
    opacity: 0.5;
  }
  .pc-card:hover .pc-link-arrow {
    transform: translate(4px, -4px);
    opacity: 1;
  }

  /* ── separator line grow ── */
  .pc-divider {
    height: 1px;
    background: rgba(0,72,54,0.15);
    width: 0;
    transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
    margin-bottom: 12px;
  }
  .pc-card.pc-visible .pc-divider {
    width: 100%;
  }

  /* ── soon badge pulse ── */
  @keyframes pc-pulse {
    0%, 100% { opacity: 0.45; }
    50%       { opacity: 0.9; }
  }
  .pc-soon {
    animation: pc-pulse 2.4s ease-in-out infinite;
  }

  /* ── bottom glow line ── */
  .pc-glow {
    opacity: 0;
    transition: opacity 0.35s ease;
  }
  .pc-card:hover .pc-glow {
    opacity: 0.7;
  }

  /* ── placeholder number ── */
  .pc-placeholder-num {
    font-family: 'Playfair Display', serif;
    font-size: 96px;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(238,243,228,0.35);
    transition: -webkit-text-stroke 0.35s ease;
    user-select: none;
  }
  .pc-card:hover .pc-placeholder-num {
    -webkit-text-stroke: 1.5px rgba(238,243,228,0.6);
  }
`

function injectStyles() {
    if (typeof document !== 'undefined' && !document.getElementById('pc-styles')) {
        const el = document.createElement('style')
        el.id = 'pc-styles'
        el.textContent = STYLES
        document.head.appendChild(el)
    }
}

/* ─── Single Card ─────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
    const { t } = useTranslation();
    const cardRef = useRef(null)

    useEffect(() => {
        const el = cardRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => el.classList.add('pc-visible'), index * 100)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [index])

    // Use translation for category if possible
    const mappedCategoryKey = CATEGORY_TRANSLATE_MAP[project.category];
    const categoryLabel = mappedCategoryKey ? t(mappedCategoryKey) : project.category;
    const indexLabel = String(index + 1).padStart(2, '0')

    return (
        <article
            ref={cardRef}
            className="pc-card group relative flex flex-col rounded-2xl overflow-hidden"
            style={{ background: 'var(--main-color)' }}
        >
            {/* ── Image Block ───────────────────────────────── */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {project.image ? (
                    <img
                        src="./project.jpg"
                        alt={project.title}
                        className="pc-img w-full h-full object-cover"
                    />
                ) : (
                    <div
                        className="pc-img w-full h-full flex items-center justify-center"
                        style={{ background: 'var(--second-color)' }}
                    >
                        <span className="pc-placeholder-num">{indexLabel}</span>
                    </div>
                )}

                {/* gradient overlay */}
                <div className="pc-img-overlay absolute inset-0 pointer-events-none" />

                {/* Category badge */}
                <span
                    className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase"
                    style={{
                        background: 'rgba(238,243,228,0.9)',
                        color: 'var(--second-color)',
                        fontFamily: "'Tajawal', sans-serif",
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        direction: 'rtl',
                        letterSpacing: '0.07em',
                    }}
                >
                    {categoryLabel}
                </span>

                {/* Index top-left */}
                <span
                    className="absolute top-4 left-4 text-xs opacity-60 select-none"
                    style={{
                        color: 'var(--main-color)',
                        fontFamily: "'Playfair Display', serif",
                    }}
                >
                    {indexLabel}
                </span>
            </div>

            {/* ── Content Block ─────────────────────────────── */}
            <div className="flex flex-col flex-1 px-5 pt-5 pb-5 gap-3">

                {/* Growing divider line */}
                <div className="pc-divider" />

                {/* Title + action */}
                <div className="flex items-start justify-between gap-3">
                    <h4
                        className="font-bold text-lg leading-snug flex-1"
                        style={{
                            color: 'var(--second-color)',
                            fontFamily: "'Playfair Display', serif",
                            direction: 'rtl',
                        }}
                    >
                        {project.title}
                    </h4>

                    {project.ready && project.link ? (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('projectsCards.viewProject')}
                            className="pc-link-arrow mt-0.5 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border"
                            style={{
                                borderColor: 'rgba(0,72,54,0.2)',
                                color: 'var(--second-color)',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path
                                    d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    ) : (
                        <span
                            className="pc-soon mt-0.5 text-xs px-2.5 py-1 rounded-full shrink-0 font-medium"
                            style={{
                                background: 'rgba(0,72,54,0.08)',
                                color: 'rgba(0,72,54,0.55)',
                                fontFamily: "'Tajawal', sans-serif",
                            }}
                        >
                            {t('projectsCards.comingSoon')}
                        </span>
                    )}
                </div>

                {/* Description */}
                {project.description && (
                    <p
                        className="text-sm leading-relaxed line-clamp-2"
                        style={{
                            color: 'var(--text-color)',
                            fontFamily: "'Tajawal', sans-serif",
                            direction: 'rtl',
                        }}
                    >
                        {project.description}
                    </p>
                )}

                {/* Tags */}
                {project.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="pc-tag text-xs px-2.5 py-0.5 rounded-full border font-medium cursor-default"
                                style={{
                                    borderColor: 'rgba(0,72,54,0.18)',
                                    color: 'var(--second-color)',
                                    background: 'rgba(0,72,54,0.05)',
                                    fontFamily: "'Tajawal', sans-serif",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Bottom glow accent ────────────────────────── */}
            <div
                className="pc-glow h-[2px] w-full"
                style={{
                    background:
                        'linear-gradient(90deg, transparent 0%, var(--second-color) 50%, transparent 100%)',
                }}
            />
        </article>
    )
}

/* ─── Grid ────────────────────────────────────────────────────────── */
function ProjectsCards({ projects }) {
    const { t } = useTranslation();
    useEffect(() => {
        injectStyles()
    }, [])

    if (!projects || projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[240px] py-8">
                <span
                    className="pc-soon text-lg md:text-2xl px-6 py-3 rounded-full font-bold"
                    style={{
                        background: 'rgba(0,72,54,0.05)',
                        color: 'var(--second-color)',
                        fontFamily: "'Tajawal', sans-serif",
                        border: '1.5px solid rgba(0,72,54,0.08)',
                        letterSpacing: '0.05em',
                    }}
                >
                    {t('projectsCards.comingSoon')}
                </span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
            ))}
        </div>
    )
}

export default ProjectsCards