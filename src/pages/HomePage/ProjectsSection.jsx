import React, { useState, useRef, useCallback } from 'react'

const projects = [
    {
        title: "Afaq al tareq",
        image: "./ProjectsImages/project1.png",
        desc: "A modern, interactive showcase of work and experience. for afaq al tareq website",
        link: "https://afaqaltariq.sa/",
    },
    {
        title: "the new muslims",
        image: "./ProjectsImages/project2.png",
        desc: "A modern, interactive website for the new muslims",
        link: "https://the-new-muslims.com/",
    },
];

const ANIMATION_DURATION = 420;
const TOTAL = projects.length;

function ProjectsSection() {
    const [projectIndex, setProjectIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
    const isAnimating = useRef(false);
    const timeoutRef = useRef();

    const navigate = useCallback((direction) => {
        if (TOTAL <= 1 || isAnimating.current) return;
        isAnimating.current = true;
        setSlideDirection(direction);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setProjectIndex(idx =>
                direction === "prev"
                    ? (idx - 1 + TOTAL) % TOTAL
                    : (idx + 1) % TOTAL
            );
            setSlideDirection(null);
            isAnimating.current = false;
        }, ANIMATION_DURATION);
    }, []);

    const goToPrev = useCallback(() => navigate("prev"), [navigate]);
    const goToNext = useCallback(() => navigate("next"), [navigate]);

    const handleDotClick = useCallback((idx) => {
        if (TOTAL <= 1 || isAnimating.current) return;
        setProjectIndex(current => {
            if (idx === current) return current;
            const dir = idx > current ? "next" : "prev";
            isAnimating.current = true;
            setSlideDirection(dir);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setProjectIndex(idx);
                setSlideDirection(null);
                isAnimating.current = false;
            }, ANIMATION_DURATION);
            return current;
        });
    }, []);

    React.useEffect(() => {
        if (TOTAL <= 1) return;
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') goToPrev();
            else if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [goToPrev, goToNext]);

    const displayedProjects = TOTAL > 1
        ? [
            { ...projects[(projectIndex - 1 + TOTAL) % TOTAL], type: "prev" },
            { ...projects[projectIndex], type: "current" },
            { ...projects[(projectIndex + 1) % TOTAL], type: "next" },
        ]
        : [{ ...projects[0], type: "current" }];

    return (
        <div
            className="w-full px-[7vw] md:px-[60px] pb-20"
            id="projects"
            style={{ fontFamily: "Outfit, sans-serif", background: "var(--bg-main, #f0f4ee)" }}
        >
            <div
                className="relative rounded-[28px] px-[2vw] md:px-[32px] py-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden"
                style={{ background: "var(--green-dark, #0a3d1f)" }}
            >
                <div
                    className="absolute pointer-events-none"
                    style={{
                        right: -80, top: -80, width: 400, height: 400,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(26,255,110,0.07), transparent 70%)",
                    }}
                />

                {/* Left content */}
                <div className="relative z-10 flex-1">
                    <div
                        className="font-mono text-[11px] tracking-[2px] mb-4"
                        style={{ color: "rgba(26,255,110,0.5)" }}
                    >
                        // PROJECTS
                    </div>
                    <h2
                        className="font-extrabold text-white leading-[1]"
                        style={{ fontSize: "clamp(40px,5.5vw,68px)", letterSpacing: "-2.5px" }}
                    >
                        Unlock Your Business Potential<br />
                        <span style={{ color: "var(--text-color, #1aff6e)" }}>See What We&apos;ve Built</span>
                    </h2>
                    <p
                        className="mt-5 max-w-[400px] leading-[1.75] text-[15px]"
                        style={{ color: "rgba(255,255,255,0.48)" }}
                    >
                        Discover how we turn ambitious ideas into impactful digital solutions. Explore our portfolio and imagine what we can create together to elevate your brand and drive results. Ready to be inspired?
                    </p>
                    <div className="flex mt-10">
                        <a
                            href="/projects"
                            className="px-8 py-3 rounded-lg font-extrabold text-sm border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                                background: "var(--text-color, #1aff6e)",
                                color: "var(--green-dark, #0a3d1f)",
                                fontFamily: "Outfit, sans-serif",
                                textDecoration: "none"
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "#fff"}
                            onMouseLeave={e => e.currentTarget.style.background = "var(--text-color, #1aff6e)"}
                        >
                            See All Projects
                        </a>
                    </div>
                </div>

                {/* Projects carousel */}
                <div
                    className="relative z-10 flex flex-col items-center w-full"
                    style={{ minWidth: 0, width: "100%", maxWidth: 900 }}
                >
                    <div
                        className="flex justify-center items-end gap-6 md:gap-8 w-full"
                        style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}
                    >
                        {displayedProjects.map((p) => (
                            <ProjectCarouselCard
                                key={p.type}
                                project={p}
                                active={p.type === "current"}
                                position={p.type}
                                slideDirection={slideDirection}
                                animating={!!slideDirection}
                                onNavigate={() => {
                                    if (p.type === "prev") goToPrev();
                                    else if (p.type === "next") goToNext();
                                }}
                            />
                        ))}
                    </div>

                    {TOTAL > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8 w-full">
                            <button
                                aria-label="Previous Project"
                                style={{
                                    background: "rgba(255,255,255,0.09)",
                                    color: "#1aff6e",
                                    border: "1px solid rgba(26,255,110,0.18)",
                                    minWidth: 100,
                                    cursor: "pointer",
                                    padding: "8px 24px",
                                    borderRadius: 8,
                                    fontWeight: 700,
                                    fontSize: 15,
                                }}
                                onClick={goToPrev}
                            >
                                &#8592; Prev
                            </button>
                            <span className="text-[12px] text-white font-mono tracking-[2px]" style={{ opacity: 0.38 }}>
                                PROJECT {projectIndex + 1} / {TOTAL}
                            </span>
                            <button
                                aria-label="Next Project"
                                style={{
                                    background: "rgba(255,255,255,0.09)",
                                    color: "#1aff6e",
                                    border: "1px solid rgba(26,255,110,0.18)",
                                    minWidth: 100,
                                    cursor: "pointer",
                                    padding: "8px 24px",
                                    borderRadius: 8,
                                    fontWeight: 700,
                                    fontSize: 15,
                                }}
                                onClick={goToNext}
                            >
                                Next &#8594;
                            </button>
                        </div>
                    )}

                    {TOTAL > 1 && (
                        <div className="flex justify-center gap-2 mt-3 w-full">
                            {projects.map((_, idx) => (
                                <span
                                    key={idx}
                                    onClick={() => handleDotClick(idx)}
                                    style={{
                                        display: "inline-block",
                                        borderRadius: "9999px",
                                        cursor: "pointer",
                                        margin: "3px",
                                        transition: "all 0.15s",
                                        width: idx === projectIndex ? 16 : 8,
                                        height: 8,
                                        background: idx === projectIndex
                                            ? "var(--text-color, #1aff6e)"
                                            : "rgba(200,200,200,0.5)",
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ProjectCarouselCard({ project, active, position, animating, slideDirection, onNavigate }) {
    const width = active ? 250 : 180;
    const height = active ? 340 : 240;

    let transform = `scale(${active ? 1.07 : 0.95})`;
    let opacity = active ? 1 : 0.6;

    if (animating && !active) {
        const incoming =
            (slideDirection === "prev" && position === "prev") ||
            (slideDirection === "next" && position === "next");
        if (incoming) {
            transform = "scale(1.04)";
            opacity = 0.9;
        }
    }

    const boxShadow = active
        ? "0 8px 44px 0 rgba(26,255,110,0.19)"
        : "0 2px 8px 0 rgba(26,255,110,0.07)";
    const borderColor = active
        ? "var(--text-color, #1aff6e)"
        : "rgba(26,255,110,0.13)";

    const handleCardClick = () => {
        // Only side cards trigger navigation
        if (!active) onNavigate();
    };

    return (
        <div
            tabIndex={!active ? 0 : undefined}
            aria-current={active ? "true" : undefined}
            onClick={handleCardClick}
            onKeyDown={!active ? (e) => { if (e.key === "Enter") onNavigate(); } : undefined}
            style={{
                borderRadius: 18,
                background: "rgba(255,255,255,0.06)",
                border: `2px solid ${borderColor}`,
                boxShadow,
                width,
                minWidth: width,
                maxWidth: width,
                opacity,
                zIndex: active ? 30 : 10,
                // ✅ KEY FIX: active card always has pointer-events auto so links inside work.
                // Side cards are disabled only while animating to prevent double-clicks.
                pointerEvents: active ? "auto" : (animating ? "none" : "auto"),
                minHeight: height,
                height,
                transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(.43,1.22,.44,1), opacity ${ANIMATION_DURATION}ms cubic-bezier(.43,1.22,.44,1)`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                cursor: active ? "default" : "pointer",
                padding: 0,
                transform,
                willChange: "transform, opacity",
            }}
        >
            {/* Image */}
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={active ? 0 : -1}
                // ✅ Stop propagation so clicking the image link on the active card
                //    doesn't bubble up to the card div's onClick (which does nothing for
                //    active cards anyway, but this keeps behaviour clean).
                onClick={e => e.stopPropagation()}
                style={{
                    width: "100%",
                    height: active ? 140 : 95,
                    overflow: "hidden",
                    flexShrink: 0,
                    display: "block",
                }}
            >
                <img
                    src={project.image}
                    alt={project.title}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                        objectPosition: "top",
                        background: "#efefef",
                    }}
                />
            </a>

            {/* Text content */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    minWidth: 0,
                    padding: active ? "22px 18px 27px 18px" : "9px 5px 14px 5px",
                }}
            >
                <h3
                    title={project.title}
                    style={{
                        fontWeight: 800,
                        fontSize: 19,
                        color: "#fff",
                        textAlign: "center",
                        letterSpacing: "-1px",
                        lineHeight: 1.18,
                        marginBottom: 4,
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {project.title}
                </h3>
                <div
                    style={{
                        fontSize: 14.5,
                        color: "rgba(255,255,255,0.72)",
                        textAlign: "center",
                        minHeight: 42,
                        lineHeight: 1.38,
                        wordBreak: "break-word",
                        width: "100%",
                        marginBottom: active ? 12 : 6,
                        fontWeight: 400,
                    }}
                >
                    {project.desc}
                </div>

                {active && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        // ✅ stopPropagation ensures the link click is not swallowed
                        //    by any parent onClick handler
                        onClick={e => e.stopPropagation()}
                        style={{
                            display: "inline-block",
                            padding: "8px 24px",
                            fontSize: 13.5,
                            fontWeight: 700,
                            borderRadius: 8,
                            background: "var(--text-color, #1aff6e)",
                            color: "var(--green-dark, #0a3d1f)",
                            textDecoration: "none",
                            marginTop: 6,
                            cursor: "pointer",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fff"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--text-color, #1aff6e)"}
                    >
                        View Project
                    </a>
                )}
            </div>
        </div>
    );
}

export default ProjectsSection;