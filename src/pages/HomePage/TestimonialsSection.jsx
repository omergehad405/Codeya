import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Star, Quote, User } from 'lucide-react'

function useInView(threshold = 0.12) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
            { threshold }
        )
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [threshold])
    return [ref, inView]
}

function SoonBadge() {
    const { t } = useTranslation()
    const [dotCount, setDotCount] = useState(0)
    useEffect(() => {
        const id = setInterval(() => setDotCount(c => (c + 1) % 4), 500)
        return () => clearInterval(id)
    }, [])
    return (
        <div className="text-center py-16 px-4">
            <div className="inline-flex flex-col items-center gap-2.5 bg-brand-neon/7 border border-brand-neon/20 rounded-2xl p-7 md:p-10 max-w-full">
                <div className="font-serif text-[clamp(28px,4vw,42px)] font-black text-brand-dark tracking-tight">
                    {t('homePage.testimonials.comingSoon')}<span className="text-brand-neon">{'.'.repeat(dotCount)}</span>
                </div>
                <p className="text-sm text-[#6b8a78] leading-relaxed max-w-[400px] m-0">
                    {t('homePage.testimonials.soonDesc')}
                </p>
            </div>
        </div>
    )
}

function Reveal({ children, delay = 0 }) {
    const [ref, inView] = useInView()
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out 
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    )
}

function TestimonialCard({ testimonial }) {
    return (
        <div className="bg-white rounded-[24px] border border-[#c8ddd2] p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col h-full">
            <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-neon/10 group-hover:text-brand-neon/20 transition-colors" />
            <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} `} />
                ))}
            </div>
            <p className="text-[#4a6b58] leading-relaxed mb-8 relative z-10 font-medium flex-1">
                "{testimonial.message}"
            </p>
            <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-light flex items-center justify-center border-2 border-brand-neon/20 shrink-0">
                    {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.clientName} className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-5 h-5 text-[#6b8a78]" />
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-brand-dark text-sm leading-tight">{testimonial.clientName}</h4>
                    <p className="text-[10px] font-bold text-[#6b8a78] uppercase tracking-wider mt-1">{testimonial.role}</p>
                </div>
            </div>
        </div>
    )
}

export default function TestimonialsSection() {
    const { t } = useTranslation()
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('https://codeya-backend.onrender.com/api/testimonials')
                const result = await res.json()
                if (result.status === 'success') {
                    setTestimonials(result.data.testimonials)
                }
            } catch (err) {
                console.error("Error fetching testimonials", err)
            }
        }
        fetchTestimonials()
    }, [])

    return (
        <section id="testimonials" className="bg-brand-light font-sans py-20 px-6 lg:px-12 md:py-32 overflow-hidden">
            <div className="max-w-[1280px] mx-auto w-full">
                <Reveal>
                    <div className="text-[11px] font-bold tracking-[3px] uppercase text-brand-neon mb-4">
                        {t('homePage.testimonials.clientLove')}
                    </div>
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-black text-brand-dark leading-[1.1] tracking-[-1.5px] m-0">
                            {t('homePage.testimonials.whatClients')}<span className="text-brand-deep">{t('homePage.testimonials.say')}</span>
                        </h2>
                    </div>
                    <div className="h-[1px] bg-gradient-to-r from-[#c8ddd2] via-[#c8ddd2]/20 to-transparent mt-9 mb-10" />
                </Reveal>

                <Reveal delay={0.15}>
                    {testimonials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                            {testimonials.map(test => (
                                <div key={test._id} className="h-full">
                                    <TestimonialCard testimonial={test} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <SoonBadge />
                    )}
                </Reveal>
            </div>
        </section>
    )
}
