import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import axios from 'axios';
import SEO from '../../components/SEO';

export default function ContactPage() {
    const { t } = useTranslation()
    const [step, setStep] = useState(1)

    const servicesList = [
        { key: "web", label: t('contactPage.step2.servicesList.web'), icon: "./services/webDevelopment.png" },
        { key: "mobile", label: t('contactPage.step2.servicesList.mobile'), icon: "./services/mobileDevelopment.png" },
        { key: "seo", label: t('contactPage.step2.servicesList.seo'), icon: "./services/seoOptomization.png" },
        { key: "uiux", label: t('contactPage.step2.servicesList.uiux'), icon: "./services/ui_ux.png" },
        { key: "backend", label: t('contactPage.step2.servicesList.backend'), icon: "./services/backend-api.png" },
    ]

    const stepTitles = t('contactPage.steps', { returnObjects: true })
    const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', services: [], message: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

    function toggleService(key) {
        setForm(old => ({
            ...old,
            services: old.services.includes(key)
                ? old.services.filter(k => k !== key)
                : [...old.services, key]
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await axios.post('https://codeya-backend.onrender.com/api/contact', {
                name: form.name,
                company: form.company || 'N/A',
                email: form.email,
                phone: form.phone || 'N/A',
                services: form.services.map(s => servicesList.find(sl => sl.key === s)?.label || s),
                message: form.message || 'No additional message.'
            });
            setStep(4)
        } catch (err) {
            setError(t('contactPage.step3.err'))
        } finally {
            setLoading(false)
        }
    }

    function handleClose() {
        setForm({ name: '', company: '', email: '', phone: '', services: [], message: '' })
        setError('')
        setStep(1)
    }

    const PHONE_NUMBER = '+201105710609'

    return (
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with Codeya. We'd love to hear about your project and how we can help."
                url="/contact"
            />
            <section className="font-sans py-10 px-4 min-h-screen bg-brand-light">
                {/* Top badge */}
                <div className="inline-flex items-center gap-2 bg-[#eef9f1] border border-[#c6ecd1] rounded-full px-3.5 py-1 text-xs font-semibold text-[#006648] tracking-wider mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                    {t('contactPage.badge')}
                </div>

                {/* Hero */}
                <h1 className="text-[clamp(32px,6vw,52px)] font-black text-brand-dark leading-none tracking-tight mb-2">
                    {t('contactPage.title1')}<br />
                    <span className="text-brand-deep">{t('contactPage.title2')}</span>
                </h1>
                <p className="text-sm text-[#6b8f7a] mb-8 max-w-[400px] leading-relaxed">
                    {t('contactPage.sub')}
                </p>

                {/* Layout */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 items-start max-w-[1280px] mx-auto">

                    {/* Left Panel */}
                    <div className="hidden md:block bg-brand-deep rounded-2xl p-8 text-white h-full">
                        <div className="text-[13px] font-bold tracking-widest text-brand-neon uppercase mb-4">
                            {t('contactPage.whyChooseUs')}
                        </div>
                        <div className="flex flex-col gap-4 mb-8">
                            {[
                                { num: '2+', label: t('contactPage.stats.projects') },
                                { num: '98%', label: t('contactPage.stats.satisfaction') },
                                { num: '24h', label: t('contactPage.stats.response') },
                            ].map(s => (
                                <div key={s.num} className="bg-white/7 rounded-xl p-4 border-l-4 border-brand-neon">
                                    <div className="text-[28px] font-black text-brand-neon leading-none">{s.num}</div>
                                    <div className="text-[12px] text-[#a3c4b0] mt-1 uppercase tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-white/10 space-y-3">
                            <div className="flex items-center gap-3 text-[13px] text-[#d4ede3]">
                                <div className="w-7 h-7 rounded-full bg-brand-neon/15 flex items-center justify-center text-brand-neon">@</div>
                                <a href="mailto:codeyaa01@gmail.com" className="hover:text-brand-neon transition-colors">
                                    codeyaa01@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-[13px] text-[#d4ede3]">
                                <div className="w-7 h-7 rounded-full bg-brand-neon/15 flex items-center justify-center text-brand-neon">
                                    <FaPhoneAlt size={12} />
                                </div>
                                <a
                                    href={`https://wa.me/${PHONE_NUMBER.replace(/[^+\d]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-neon transition-colors"
                                >
                                    {PHONE_NUMBER}
                                </a>

                            </div>
                            <div className="flex gap-2 mt-4">
                                {[
                                    { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61578461982344" },
                                    { icon: <FaWhatsapp />, href: "https://wa.me/" },
                                    { icon: <FaInstagram />, href: "https://www.instagram.com/codeyaa01/" },
                                ].map((s, i) => (
                                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                        className="w-[34px] h-[34px] rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-[#a3c4b0] text-[14px] hover:bg-brand-neon hover:text-brand-deep hover:border-brand-neon transition-all duration-300">
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="bg-white rounded-2xl border border-[#e8f0eb] overflow-hidden shadow-sm">
                        <div className="px-6 py-5 border-b border-[#f0f5f2] flex justify-between items-center">
                            <span className="text-sm font-semibold text-[#1a3a2e]">{stepTitles[step - 1]}</span>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i}
                                        className={`h-1.5 rounded-full transition-all duration-300 
                                    ${i <= Math.min(step, 3) ? 'w-5 bg-brand-neon' : 'w-1.5 bg-[#e0ede6]'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="p-6">
                            {step <= 3 && (
                                <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3">

                                    {/* Step 1 - Info */}
                                    {step === 1 && (
                                        <div className="animate-fadeIn">
                                            <p className="text-[12px] text-[#7aab96] mb-3">{t('contactPage.step1.hi')}</p>
                                            <div className="space-y-2.5 mb-6">
                                                <input className="w-full border border-[#e0ede6] rounded-xl p-3 text-sm text-brand-dark bg-[#fafdfb] outline-none focus:border-brand-neon transition-colors" type="text" name="name" value={form.name} onChange={handleChange} placeholder={t('contactPage.step1.name')} required />
                                                <input className="w-full border border-[#e0ede6] rounded-xl p-3 text-sm text-brand-dark bg-[#fafdfb] outline-none focus:border-brand-neon transition-colors" type="text" name="company" value={form.company} onChange={handleChange} placeholder={t('contactPage.step1.company')} />
                                                <input className="w-full border border-[#e0ede6] rounded-xl p-3 text-sm text-brand-dark bg-[#fafdfb] outline-none focus:border-brand-neon transition-colors" type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('contactPage.step1.email')} required />
                                                <input className="w-full border border-[#e0ede6] rounded-xl p-3 text-sm text-brand-dark bg-[#fafdfb] outline-none focus:border-brand-neon transition-colors" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t('contactPage.step1.phone')} />
                                            </div>
                                            <div className="flex justify-end">
                                                <button type="button" onClick={() => setStep(2)} disabled={!form.name || !form.email}
                                                    className="bg-brand-deep text-white rounded-xl px-6 py-2.5 text-sm font-bold tracking-tight disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-dark transition-colors">
                                                    {t('contactPage.step1.btn')}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2 - Services */}
                                    {step === 2 && (
                                        <div className="animate-fadeIn">
                                            <p className="text-[12px] text-[#7aab96] mb-3">{t('contactPage.step2.title')}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                                                {servicesList.map(({ key, label, icon }) => (
                                                    <button key={key} type="button" onClick={() => toggleService(key)}
                                                        className={`transition-all duration-150 border rounded-lg px-4 py-2.5 text-xs font-semibold flex items-center gap-2
                                                    ${form.services.includes(key) ? 'border-brand-deep bg-brand-deep text-white shadow-md' : 'border-[#ddeee5] bg-[#f6fbf8] text-brand-deep hover:border-brand-neon'}`}>
                                                        <img src={icon} alt="" className="w-4 h-4 brightness-100 contrast-125" />
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex justify-between">
                                                <button type="button" onClick={() => setStep(1)} className="bg-transparent text-brand-deep border border-[#c8ddd4] rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-brand-light transition-colors">{t('contactPage.step2.back')}</button>
                                                <button type="button" onClick={() => setStep(3)} disabled={form.services.length === 0} className="bg-brand-deep text-white rounded-xl px-6 py-2.5 text-sm font-bold tracking-tight disabled:opacity-50 hover:bg-brand-dark transition-colors">{t('contactPage.step2.btn')}</button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3 - Message */}
                                    {step === 3 && (
                                        <div className="animate-fadeIn">
                                            <p className="text-[12px] text-[#7aab96] mb-2">{t('contactPage.step3.title')}</p>
                                            <textarea className="w-full border border-[#e0ede6] rounded-xl p-3 text-sm text-brand-dark bg-[#fafdfb] outline-none focus:border-brand-neon transition-colors resize-none min-h-[120px]" name="message" value={form.message} onChange={handleChange} placeholder={t('contactPage.step3.placeholder')} rows={4} />

                                            {error && (
                                                <p className="text-[12px] text-red-500 mt-2 flex items-center gap-1">
                                                    ⚠️ {error}
                                                </p>
                                            )}

                                            <div className="flex justify-between mt-4">
                                                <button type="button" onClick={() => setStep(2)} className="bg-transparent text-brand-deep border border-[#c8ddd4] rounded-xl px-5 py-2.5 text-sm font-semibold disabled:opacity-50 hover:bg-brand-light transition-colors" disabled={loading}>
                                                    {t('contactPage.step3.back')}
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-black tracking-tight transition-all
                                                ${loading ? 'bg-[#a3c4b0] text-brand-deep cursor-not-allowed' : 'bg-brand-neon text-brand-deep hover:scale-105 shadow-lg'}`}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span className="w-3.5 h-3.5 border-2 border-brand-deep border-t-transparent rounded-full animate-spin" />
                                                            {t('contactPage.step3.sending')}
                                                        </>
                                                    ) : t('contactPage.step3.btnText')}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            )}

                            {/* Step 4 - Success */}
                            {step === 4 && (
                                <div className="text-center py-4 animate-fadeIn">
                                    <div className="w-16 h-16 bg-[#eef9f1] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
                                    <h2 className="text-xl font-black text-brand-dark mb-2">
                                        {t('contactPage.step4.sent')}
                                    </h2>
                                    <p className="text-sm text-[#6b8f7a] mb-6 leading-relaxed">
                                        {t('contactPage.step4.p1')}<br />{t('contactPage.step4.p2')}
                                    </p>
                                    <button onClick={handleClose} className="bg-brand-deep text-white rounded-xl px-8 py-2.5 text-sm font-bold tracking-tight hover:bg-brand-dark transition-colors">
                                        {t('contactPage.step4.another')}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
