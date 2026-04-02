import React, { useState, useEffect } from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/projects', label: t('nav.projects') },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>


      <header 
        className={`sticky top-0 z-[100] transition-all duration-400 font-sans ${scrolled ? 'shadow-[0_1px_0_{rgba(255,255,255,0.06)},0_8px_32px_{rgba(0,0,0,0.18)}]' : ''}`} 
        style={{ background: '#004836' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 min-[901px]:px-8 h-[68px] flex items-center justify-between gap-4 min-[901px]:gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline shrink-0 group">
            <img src="./logo.png" alt="Codeyaa" className="w-9 h-9 object-contain" />
            <span className="text-lg font-extrabold text-brand-offwhite tracking-tight">
              code<span className="text-brand-neon">ya</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden min-[901px]:block">
            <ul className="flex items-center gap-1 list-none m-0 p-0 flex-wrap">
              {links.map(l => (
                <li key={l.to} className="shrink-0">
                  <Link 
                    to={l.to} 
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium no-underline rounded-lg transition-all duration-200 tracking-wide min-w-[64px] justify-center
                      ${isActive(l.to) 
                        ? 'text-brand-offwhite bg-white/10 after:content-[""] after:absolute after:bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-0.5 after:rounded-full after:bg-brand-neon' 
                        : 'text-brand-offwhite/65 hover:text-brand-offwhite hover:bg-white/5'
                      }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Middle area for WhatsApp and CTA on medium screens */}
          <div className="hidden min-[901px]:flex items-center gap-2.5">
            <a
              href="https://wa.me/201105710609"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#25d3661f] text-brand-neon transition-all duration-200 border border-brand-neon/20 hover:bg-[#25d36638] hover:border-brand-neon/40 shrink-0"
              title="WhatsApp"
            >
              <FaWhatsapp className="text-lg" />
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-neon text-brand-deep text-[13px] font-extrabold px-5 py-2 rounded-xl no-underline tracking-wide transition-all duration-250 border-none cursor-pointer whitespace-nowrap hover:bg-[#02c230] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_{rgba(4,217,57,0.25)}] group">
              {t('nav.reachUs')}
              <span className="w-1.5 h-1.5 rounded-full bg-brand-deep/50 animate-pulse" />
            </Link>
          </div>

          {/* Right side (Get In Touch and WhatsApp removed from here) */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-brand-offwhite/15 bg-transparent text-brand-offwhite/70 text-xs font-bold tracking-wider cursor-pointer transition-all duration-200 uppercase hover:border-brand-offwhite/35 hover:text-brand-offwhite hover:bg-white/5" 
              onClick={toggleLanguage} 
              title="Switch language"
            >
              {i18n.language === 'en' ? 'AR' : 'EN'}
            </button>
            <div className="w-[1px] h-5 bg-white/10 mx-1 hidden min-[901px]:block" />
            
            <button
              className="flex min-[901px]:hidden items-center bg-transparent border border-brand-offwhite/15 text-brand-offwhite rounded-lg px-3.5 py-2 text-base cursor-pointer gap-1.5 font-extrabold tracking-widest transition-all duration-200 hover:border-brand-offwhite/35 hover:text-brand-neon"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
            >
              ≡
            </button>
          </div>
        </div>
      </header>

      {/* Drawer for UL and Get In Touch (drawer-menu) */}
      <div 
        className={`fixed top-0 left-0 h-screen w-[min(320px,85vw)] bg-brand-deep shadow-[2px_0_24px_rgba(0,0,0,0.18)] z-[150] transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col overflow-y-auto ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 px-6 border-b border-white/8">
          <Link to="/" className="flex items-center gap-2.5 no-underline" onClick={() => setNavOpen(false)}>
            <img src="./logo.png" alt="Codeyaa" className="w-9 h-9 object-contain" />
            <span className="text-lg font-extrabold text-brand-offwhite tracking-tight">
              code<span className="text-brand-neon">ya</span>
            </span>
          </Link>
          <button 
            className="w-8 h-8 flex items-center justify-center bg-white/7 border-none rounded-lg text-brand-offwhite text-lg cursor-pointer transition-all duration-200 hover:bg-white/12" 
            onClick={() => setNavOpen(false)}
          >
            ✕
          </button>
        </div>

        <ul className="list-none p-4 pb-0 m-0 flex flex-col gap-1">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`flex items-center justify-between p-3.5 px-4 rounded-[10px] text-[15px] font-medium no-underline transition-all duration-200
                  ${isActive(l.to) ? 'bg-white/7 text-brand-neon' : 'text-brand-offwhite/70 hover:bg-white/7 hover:text-brand-offwhite'}`}
                onClick={() => setNavOpen(false)}
              >
                {l.label}
                <span className="text-[12px] opacity-40">›</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="p-6 px-4 pb-5 border-t border-white/8 mt-auto flex flex-col gap-3">
          <Link to="/contact" className="flex items-center justify-center gap-2 bg-brand-neon text-brand-deep text-sm font-extrabold p-3.5 rounded-xl no-underline transition-all duration-200 hover:bg-[#02c230] w-full" onClick={() => setNavOpen(false)}>
            {t('nav.reachUs')} →
          </Link>
          
          <div className="flex items-center justify-between gap-3">
            <a
              href="https://wa.me/201105710609"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center flex-1 gap-2 p-2.5 rounded-lg bg-[#25d3661f] text-brand-neon text-[13px] font-bold no-underline transition-all border border-brand-neon/20 hover:bg-[#25d36638] hover:border-brand-neon/40"
              title="WhatsApp"
            >
              <FaWhatsapp className="text-[17px]" />
              {t('common.whatsapp')}
            </a>
            <button 
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-brand-offwhite/15 bg-transparent text-brand-offwhite/70 text-xs font-bold tracking-wider cursor-pointer transition-all uppercase hover:border-brand-offwhite/35 hover:text-brand-offwhite hover:bg-white/5" 
              onClick={toggleLanguage} 
              title="Switch language"
            >
              {i18n.language === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header