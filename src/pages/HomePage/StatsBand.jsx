import React, { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix = '' }) {
    const [val, setVal] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return
            obs.disconnect()
            let s = 0
            const step = () => {
                s += Math.ceil(target / 40)
                if (s >= target) { setVal(target); return }
                setVal(s); requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
        }, { threshold: 0.5 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [target])
    return <span ref={ref}>{val}{suffix}</span>
}

const stats = [
    { num: 2, suffix: '+', label: 'PROJECTS COMPLETED' },
    { num: 98, suffix: '%', label: 'CLIENT SATISFACTION' },
    { num: 1, suffix: 'yr', label: 'IN THE INDUSTRY' },
    { num: 24, suffix: 'h', label: 'RESPONSE TIME' },
]

export default function StatsBand() {
    return (
        <div
            className="stats-band-flex"
            style={{
                background: '#004836',
                fontFamily: "'DM Sans', sans-serif",
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Playfair+Display:wght@900&display=swap');
        .stats-band-flex { 
          display: flex;
          flex-wrap: wrap;
        }
        .stats-band-item {
          flex: 1 1 25%;
        }
        @media (max-width: 700px) {
          .stats-band-flex { flex-wrap: wrap; }
          .stats-band-item { flex: 1 1 50%; }
        }
      `}</style>
            {stats.map((s, i) => (
                <div
                    key={s.label}
                    className="stats-band-item"
                    style={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center',
                        padding: 'clamp(40px,6vw,60px) 20px',
                        borderRight: i % 2 === 0 && i !== stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                        borderBottom: i < 2 ? (window.innerWidth <= 700 ? '1px solid rgba(255,255,255,0.07)' : 'none') : 'none'
                    }}
                >
                    <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(36px,5vw,52px)',
                        fontWeight: 900, color: '#04d939',
                        letterSpacing: '-2px', lineHeight: 1,
                    }}>
                        <Counter target={s.num} suffix={s.suffix} />
                    </div>
                    <div style={{
                        fontSize: 11, fontWeight: 700,
                        color: 'rgba(255,255,255,0.35)',
                        letterSpacing: '2.5px', marginTop: 10,
                        textTransform: 'uppercase',
                    }}>
                        {s.label}
                    </div>
                </div>
            ))}
        </div>
    )
}