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
        <footer className="w-full bg-[#0A4A30] text-(--main-color) py-6 relative">
            {/* Responsive styles added */}
            <style>{`
                @media (max-width: 1024px) {
                    .footer__main-flex { flex-direction: column; align-items: stretch; }
                    .footer__center { width: 100% !important; margin: 2rem 0; }
                    .footer__side, .footer__right { align-items: flex-start !important; }
                }
                @media (max-width: 700px) {
                    .footer__main-flex { gap: 1.5rem !important; }
                    .footer__center { width: 100vw !important; }
                    .footer__center ul { align-items: flex-start !important; }
                    .footer__side-logo { width: 74px !important; }
                    .footer__side { align-items: flex-start !important; }
                    .footer__right { align-items: flex-start !important; }
                }
                @media (max-width: 500px) {
                    .footer__center { padding: 0 !important; margin: 1.3rem 0; }
                    .footer__main-flex { gap: 1rem !important; padding-left: 0 !important; padding-right: 0 !important;}
                }
                .footer__side-logo {
                    width: 100px;
                    max-width: 140px;
                }
            `}</style>
            <div
                className="w-[95%] max-w-[1200px] mx-auto flex footer__main-flex flex-col md:flex-row justify-center lg:items-center md:items-start gap-8 px-2"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            >
                {/* Left: Logo & Slogan */}
                <div className="flex flex-col footer__side lg:items-center items-center mb-2">
                    <img src="./footerLogo.png" alt="logo" className="footer__side-logo mb-2" />
                    <span className="text-lg text-(--main-color) mt-1 flex items-center gap-2 capitalize">
                        <span className='text-xs'><FaQuoteLeft /></span>
                        Code Your Agency
                        <span className='text-xs'><FaQuoteRight /></span>
                    </span>
                </div>

                {/* Center: Page Links */}
                <div className="flex flex-col footer__center lg:items-center w-[700px] max-w-full md:max-w-[400px] sm:max-w-full">
                    <div className="mb-2 font-bold text-xl text-white">{t("footer.ourLinks")}</div>
                    <ul className="flex flex-col gap-3 text-lg items-start">
                        {footerLinks.map((link) => (
                            <li key={link.text}>
                                <Link
                                    to={link.to}
                                    className={`
                                        transition-all duration-300 relative block pl-0 hover:pl-2
                                    `}
                                    style={{
                                        transitionProperty: "padding, color",
                                    }}
                                >
                                    <span className="transition-all duration-300">{link.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Social Links & Gmail */}
                <div className="flex flex-col gap-2 footer__right items-start">
                    <div className="mb-2 font-bold text-xl text-white">{t("footer.followUs")}</div>
                    <div className="flex gap-5 text-2xl mb-2">
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black transition"
                            title={t("footer.github")}
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.facebook.com/profile.php?id=61578461982344"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                            title={t("footer.facebook")}
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://www.instagram.com/codeyaa01/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500 transition"
                            title={t("footer.instagram")}
                        >
                            <FaInstagram />
                        </a>
                    </div>
                    <div className="mt-1 flex flex-col gap-2">
                        <div className='flex items-center gap-1'>
                            <span className="text-xl flex items-center gap-1"><SiGmail /> :</span>
                            <a
                                href="mailto:codeyaa01@gmail.com"
                                title={t("footer.sendEmail")}
                                className='hover:text-white'
                            >
                                codeyaa01@gmail.com
                            </a>
                        </div>
                        <div className='flex items-center gap-1'>
                            <span className="text-xl flex items-center gap-1 rotate-[-270deg]"><FaPhone /></span>
                            <a title={t("footer.phone")}>
                                : +20 110710609
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer