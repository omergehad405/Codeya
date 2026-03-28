import React, { useState } from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = (
    <ul className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full justify-center">
      <li className='relative py-[2px] 
        before:content-[""] before:absolute before:w-0 before:bg-(--text-color) before:h-[2px] before:top-0 before:left-0 before:transition-all before:duration-500 hover:before:w-full
        after:content-[""] after:absolute after:w-0 after:bg-(--text-color) after:h-[2px] after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:w-full'>
        <Link onClick={() => setNavOpen(false)} to="/" className="text-(--main-color) text-2xl">
          {t('nav.home')}
        </Link>
      </li>
      <li className='relative py-[2px] 
        before:content-[""] before:absolute before:w-0 before:bg-(--text-color) before:h-[2px] before:top-0 before:left-0 before:transition-all before:duration-500 hover:before:w-full
        after:content-[""] after:absolute after:w-0 after:bg-(--text-color) after:h-[2px] after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:w-full'>
        <Link onClick={() => setNavOpen(false)} to="/about" className="text-(--main-color) text-2xl">
          {t('nav.about')}
        </Link>
      </li>
      <li className='relative py-[2px] 
        before:content-[""] before:absolute before:w-0 before:bg-(--text-color) before:h-[2px] before:top-0 before:left-0 before:transition-all before:duration-500 hover:before:w-full
        after:content-[""] after:absolute after:w-0 after:bg-(--text-color) after:h-[2px] after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:w-full'>
        <Link onClick={() => setNavOpen(false)} to="/projects" className="text-(--main-color) text-2xl">
          {t('nav.projects')}
        </Link>
      </li>
    </ul>
  );

  const ctaButton = (
    <Link to="/contact"
      rel="noopener noreferrer"
      onClick={() => setNavOpen(false)}
      className="bg-green-600 text-(--main-color) p-1 rounded-md px-5 flex items-center gap-2 mt-8 lg:mt-0"
      title={t('cta.getInTouch')}>
      <span>{t('cta.getInTouch')}</span>
    </Link>
  );

  const langSwitcher = (
    <button
      onClick={toggleLanguage}
      className="text-(--main-color) font-bold text-xl px-2 py-1 rounded hover:bg-(--main-color) hover:text-(--second-color) transition border border-(--main-color)"
      title={i18n.language === 'en' ? 'العربية' : 'English'}
    >
      {i18n.language === 'en' ? 'ar' : 'En'}
    </button>
  );

  return (
    <>
      <header className='w-[95%] lg:w-[80%] mx-auto bg-(--second-color) px-5 py-3 flex items-center justify-between rounded-b-lg relative z-30'>
        <div className='flex items-center gap-2'>
          <img src="./logo.png" alt="" className='w-[40px]' />
          <span className='text-(--main-color) text-xl capitalize font-bold '>code<span className='text-(--text-color)'>ya</span></span>
        </div>
        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-10 grow justify-center">
          {navLinks}
        </nav>

        <div className='flex items-center gap-5'>
          {langSwitcher}
          <a href="https://wa.me/201105710609"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:bg-(--second-color) text-(--main-color) p-1 rounded transition"
            title={t('common.whatsapp')}>
            <FaWhatsapp className='text-2xl' />
          </a>
          {/* Desktop CTA */}
          <div className="hidden lg:block">
            {ctaButton}
          </div>
          {/* Mobile Menu Btn */}
          <button
            className="block lg:hidden text-(--main-color) text-3xl p-2"
            title="Menu"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation menu"
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${navOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setNavOpen(false)}
        aria-hidden="true"
      ></div>
      {/* Mobile sliding nav */}
      <nav
        className={`fixed top-0 left-0 h-full w-[80vw] max-w-xs bg-(--second-color) z-50 shadow-lg transition-transform duration-300 flex flex-col p-8 ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ minWidth: "220px" }}
      >
        <div className="flex justify-between items-center mb-8">
          {langSwitcher}
          <button
            className="text-(--main-color) text-2xl"
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation menu"
          >
            <FaTimes />
          </button>
        </div>
        {navLinks}
        {/* CTA button under nav links */}
        <div className="flex flex-col items-start w-full">
          {ctaButton}
        </div>
      </nav>
    </>
  );
}

export default Header