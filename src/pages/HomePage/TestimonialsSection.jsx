import React, { useEffect, useState } from 'react';

// Simple dot animation component using CSS keyframes
function SoonText() {
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount(c => (c + 1) % 4); // cycles from 0-3
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full px-2">
            <div
                className="text-[35px] md:text-[45px] font-black mb-4 animate-pulse"
                style={{
                    color: "var(--green-dark, #0a3d1f)",
                    letterSpacing: "-1.8px"
                }}
            >
                Coming Soon
                <span style={{ color: "var(--green-accent, #1aff6e)" }}>
                    {".".repeat(dotCount)}
                </span>
            </div>
            <div className="text-[15px] md:text-[18px] text-[#6aaa6a]" style={{ opacity: 0.66 }}>
                We&apos;ll be publishing client reviews and amazing stories here soon.<br/>
                Stay tuned for authentic testimonials!
            </div>
        </div>
    );
}

function TestimonialsSection() {
    return (
        <section
            className="w-full py-[100px] px-[7vw] md:px-[60px]"
            id="testimonials"
            style={{ background: "var(--bg-main, #f0f4ee)", fontFamily: "Outfit, sans-serif" }}
        >
            {/* Eyebrow */}
            <div
                className="font-mono text-[11px] font-bold tracking-[2.5px] mb-3"
                style={{ color: "#6aaa6a" }}
            >
                // CLIENT LOVE
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
                What Clients Say
            </h2>

            {/* Animated Soon Text */}
            <div className="flex items-center justify-center min-h-[300px]">
                <SoonText />
            </div>
        </section>
    );
}

export default TestimonialsSection
