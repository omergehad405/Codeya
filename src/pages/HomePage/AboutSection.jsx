import React from 'react'

function AboutSection() {
    return (
        <section
            className="w-full py-[100px] px-[7vw] md:px-[60px]"
            id="about"
            style={{ background: "#fff", fontFamily: "Outfit, sans-serif" }}
        >
            <div className="grid md:grid-cols-2 gap-20 items-center">

                {/* Left text */}
                <div>
                    <div
                        className="font-mono text-[11px] font-bold tracking-[2.5px] mb-3"
                        style={{ color: "#6aaa6a" }}
                    >
                        // WHO WE ARE
                    </div>
                    <h2
                        className="font-extrabold leading-tight mb-6"
                        style={{
                            fontSize: "clamp(34px,5vw,56px)",
                            color: "var(--green-dark,#0a3d1f)",
                            letterSpacing: "-1.5px",
                        }}
                    >
                        We Are<br />
                        <span style={{ WebkitTextStroke: "2px var(--green-dark,#0a3d1f)", color: "transparent" }}>
                            Codeya
                        </span><br />
                        Agency.
                    </h2>
                    <p className="text-[16px] leading-relaxed mb-5" style={{ color: "#3a5a3a" }}>
                        We&apos;re a passionate team of developers and designers who believe that great digital
                        products don&apos;t happen by accident — they&apos;re built with intention, craft, and honest
                        communication.
                    </p>
                    <p className="text-[15px] leading-relaxed mb-9" style={{ color: "#5a7a5a" }}>
                        Founded with the mission of{" "}
                        <strong style={{ color: "var(--green-dark,#0a3d1f)", fontWeight: 700 }}>
                            &quot;Code Your Agency&quot;
                        </strong>{" "}
                        — we help businesses of all sizes take control of their digital presence and build
                        something they&apos;re truly proud of.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        {["Clean Code", "On-Time Delivery", "Honest Pricing", "Full Support"].map((t) => (
                            <div key={t} className="flex items-center gap-2">
                                <span
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                                    style={{ background: "rgba(26,255,110,0.15)" }}
                                >
                                    ✦
                                </span>
                                <span
                                    className="text-[13px] font-bold"
                                    style={{ color: "var(--green-dark,#0a3d1f)" }}
                                >
                                    {t}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right visual */}
                <div className="relative h-[420px] w-full min-w-[320px]">

                    {/* Mission card */}
                    <div
                        className="absolute top-0 left-0 right-0 rounded-3xl p-10 text-white z-10"
                        style={{ background: "var(--green-dark,#0a3d1f)" }}
                    >
                        <div
                            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-5"
                            style={{ color: "rgba(26,255,110,0.5)" }}
                        >
                            // OUR MISSION
                        </div>
                        <p className="text-[22px] font-extrabold leading-[1.35]" style={{ letterSpacing: "-0.5px" }}>
                            We build digital products that{" "}
                            <span style={{ color: "var(--green-accent,#1aff6e)" }}>actually work</span>
                            {" "}— and look great doing it.
                        </p>
                        <div className="grid grid-cols-3 gap-2.5 mt-8">
                            {[["2+", "Projects"], ["98%", "Satisfied"], ["1yr", "Experience"]].map(([n, l]) => (
                                <div
                                    key={l}
                                    className="rounded-xl py-3.5 text-center"
                                    style={{ background: "rgba(255,255,255,0.06)" }}
                                >
                                    <div
                                        className="font-mono text-xl font-bold"
                                        style={{ color: "var(--green-accent,#1aff6e)" }}
                                    >
                                        {n}
                                    </div>
                                    <div className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        {l}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Always Improving badge */}
                    <div
                        className="absolute bottom-0 right-0 rounded-[16px] px-[22px] py-[18px] flex items-center gap-3"
                        style={{
                            background: "var(--bg-main,#f0f4ee)",
                            border: "2px solid rgba(26,255,110,0.3)",
                            boxShadow: "0 12px 32px rgba(10,61,31,0.1)",
                        }}
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "var(--green-dark,#0a3d1f)" }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1aff6e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[13px] font-extrabold" style={{ color: "var(--green-dark,#0a3d1f)" }}>
                                Always Improving
                            </div>
                            <div className="text-[11px] mt-0.5" style={{ color: "#6a8a6a" }}>
                                Latest tech stack
                            </div>
                        </div>
                    </div>

                    {/* Founded badge */}
                    <div
                        className="absolute bottom-0 left-0 rounded-[16px] px-5 py-4"
                        style={{
                            background: "var(--bg-main,#f0f4ee)",
                            border: "1px solid rgba(10,61,31,0.1)",
                            boxShadow: "0 8px 24px rgba(10,61,31,0.07)",
                        }}
                    >
                        <div
                            className="font-mono text-[10px] uppercase tracking-wide mb-2"
                            style={{ color: "#8aaa8a" }}
                        >
                            FOUNDED
                        </div>
                        <div
                            className="font-mono font-black text-[26px]"
                            style={{ color: "var(--green-dark,#0a3d1f)", letterSpacing: "-1px" }}
                        >
                            2026
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection
