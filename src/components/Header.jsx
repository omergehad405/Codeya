import React, { useState } from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const navLinks = (
    <ul className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full justify-center">
      <li className='relative py-[2px] 
        before:content-[""] before:absolute before:w-0 before:bg-(--text-color) before:h-[2px] before:top-0 before:left-0 before:transition-all before:duration-500 hover:before:w-full
        after:content-[""] after:absolute after:w-0 after:bg-(--text-color) after:h-[2px] after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:w-full'>
        <Link onClick={() => setNavOpen(false)} to="/" className="text-(--main-color) text-2xl">
          Home
        </Link>
      </li>
      <li className='relative py-[2px] 
        before:content-[""] before:absolute before:w-0 before:bg-(--text-color) before:h-[2px] before:top-0 before:left-0 before:transition-all before:duration-500 hover:before:w-full
        after:content-[""] after:absolute after:w-0 after:bg-(--text-color) after:h-[2px] after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:w-full'>
        <Link onClick={() => setNavOpen(false)} to="/about" className="text-(--main-color) text-2xl">
          About
        </Link>
      </li>
      <li className='relative py-[2px] 
        before:content-[""] before:absolute before:w-0 before:bg-(--text-color) before:h-[2px] before:top-0 before:left-0 before:transition-all before:duration-500 hover:before:w-full
        after:content-[""] after:absolute after:w-0 after:bg-(--text-color) after:h-[2px] after:bottom-0 after:right-0 after:transition-all after:duration-500 hover:after:w-full'>
        <Link onClick={() => setNavOpen(false)} to="/projects" className="text-(--main-color) text-2xl">
          Projects
        </Link>
      </li>
    </ul>
  );

  const ctaButton = (
    <Link to="/contact"
      rel="noopener noreferrer"
      onClick={() => setNavOpen(false)}
      className="bg-green-600 text-(--main-color) p-1 rounded-md px-5 flex items-center gap-2 mt-8 lg:mt-0"
      title="Get in touch">
      <span>Get in touch</span>
    </Link>
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
          <a href="https://wa.me/201105710609"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:bg-(--second-color) text-(--main-color) p-1 rounded transition"
            title="WhatsApp">
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
        <button
          className="self-end text-(--main-color) text-2xl mb-8"
          onClick={() => setNavOpen(false)}
          aria-label="Close navigation menu"
        >
          <FaTimes />
        </button>
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