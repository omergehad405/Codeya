import React from 'react'

const services = [
    { num: "01", icon: "⚡", title: "Web Development", desc: "Fast, responsive websites and web apps built with modern technologies that scale with your business goals." },
    { num: "02", icon: "🎨", title: "UI / UX Design", desc: "Beautiful, user-centered interfaces that convert visitors into customers and keep them coming back for more." },
    { num: "03", icon: "🔧", title: "Backend & APIs", desc: "Robust server-side solutions, databases, and API integrations that power your digital products reliably." },
    { num: "04", icon: "📱", title: "Mobile App Services", desc: "End-to-end development of powerful and user-friendly mobile applications for iOS and Android to engage your audience wherever they are." },
    { num: "05", icon: "🚀", title: "Performance Tuning", desc: "Speed matters. We audit, optimize, and ensure every millisecond counts for your user experience and SEO." },
    { num: "06", icon: "🛡️", title: "Maintenance & Support", desc: "We don't disappear after launch. Ongoing support, updates, and monitoring keep your product running smoothly." },
];

function ServicesSection() {
    return (
        <section
            className="w-full py-[100px] px-[7vw] md:px-[60px]"
            id="services"
            style={{ background: "var(--bg-main, #f0f4ee)", fontFamily: "Outfit, sans-serif" }}
        >
            {/* Eyebrow */}
            <div
                className="font-mono text-[11px] font-bold tracking-[2.5px] mb-3"
                style={{ color: "#6aaa6a" }}
            >
                // WHAT WE DO
            </div>

            {/* Heading */}
            <h2
                className="font-extrabold leading-[1.05] mb-14"
                style={{
                    fontSize: "clamp(34px,5vw,56px)",
                    color: "var(--green-dark, #0a3d1f)",
                    letterSpacing: "-1.5px",
                }}
            >
                Our Services
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((s) => (
                    <ServiceCard key={s.num} {...s} />
                ))}
            </div>
        </section>
    );
}

function ServiceCard({ num, icon, title, desc }) {
    return (
        <div
            className="group relative bg-white rounded-[18px] p-9 overflow-hidden transition-all duration-300
                        hover:-translate-y-1.5 hover:shadow-[0_20px_52px_rgba(10,61,31,0.09)]"
            style={{ border: "1px solid rgba(10,61,31,0.09)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(26,255,110,0.35)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(10,61,31,0.09)"}
        >
            {/* Bottom accent bar */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms]"
                style={{ background: "linear-gradient(90deg, var(--green-accent, #1aff6e), transparent)" }}
            />

            <div
                className="font-mono text-[11px] mb-5"
                style={{ color: "#bbd4bb" }}
            >
                {num}
            </div>
            <div className="text-[30px] mb-4">{icon}</div>
            <div
                className="text-[18px] font-extrabold mb-3"
                style={{ color: "var(--green-dark, #0a3d1f)" }}
            >
                {title}
            </div>
            <div
                className="text-[13.5px] leading-[1.7]"
                style={{ color: "#5a7a5a" }}
            >
                {desc}
            </div>
        </div>
    );
}

export default ServicesSection
