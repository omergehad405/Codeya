import React from 'react'

const contacts = [
    {
        href: "mailto:codeyaa01@gmail.com", type: "EMAIL", val: "codeyaa01@gmail.com",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1aff6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
    },
    {
        // WhatsApp entry replaces "PHONE"
        href: "https://wa.me/20110710609", type: "WHATSAPP", val: "+20 110 710 609",
        icon: (
            // WhatsApp SVG icon, green accent
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <g>
                    <circle cx="16" cy="16" r="16" fill="#1aff6e" />
                    <path d="M23.51 19.81c-.36-.18-2.12-1.05-2.44-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.15 1.41-.21.24-.42.27-.78.09a6.54 6.54 0 0 1-1.93-1.19 7.15 7.15 0 0 1-1.34-1.68c-.14-.24-.01-.37.11-.49.12-.12.27-.3.39-.45.13-.14.18-.24.27-.39.09-.15.05-.3-.03-.48-.08-.18-.82-1.97-1.13-2.69-.29-.72-.59-.62-.81-.63-.21-.01-.46-.01-.71-.01-.25 0-.65.09-.99.45-.34.36-1.3 1.17-1.3 2.84s1.33 3.3 1.52 3.53c.18.22 2.62 4.12 6.58 5.14.42.11.75.18 1.01.29.42.18.81.15 1.11.09.33-.06 1.02-.42 1.16-.83.15-.42.15-.78.11-.85-.03-.07-.14-.11-.3-.17z" fill="#145a32"/>
                </g>
            </svg>
        ),
    },
    {
        href: "https://www.facebook.com/profile.php?id=61578461982344", type: "FACEBOOK", val: "Codeya",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1aff6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        href: "https://www.instagram.com/codeyaa01/", type: "INSTAGRAM", val: "@codeyaa01",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1aff6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="#1aff6e" stroke="none" />
            </svg>
        ),
    },
];

function ContactSection() {
    return (
        <section
            className="relative w-full py-[150px] px-[7vw] md:px-[60px] text-center overflow-hidden"
            id="contact"
            style={{ background: "var(--green-dark, #0a3d1f)", fontFamily: "Outfit, sans-serif" }}
        >
            {/* Radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(26,255,110,0.07) 0%, transparent 65%)",
                }}
            />

            <div className="relative z-10">
                {/* Eyebrow */}
                <div
                    className="font-mono text-[11px] tracking-[2px] mb-5"
                    style={{ color: "rgba(26,255,110,0.5)" }}
                >
                    // LET&apos;S WORK TOGETHER
                </div>

                {/* Heading */}
                <h2
                    className="font-extrabold text-white leading-[1.02] mb-5"
                    style={{
                        fontSize: "clamp(40px,6vw,72px)",
                        letterSpacing: "-2.5px",
                    }}
                >
                    Ready to Build<br />
                    <span style={{ color: "var(--green-accent, #1aff6e)" }}>Something Great?</span>
                </h2>

                {/* Sub */}
                <p
                    className="text-[16px] max-w-[440px] mx-auto leading-[1.75] mb-11"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                >
                    Code Your Agency. Reach out — we&apos;ll get back to you within 24 hours
                    with a clear plan and honest pricing.
                </p>

                {/* Contact cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[900px] mx-auto">
                    {contacts.map((c) => (
                        <a
                            key={c.type}
                            href={c.href}
                            target={c.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="group flex flex-col items-center rounded-[16px] px-5 py-6 no-underline transition-all duration-250 hover:-translate-y-1"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(26,255,110,0.15)",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "rgba(26,255,110,0.1)"
                                e.currentTarget.style.borderColor = "rgba(26,255,110,0.4)"
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.06)"
                                e.currentTarget.style.borderColor = "rgba(26,255,110,0.15)"
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3.5"
                                style={{ background: "rgba(26,255,110,0.12)" }}
                            >
                                {c.icon}
                            </div>
                            {/* Type label */}
                            <div
                                className="font-mono text-[10px] tracking-[1.5px] mb-1.5"
                                style={{ color: "rgba(26,255,110,0.5)" }}
                            >
                                {c.type}
                            </div>
                            {/* Value */}
                            <div
                                className="text-[11px] font-medium leading-[1.4] break-all"
                                style={{ color: "rgba(255,255,255,0.75)" }}
                            >
                                {c.val}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ContactSection
