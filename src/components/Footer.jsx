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
        <footer className="w-full bg-[#0A4A30] text-(--main-color) py-10 px-6 md:px-0">
            <div className="w-[95%] lg:w-[80%] mx-auto flex flex-col md:flex-row justify-between lg:items-center md:items-start gap-8">
                {/* Left: Logo & Slogan */}
                <div className="flex flex-col lg:items-center">
                    <img src="./footerLogo.png" alt="logo" className="w-30 mb-2" />
                    <span className="text-lg text-(--main-color) mt-1 flex items-center gap-2 capitalize">
                        <span className='text-xs'><FaQuoteLeft /></span>
                        Code Your Agency
                        <span className='text-xs'><FaQuoteRight /></span>
                    </span>
                </div>

                {/* Center: Page Links */}
                <div className="flex flex-col lg:items-center w-[700px]">
                    <div className="mb-2 font-bold text-xl text-white">{t("footer.ourLinks")}</div>
                    <ul className="flex flex-col gap-3 text-lg">
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
                <div className="flex flex-col gap-2">
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