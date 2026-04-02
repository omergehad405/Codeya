import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaInstagram, FaQuoteLeft, FaQuoteRight, FaFacebook, FaPhone } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    const footerLinks = [
        { to: "/", text: t("footer.home") },
        { to: "/about", text: t("footer.about") },
        { to: "/projects", text: t("footer.projects") },
        { to: "/contact", text: t("footer.contactUs") },
    ];

    return (
        <footer className="w-full bg-[#004836] text-brand-offwhite py-12 md:py-16 relative">
            <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-start gap-12 lg:gap-8 px-6 md:px-12">
                
                {/* Left: Logo & Slogan */}
                <div className="flex flex-col items-center lg:items-start gap-4 shrink-0 w-full lg:w-auto">
                    <img src="./footerLogo.png" alt="logo" className="w-[100px] md:w-[120px] object-contain" />
                    <span className="text-lg text-brand-offwhite/90 font-medium flex items-center gap-2 italic tracking-wide">
                        <FaQuoteLeft className="text-[10px] opacity-50" />
                        Code Your Agency
                        <FaQuoteRight className="text-[10px] opacity-50" />
                    </span>
                </div>

                {/* Center: Page Links */}
                <div className="flex flex-col gap-6 w-full lg:w-auto">
                    <h4 className="text-xl font-bold text-white tracking-tight">{t("footer.ourLinks")}</h4>
                    <ul className="flex flex-col gap-4 text-[17px]">
                        {footerLinks.map((link) => (
                            <li key={link.text}>
                                <Link
                                    to={link.to}
                                    className="text-brand-offwhite/70 hover:text-brand-neon hover:translate-x-2 transition-all duration-300 inline-block"
                                >
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Social Links & Contact */}
                <div className="flex flex-col gap-6 w-full lg:w-auto">
                    <h4 className="text-xl font-bold text-white tracking-tight">{t("footer.followUs")}</h4>
                    <div className="flex gap-6 text-2xl mb-2">
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-offwhite/70 hover:text-white transition-colors duration-300"
                            title={t("footer.github")}
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=61578461982344"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-offwhite/70 hover:text-[#1877F2] transition-colors duration-300"
                            title={t("footer.facebook")}
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://www.instagram.com/codeyaa01/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-offwhite/70 hover:text-[#E4405F] transition-colors duration-300"
                            title={t("footer.instagram")}
                        >
                            <FaInstagram />
                        </a>
                    </div>
                    
                    <div className="flex flex-col gap-4 text-[16px] text-brand-offwhite/80">
                        <div className='flex items-center gap-3 group'>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-neon/30 transition-colors">
                                <SiGmail className="text-lg" />
                            </div>
                            <a
                                href="mailto:codeyaa01@gmail.com"
                                title={t("footer.sendEmail")}
                                className='hover:text-brand-neon transition-colors truncate'
                            >
                                codeyaa01@gmail.com
                            </a>
                        </div>
                        
                        <div className='flex items-center gap-3 group'>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-neon/30 transition-colors">
                                <FaPhone className="text-lg rotate-90" />
                            </div>
                            <span className="group-hover:text-brand-neon transition-colors">
                                +20 110710609
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Bar (Optional) */}
            <div className="mt-16 pt-8 border-t border-white/5 text-center">
                <p className="text-brand-offwhite/30 text-sm tracking-widest uppercase">
                    &copy; 2026 Codeyaa. All rights reserved.
                </p>
            </div>
        </footer>
    )
}


export default Footer