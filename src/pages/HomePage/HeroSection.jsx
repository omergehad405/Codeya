import React, { useEffect, useRef, useState } from 'react'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800;900&display=swap');

  @keyframes fadeSlideUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeSlideLeft { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
  @keyframes blink         { 0%,100%{opacity:1} 50%{opacity:.2} }
  @keyframes floatY        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes floatY2       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes glowPulse     { 0%,100%{opacity:.3} 50%{opacity:.65} }
  @keyframes marquee       { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes cardPulse     { 0%,100%{box-shadow:0 20px 60px rgba(10,61,31,.35),0 0 0 1px rgba(26,255,110,.15)} 50%{box-shadow:0 20px 60px rgba(10,61,31,.5),0 0 0 1px rgba(26,255,110,.35),0 0 40px rgba(26,255,110,.08)} }
  @keyframes scanLine      { 0%{top:-30%} 100%{top:110%} }
  @keyframes gridShift     { 0%,100%{background-position:0 0} 50%{background-position:26px 26px} }
  @keyframes imageFloat {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-18px); }
  }
  @keyframes imageShadowPulse {
    0%,100% { transform: scaleX(1); opacity: .3; }
    50%      { transform: scaleX(.82); opacity: .15; }
  }

  .hero-blink    { animation: blink 1.6s infinite; }
  .hero-float1   { animation: floatY 5s ease-in-out infinite; }
  .hero-float2   { animation: floatY2 6.5s 1s ease-in-out infinite; }
  .hero-glow     { animation: glowPulse 4s ease-in-out infinite; }
  .hero-scan     { animation: scanLine 3.5s linear infinite; }
  .hero-grid     { animation: gridShift 12s ease-in-out infinite; }
  .hero-img-float { animation: imageFloat 4s ease-in-out infinite; }
  .hero-img-shadow { animation: imageShadowPulse 4s ease-in-out infinite; }

  /* Responsive grid for hero section */
  @media (max-width: 900px) {
    .hero-grid-container {
      grid-template-columns: 1fr !important;
      gap: 42px !important;
      padding: 38px 8vw !important;
    }
    .hero-section-right {
      height: 390px !important;
      min-height: 0 !important;
      margin-top: 12px !important;
    }
    .hero-section-left {
      max-width: 100% !important;
    }
  }
  @media (max-width: 600px) {
    .hero-grid-container {
      gap: 32px !important;
      padding: 18vw 5vw 9vw 5vw !important;
    }
    .hero-section-right {
      height: 320px !important;
      min-height: 0 !important;
    }
  }
  @media (max-width: 480px) {
    .hero-grid-container {
      padding: 12vw 2vw 7vw 2vw !important;
    }
    .hero-section-right {
      height: 220px !important;
    }
    .code-card {
      font-size: 10px !important;
      padding: 13px 7px !important;
    }
  }  
`;

function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let s = 0;
      const step = () => {
        s += Math.ceil(target / 38);
        if (s >= target) { setVal(target); return; }
        setVal(s); requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function HeroSection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const GD = "var(--green-dark, #0a3d1f)";
  const GA = "var(--green-accent, #1aff6e)";
  const GM = "var(--green-mid, #145a32)";
  const BG = "var(--bg-main, #f0f4ee)";
  const MONO = "'DM Mono', monospace";
  const DISPLAY = "'Outfit', sans-serif";



  return (
    <>
      <style>{STYLES}</style>

      <section
        id="hero-section"
        style={{
          minHeight: "100vh",
          background: BG,
          fontFamily: DISPLAY,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* dot-grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(10,61,31,0.11) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        {/* ambient glow */}
        <div className="hero-glow" style={{
          position: "absolute", right: "-8%", top: "5%",
          width: 680, height: 680, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(26,255,110,0.08) 0%, transparent 65%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── two-col ── */}
        <div
          className="hero-grid-container"
          style={{
            position: "relative", zIndex: 2,
            maxWidth: 1280, margin: "0 auto", width: "100%",
            padding: "56px 60px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            transition: "padding 0.2s, gap 0.2s",
          }}
        >
          {/* ════ LEFT ════ */}
          <div className="hero-section-left" style={{ maxWidth: "100%" }}>
            {/* pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(26,255,110,0.1)",
              border: "1px solid rgba(26,255,110,0.28)",
              borderRadius: 100, padding: "6px 16px",
              fontFamily: MONO, fontSize: 11, fontWeight: 700,
              color: GM, letterSpacing: "1px",
              marginBottom: 28,
              opacity: 0, animation: "fadeSlideUp .6s .1s ease forwards",
            }}>
              <span className="hero-blink" style={{
                width: 7, height: 7, borderRadius: "50%",
                background: GA, display: "inline-block",
              }} />
              Available for new projects
            </div>

            {/* headline */}
            <h1 style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(32px,8vw,96px)",
              fontWeight: 900,
              lineHeight: 0.93,
              letterSpacing: "-4px",
              color: GD,
              marginBottom: 26,
              opacity: 0, animation: "fadeSlideUp .7s .2s ease forwards",
              wordBreak: "break-word",
            }}>
              Build Bold.<br />
              <span style={{ WebkitTextStroke: `2.5px ${GD}`, color: "transparent" }}>
                Ship Fast.
              </span><br />
              <span style={{ color: GA }}>Win Big.</span>
            </h1>

            {/* sub */}
            <p style={{
              fontSize: 17, lineHeight: 1.8,
              color: "#456045",
              maxWidth: 450, marginBottom: 38,
              opacity: 0, animation: "fadeSlideUp .7s .35s ease forwards",
            }}>
              نحوّل أفكارك إلى منتجات رقمية تُبهر جمهورك وتحقق نتائج حقيقية —
              بكود نظيف، تصميم ذكي، وتسليم في الوقت.
            </p>

            {/* CTA */}
            <div style={{
              display: "flex", gap: 14, alignItems: "center",
              opacity: 0, animation: "fadeSlideUp .7s .5s ease forwards",
              flexWrap: "wrap",
            }}>
              <button
                onClick={() => scrollTo("contact")}
                style={{
                  background: GD, color: GA,
                  padding: "14px 34px", borderRadius: 8,
                  fontFamily: DISPLAY, fontWeight: 800, fontSize: 14,
                  border: "none", cursor: "pointer",
                  transition: "all .25s",
                  boxShadow: "0 8px 28px rgba(10,61,31,0.22)",
                  display: "flex", alignItems: "center", gap: 10,
                  marginBottom: 8,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = GA;
                  e.currentTarget.style.color = GD;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 14px 36px rgba(26,255,110,0.28)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = GD;
                  e.currentTarget.style.color = GA;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(10,61,31,0.22)";
                }}
              >
                تواصل معنا الآن
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => scrollTo("projects")}
                style={{
                  background: "transparent", color: GD,
                  padding: "14px 32px", borderRadius: 8,
                  fontFamily: DISPLAY, fontWeight: 600, fontSize: 14,
                  border: `2px solid ${GD}`, cursor: "pointer", transition: "all .25s",
                  marginBottom: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = GD; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GD; }}
              >
                شوف شغلنا
              </button>
            </div>

            {/* stats
            <div style={{
              display: "flex", gap: 40, marginTop: 52,
              paddingTop: 28,
              borderTop: "1px solid rgba(10,61,31,0.1)",
              opacity: 0, animation: "fadeSlideUp .7s .65s ease forwards",
              flexWrap: "wrap",
            }}>
              {[[2, "+", "مشروع منجز"], [98, "%", "رضا العملاء"], [1, "yr", "خبرة"]].map(([n, s, l]) => (
                <div key={l} style={{ flex: "1 1 90px", minWidth: 90, marginBottom: 16 }}>
                  <div style={{
                    fontFamily: MONO, fontSize: 34, fontWeight: 700,
                    color: GD, letterSpacing: "-1.5px", lineHeight: 1,
                  }}>
                    <Counter target={n} suffix={s} />
                  </div>
                  <div style={{ fontSize: 12, color: "#7a9a7a", fontWeight: 600, marginTop: 5, letterSpacing: ".5px" }}>{l}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* ════ RIGHT ════ */}
          <div className="hero-section-right" style={{
            position: "relative",
            height: 560, minHeight: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            animation: "fadeSlideLeft .8s .3s ease forwards",
          }}>

            {/* floating image */}
            <div className="hero-img-float" style={{ position: "relative", width: "100%", maxWidth: 480 }}>
              <img
                src="/Hero.jpg"
                alt="hero"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: 24,
                  objectFit: "cover",
                }}
              />

              {/* shadow beneath the image that shrinks when it floats up */}
              <div className="hero-img-shadow" style={{
                position: "absolute",
                bottom: -20,
                left: "10%",
                width: "80%",
                height: 24,
                background: "radial-gradient(ellipse, rgba(10,61,31,0.35) 0%, transparent 70%)",
                borderRadius: "50%",
                transformOrigin: "center",
              }} />
            </div>
          </div>
        </div>

        {/* ── marquee strip ── */}
        <div style={{
          position: "relative", zIndex: 2,
          borderTop: "1px solid rgba(10,61,31,0.08)",
          borderBottom: "1px solid rgba(10,61,31,0.08)",
          background: "rgba(10,61,31,0.025)",
          overflow: "hidden", padding: "13px 0",
          marginTop: 16,
        }}>
          <div style={{
            display: "flex",
            animation: "marquee 22s linear infinite",
            whiteSpace: "nowrap", width: "max-content",
          }}>
            {Array(2).fill([
              "Web Development", "UI / UX Design", "Backend & APIs",
              "Mobile-First", "Performance", "React & Next.js", "Node.js", "Clean Code",
            ]).flat().map((t, i) => (
              <span key={i} style={{
                fontFamily: MONO,
                fontSize: 11, fontWeight: 700,
                color: i % 4 === 1 ? GA : "rgba(10,61,31,0.3)",
                letterSpacing: "1.5px",
                padding: "0 28px",
                borderRight: "1px solid rgba(10,61,31,0.07)",
                wordBreak: "keep-all",
              }}>
                {i % 4 === 1 ? "✦ " : ""}{t.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}