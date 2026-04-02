import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const { t } = useTranslation()
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <section id="hero-root" className="min-h-screen bg-[#004836] font-sans relative overflow-hidden flex flex-col justify-center">

        {/* Dot grid */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none animate-[gridShift_14s_ease-in-out_infinite]" 
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} 
        />

        {/* Ambient glow */}
        <div className="absolute -right-[5%] top-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(4,217,57,0.07)_0%,transparent_65%)] pointer-events-none z-0 animate-[glowPulse_5s_ease-in-out_infinite]" />

        {/* Large bg text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(100px,18vw,260px)] font-black text-white/[0.025] whitespace-nowrap pointer-events-none tracking-[-6px] z-0">
          CODEYA
        </div>

        {/* Corner label */}
        <div className="absolute top-10 right-[6vw] font-sans text-[11px] text-white/20 tracking-[3px] uppercase [writing-mode:vertical-rl] z-[2]">
          Est. 2026
        </div>

        {/* Dot grid decoration */}
        <div className="absolute top-10 left-[6vw] grid grid-cols-5 gap-2 opacity-15 z-[2]">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white" />
          ))}
        </div>

        {/* ── Two-col ── */}
        <div className="max-w-[1280px] mx-auto w-full px-[6vw] pt-[120px] pb-[70px] min-[901px]:pt-[100px] min-[901px]:pb-[80px] grid grid-cols-1 min-[901px]:grid-cols-2 gap-10 min-[901px]:gap-[60px] items-center relative z-[2]">

          {/* ── LEFT ── */}
          <div className="flex flex-col items-center min-[901px]:items-start text-center min-[901px]:text-left">
            {/* Badge */}
            <div className="opacity-0 animate-[fadeUp_0.7s_0.1s_ease_forwards]">
              <div className="inline-flex items-center gap-2 bg-brand-neon/12 border border-brand-neon/30 rounded-full px-4 py-1.5 font-sans text-xs font-bold text-brand-neon tracking-wider uppercase mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                {t('homePage.hero.available')}
              </div>
            </div>

            {/* Headline */}
            <div className="opacity-0 animate-[fadeUp_0.7s_0.25s_ease_forwards]">
              <h1 className="font-serif text-[clamp(40px,7vw,88px)] font-black leading-none tracking-[-3px] text-white mb-7">
                {t('homePage.hero.title1')}<br />
                <span className="text-brand-neon italic px-0.5">{t('homePage.hero.title2')}</span><br />
                {t('homePage.hero.title3')}
              </h1>
            </div>

            {/* Sub */}
            <div className="opacity-0 animate-[fadeUp_0.7s_0.4s_ease_forwards]">
              <p className="text-base leading-[1.85] text-white/50 max-w-[440px] mb-10">
                {t('homePage.hero.desc')}
              </p>
            </div>

            {/* CTAs */}
            <div className="opacity-0 animate-[fadeUp_0.7s_0.55s_ease_forwards] flex gap-3 flex-wrap justify-center min-[901px]:justify-start">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2.5 bg-brand-neon text-brand-deep px-8 py-3.5 rounded-full font-sans font-extrabold text-sm border-none cursor-pointer transition-all duration-300 tracking-wide hover:scale-104 hover:shadow-[0_0_0_12px_rgba(4,217,57,0.1)] active:scale-95"
              >
                {t('homePage.hero.contactNow')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3.5 rounded-full font-sans font-bold text-sm border-1.5 border-white/25 cursor-pointer transition-all duration-250 tracking-wide hover:border-white/60 hover:bg-white/5 active:scale-95"
              >
                {t('homePage.hero.seeOurWork')}
              </button>
            </div>

            {/* Scroll hint */}
            <div className="opacity-0 animate-[fadeUp_0.7s_0.75s_ease_forwards] flex items-center gap-3 text-white/25 text-[11px] tracking-[2px] uppercase mt-14">
              <div className="w-12 h-[1px] bg-white/20" />
              {t('homePage.hero.scroll')}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="hidden min-[901px]:flex opacity-0 animate-[fadeLeft_0.8s_0.3s_ease_forwards] h-[520px] items-center justify-center relative">
            <div className="relative w-full max-w-[480px] animate-[imageFloat_4.5s_ease-in-out_infinite]">
              <img
                src="/Hero.jpg"
                alt="hero visual"
                className="w-full h-auto block rounded-3xl object-cover"
              />
              <div className="absolute -bottom-5.5 left-[10%] w-[80%] h-7 bg-[radial-gradient(ellipse,rgba(0,0,0,0.4)_0%,transparent_70%)] rounded-[50%] animate-[shadowPulse_4.5s_ease-in-out_infinite]" />

              {/* floating badge */}
              <div className="absolute top-6 -left-5 bg-white rounded-2xl px-[18px] py-3 shadow-[0_12px_36px_rgba(0,0,0,0.18)] flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
                <span className="font-sans text-xs font-bold text-brand-deep">
                  {t('homePage.hero.availableNow')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Marquee ── */}
        <div className="relative z-[2] border-t border-white/7 overflow-hidden py-3.5">
          <div className="flex animate-[marquee_24s_linear_infinite] whitespace-nowrap w-max">
            {Array(2).fill([
              t('homePage.hero.tags.web'), t('homePage.hero.tags.uiux'), t('homePage.hero.tags.backend'),
              t('homePage.hero.tags.mobile'), t('homePage.hero.tags.perf'), t('homePage.hero.tags.react'), t('homePage.hero.tags.node'), t('homePage.hero.tags.clean'),
            ]).flat().map((tag, i) => (
              <span key={i} className={`font-sans text-[11px] font-bold tracking-[2px] uppercase px-7 border-r border-white/6 ${i % 4 === 1 ? 'text-brand-neon' : 'text-white/20'}`}>
                {i % 4 === 1 ? '✦ ' : ''}{tag}
              </span>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}