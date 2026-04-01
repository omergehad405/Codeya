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
      <style>{`
        .nav-header {
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.4s ease;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
        }
        .nav-header.scrolled {
          box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.18);
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo img { width: 36px; height: 36px; object-fit: contain; }
        .nav-logo-text {
          font-size: 18px;
          font-weight: 800;
          color: #eef3e4;
          letter-spacing: -0.3px;
        }
        .nav-logo-text span { color: #04d939; }

        /* Desktop links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex-wrap: wrap;
        }
        .nav-links li {
          flex-shrink: 0;
        }
        .nav-links li a {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(238,243,228,0.65);
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.1px;
          min-width: 64px;
          justify-content: center;
        }
        .nav-links li a:hover {
          color: #eef3e4;
          background: rgba(255,255,255,0.06);
        }
        .nav-links li a.active {
          color: #eef3e4;
          background: rgba(255,255,255,0.08);
        }
        .nav-links li a.active::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 2px;
          border-radius: 2px;
          background: #04d939;
        }
        @media (max-width: 1200px) {
          .nav-inner {
            padding: 0 16px;
            gap: 16px;
          }
          .nav-links {
            gap: 2px;
          }
          .nav-links li a {
            padding: 8px 10px;
            font-size: 13px;
            min-width: 52px;
          }
        }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .desktop-cta { display: none; }
        }
        /* Make nav-links horizontal scrollable for extra small screens and prevent breaking layout */
        @media (max-width: 600px) {
          .nav-links {
            overflow-x: auto;
            max-width: 180px;
            flex-wrap: nowrap !important;
            gap: 0;
          }
          .nav-links::-webkit-scrollbar {
            display: none;
          }
          .nav-links li {
            flex: 0 0 auto;
          }
          .nav-links li a {
            padding: 8px 6px;
            font-size: 12px;
            min-width: 42px;
          }
        }

        /* Drawer styles for mobile menu (UL and CTA) */
        .drawer-menu {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: min(320px, 85vw);
          background: #004836;
          box-shadow: 2px 0 24px rgba(0,0,0,0.18);
          z-index: 150;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow-y: auto;
        }
        .drawer-menu.open {
          transform: translateX(0);
        }
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .drawer-close {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.07);
          border: none; border-radius: 8px;
          color: #eef3e4; font-size: 18px;
          cursor: pointer; transition: background 0.2s;
        }
        .drawer-close:hover { background: rgba(255,255,255,0.12); }
        .drawer-links {
          list-style: none;
          padding: 16px 16px 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .drawer-links li a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 500;
          color: rgba(238,243,228,0.7);
          text-decoration: none;
          transition: all 0.2s;
        }
        .drawer-links li a:hover,
        .drawer-links li a.active {
          background: rgba(255,255,255,0.07);
          color: #eef3e4;
        }
        .drawer-links li a.active { color: #04d939; }
        .drawer-arrow { font-size: 12px; opacity: 0.4; }
        .drawer-cta-container {
          padding: 24px 16px 8px 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin-top: auto;
        }
        .drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #04d939;
          color: #004836;
          font-size: 14px;
          font-weight: 800;
          padding: 13px;
          border-radius: 12px;
          text-decoration: none;
          font-family: inherit;
          transition: background 0.2s;
          width: 100%;
        }
        .drawer-cta:hover { background: #02c230; }
        .drawer-menu .nav-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 18px;
          padding: 8px 16px 20px 16px;
        }
        .drawer-menu .lang-btn,
        .drawer-menu .wa-btn {
          margin: 0;
        }
        @media (min-width: 901px) {
          .drawer-menu {
            display: none !important;
          }
        }
        .menu-btn {
          display: none;
          align-items: center;
          background: transparent;
          border: 1px solid rgba(238,243,228,0.15);
          color: #eef3e4;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 16px;
          font-family: inherit;
          cursor: pointer;
          gap: 7px;
          font-weight: 800;
          letter-spacing: 1px;
          transition: border-color 0.2s;
        }
        .menu-btn:hover {
          border-color: rgba(238,243,228,0.35);
          color: #04d939;
        }
        @media (max-width: 900px) {
          .menu-btn {
            display: flex;
            margin-left: auto;
          }
        }
        /* Right side */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Lang btn */
        .lang-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(238,243,228,0.15);
          background: transparent;
          color: rgba(238,243,228,0.7);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          text-transform: uppercase;
        }
        .lang-btn:hover {
          border-color: rgba(238,243,228,0.35);
          color: #eef3e4;
          background: rgba(255,255,255,0.06);
        }

        /* WhatsApp btn */
        .wa-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(37,211,102,0.12);
          color: #04d939;
          font-size: 17px;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid rgba(4,217,57,0.2);
        }
        .wa-btn:hover {
          background: rgba(37,211,102,0.22);
          border-color: rgba(4,217,57,0.4);
        }

        /* Divider */
        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.1);
          margin: 0 4px;
        }

        /* CTA button */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #04d939;
          color: #004836;
          font-size: 13px;
          font-weight: 800;
          padding: 9px 20px;
          border-radius: 10px;
          text-decoration: none;
          letter-spacing: 0.2px;
          transition: all 0.25s;
          border: none;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
        }
        .cta-btn:hover {
          background: #02c230;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(4,217,57,0.25);
        }
        .cta-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(0,72,54,0.5);
          animation: ctapulse 2s ease-in-out infinite;
        }
        @keyframes ctapulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>

      <header className={`nav-header ${scrolled ? 'scrolled' : ''}`} style={{ background: '#004836' }}>
        <div className="nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img src="./logo.png" alt="Codeyaa" />
            <span className="nav-logo-text">code<span>ya</span></span>
          </Link>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              {links.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className={isActive(l.to) ? 'active' : ''}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side (removed Get In Touch btn from here) */}
          <div className="nav-right">
            <button className="lang-btn" onClick={toggleLanguage} title="Switch language">
              {i18n.language === 'en' ? 'AR' : 'EN'}
            </button>

            <a
              href="https://wa.me/201105710609"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <div className="nav-divider" />

            {/* Add menu button for mobile navigation */}
            <button
              className="menu-btn"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
            >
              ≡
            </button>
          </div>
        </div>
      </header>

      {/* Drawer for UL and Get In Touch (drawer-menu) */}
      <div className={`drawer-menu${navOpen ? ' open' : ''}`}>
        <div className="drawer-header">
          <Link to="/" className="nav-logo" onClick={() => setNavOpen(false)}>
            <img src="./logo.png" alt="Codeyaa" />
            <span className="nav-logo-text">code<span>ya</span></span>
          </Link>
          <button className="drawer-close" onClick={() => setNavOpen(false)}>✕</button>
        </div>

        <ul className="drawer-links">
          {links.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={isActive(l.to) ? 'active' : ''}
                onClick={() => setNavOpen(false)}
              >
                {l.label}
                <span className="drawer-arrow">›</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="drawer-cta-container">
          <Link to="/contact" className="drawer-cta" onClick={() => setNavOpen(false)}>
            {t('cta.getInTouch')} →
          </Link>
        </div>
        <div className="nav-bottom-row">
          <button className="lang-btn" onClick={toggleLanguage} title="Switch language">
            {i18n.language === 'en' ? 'AR' : 'EN'}
          </button>
          <a
            href="https://wa.me/201105710609"
            target="_blank"
            rel="noopener noreferrer"
            className="wa-btn"
            title="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </>
  )
}

export default Header