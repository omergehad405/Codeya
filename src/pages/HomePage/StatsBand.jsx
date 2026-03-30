import React from 'react'

function StatsBand() {
    const stats = [
        { num: "30+", label: "PROJECTS COMPLETED" },
        { num: "98%", label: "CLIENT SATISFACTION" },
        { num: "3yr", label: "IN THE INDUSTRY" },
        { num: "24h", label: "RESPONSE TIME" },
    ];
    return (
        <div
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-0 text-center"
            style={{ background: "var(--green-dark)" }}
        >
            {stats.map((s, i) => (
                <div
                    key={s.label}
                    className="flex flex-col items-center justify-center py-14 px-6"
                    style={{
                        borderRight: i < stats.length - 1 ? "1px solid rgba(26,255,110,0.08)" : "none",
                    }}
                >
                    <div
                        className="font-mono font-extrabold tracking-tight"
                        style={{
                            fontSize: "clamp(36px,5vw,52px)",
                            color: "var(--green-accent)",
                            letterSpacing: "-2px",
                        }}
                    >
                        {s.num}
                    </div>
                    <div
                        className="mt-2 font-semibold tracking-widest text-[11px]"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                        {s.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatsBand
