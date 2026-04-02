import React, { useEffect, useRef, useState } from 'react'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');

  @keyframes fadeUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
  @keyframes fadeLeft  { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:none} }
  @keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }
  @keyframes marquee   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes imageFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
  @keyframes shadowPulse { 0%,100%{transform:scaleX(1);opacity:.28} 50%{transform:scaleX(.8);opacity:.13} }
  @keyframes glowPulse { 0%,100%{opacity:.25} 50%{opacity:.55} }
  @keyframes gridShift { 0%,100%{background-position:0 0} 50%{background-position:26px 26px} }

  .h-fu1 { opacity:0; animation: fadeUp .7s .1s ease forwards; }
  .h-fu2 { opacity:0; animation: fadeUp .7s .25s ease forwards; }
  .h-fu3 { opacity:0; animation: fadeUp .7s .4s ease forwards; }
  .h-fu4 { opacity:0; animation: fadeUp .7s .55s ease forwards; }
  .h-fl  { opacity:0; animation: fadeLeft .8s .3s ease forwards; }

  .hero-img-float  { animation: imageFloat 4.5s ease-in-out infinite; }
  .hero-img-shadow { animation: shadowPulse 4.5s ease-in-out infinite; }
  .hero-glow       { animation: glowPulse 5s ease-in-out infinite; }
  .hero-grid-bg    { animation: gridShift 14s ease-in-out infinite; }
  .pulse-dot       { animation: pulse 2s ease-in-out infinite; }

  #hero-root {
    min-height: 100vh;
    background: #004836;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-grid-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: 100px 6vw 80px;
    position: relative;
    z-index: 2;
  }

  /* Hide hero image on md and down */
  @media (max-width: 900px) {
    .hero-grid-wrap {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
      padding: 120px 6vw 70px !important;
    }
    .hero-right { height: 360px !important; }
    .hero-right { display: none !important; }
  }
  @media (max-width: 600px) {
    .hero-grid-wrap { padding: 110px 5vw 60px !important; gap: 32px !important; }
    .hero-right { height: 280px !important; }
    .hero-right { display: none !important; }
  }
`;

export default function HeroSection() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <style>{STYLES}</style>

      <section id="hero-root">

        {/* Dot grid */}
        <div className="hero-grid-bg" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Ambient glow */}
        <div className="hero-glow" style={{
          position: 'absolute', right: '-5%', top: '10%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(4,217,57,0.07) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Large bg text */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(100px,18vw,260px)',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.025)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          letterSpacing: '-6px',
          zIndex: 0,
        }}>CODEYA</div>

        {/* Corner label */}
        <div style={{
          position: 'absolute', top: 40, right: '6vw',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, color: 'rgba(255,255,255,0.18)',
          letterSpacing: '3px', textTransform: 'uppercase',
          writingMode: 'vertical-rl', zIndex: 2,
        }}>Est. 2026</div>

        {/* Dot grid decoration */}
        <div style={{
          position: 'absolute', top: 40, left: '6vw',
          display: 'grid', gridTemplateColumns: 'repeat(5,1fr)',
          gap: 8, opacity: 0.12, zIndex: 2,
        }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
          ))}
        </div>

        {/* ── Two-col ── */}
        <div className="hero-grid-wrap">

          {/* ── LEFT ── */}
          <div>
            {/* Badge */}
            <div className="h-fu1">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(4,217,57,0.12)',
                border: '1px solid rgba(4,217,57,0.3)',
                borderRadius: 100, padding: '6px 16px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, fontWeight: 700,
                color: '#04d939', letterSpacing: '1px',
                textTransform: 'uppercase', marginBottom: 28,
              }}>
                <span className="pulse-dot" style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#04d939', display: 'inline-block',
                }} />
                Available for new projects
              </div>
            </div>

            {/* Headline */}
            <div className="h-fu2">
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(40px,7vw,88px)',
                fontWeight: 900, lineHeight: 1.0,
                letterSpacing: '-3px', color: '#fff',
                marginBottom: 26,
              }}>
                Build Bold.<br />
                <span style={{ color: '#04d939', fontStyle: 'italic' }}>Ship Fast.</span><br />
                Win Big.
              </h1>
            </div>

            {/* Sub */}
            <div className="h-fu3">
              <p style={{
                fontSize: 16, lineHeight: 1.85,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: 440, marginBottom: 40,
              }}>
                نحوّل أفكارك إلى منتجات رقمية تُبهر جمهورك وتحقق نتائج حقيقية —
                بكود نظيف، تصميم ذكي، وتسليم في الوقت.
              </p>
            </div>

            {/* CTAs */}
            <div className="h-fu4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => scrollTo('contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: '#04d939', color: '#004836',
                  padding: '15px 34px', borderRadius: 50,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 800, fontSize: 14,
                  border: 'none', cursor: 'pointer',
                  transition: 'all .3s',
                  letterSpacing: '0.3px',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 0 12px rgba(4,217,57,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                تواصل معنا الآن
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => scrollTo('projects')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: '#fff',
                  padding: '15px 32px', borderRadius: 50,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: 14,
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  cursor: 'pointer', transition: 'all .25s',
                  letterSpacing: '0.3px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent'; }}
              >
                شوف شغلنا
              </button>
            </div>

            {/* Scroll hint */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              color: 'rgba(255,255,255,0.25)', fontSize: 12,
              letterSpacing: '2px', textTransform: 'uppercase',
              marginTop: 52,
              opacity: 0, animation: 'fadeUp .7s .75s ease forwards',
            }}>
              <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.18)' }} />
              Scroll to explore
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="hero-right h-fl" style={{
            position: 'relative', height: 520,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div className="hero-img-float" style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
              <img
                src="/Hero.jpg"
                alt="hero visual"
                style={{
                  width: '100%', height: 'auto', display: 'block',
                  borderRadius: 24, objectFit: 'cover'
                  // Border has been removed
                }}
              />
              <div className="hero-img-shadow" style={{
                position: 'absolute', bottom: -22, left: '10%',
                width: '80%', height: 28,
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
                borderRadius: '50%', transformOrigin: 'center',
              }} />

              {/* floating badge */}
              <div style={{
                position: 'absolute', top: 24, left: -20,
                background: '#fff', borderRadius: 14,
                padding: '12px 18px',
                boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span className="pulse-dot" style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#04d939', display: 'inline-block',
                }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, color: '#004836' }}>
                  Available now
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Marquee ── */}
        <div style={{
          position: 'relative', zIndex: 2,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden', padding: '14px 0',
        }}>
          <div style={{
            display: 'flex',
            animation: 'marquee 24s linear infinite',
            whiteSpace: 'nowrap', width: 'max-content',
          }}>
            {Array(2).fill([
              'Web Development', 'UI / UX Design', 'Backend & APIs',
              'Mobile-First', 'Performance', 'React & Next.js', 'Node.js', 'Clean Code',
            ]).flat().map((t, i) => (
              <span key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 700,
                color: i % 4 === 1 ? '#04d939' : 'rgba(255,255,255,0.2)',
                letterSpacing: '2px', textTransform: 'uppercase',
                padding: '0 28px',
                borderRight: '1px solid rgba(255,255,255,0.06)',
              }}>
                {i % 4 === 1 ? '✦ ' : ''}{t}
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}