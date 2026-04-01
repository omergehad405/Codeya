import React, { useState } from 'react'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import emailjs from '@emailjs/browser'
import { EMAIL_CONFIG } from '../../utils/Emailjs'

const servicesList = [
    { key: "web", label: "Web Dev", icon: "./services/webDevelopment.png" },
    { key: "mobile", label: "Mobile App", icon: "./services/mobileDevelopment.png" },
    { key: "seo", label: "SEO", icon: "./services/seoOptomization.png" },
    { key: "uiux", label: "UI / UX", icon: "./services/ui_ux.png" },
    { key: "backend", label: "Backend & APIs", icon: "./services/backend-api.png" },
]

const styles = {
    section: {
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: '2.5rem 1rem',
        minHeight: '100vh',
    },
    topLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: '#eef9f1',
        border: '1px solid #c6ecd1',
        borderRadius: 30,
        padding: '5px 14px',
        fontSize: 12,
        fontWeight: 600,
        color: '#006648',
        letterSpacing: 0.5,
        marginBottom: 16,
    },
    dot: {
        width: 7, height: 7,
        borderRadius: '50%',
        background: '#04d939',
        animation: 'pulse 1.8s ease-in-out infinite',
    },
    hero: {
        fontSize: 'clamp(32px, 6vw, 52px)',
        fontWeight: 800,
        color: '#0a1a10',
        lineHeight: 1.1,
        marginBottom: '0.5rem',
        letterSpacing: -1,
    },
    heroAccent: { color: '#004836' },
    sub: {
        fontSize: 14,
        color: '#6b8f7a',
        marginBottom: '2rem',
        maxWidth: 400,
        lineHeight: 1.6,
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
        gap: 24,
        alignItems: 'start',
    },
    leftPanel: {
        background: '#004836',
        borderRadius: 20,
        padding: '2rem',
        color: '#fff',
    },
    leftTitle: {
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 1,
        color: '#04d939',
        textTransform: 'uppercase',
        marginBottom: 16,
    },
    statRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    statBox: {
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '1rem',
        borderLeft: '3px solid #04d939',
    },
    statNum: { fontSize: 28, fontWeight: 800, color: '#04d939', lineHeight: 1 },
    statLabel: { fontSize: 12, color: '#a3c4b0', marginTop: 4 },
    contactInfo: {
        marginTop: 24,
        paddingTop: 20,
        borderTop: '1px solid rgba(255,255,255,0.1)',
    },
    contactRow: {
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 13, color: '#d4ede3', marginBottom: 10,
    },
    iconCircle: {
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(4,217,57,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, color: '#04d939',
    },
    rightPanel: {
        background: '#fff',
        borderRadius: 20,
        border: '1.5px solid #e8f0eb',
        overflow: 'hidden',
    },
    formHeader: {
        padding: '1.2rem 1.5rem',
        borderBottom: '1px solid #f0f5f2',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepLabel: { fontSize: 14, fontWeight: 600, color: '#1a3a2e' },
    stepPills: { display: 'flex', gap: 4 },
    formBody: { padding: '1.5rem' },
    inputField: {
        width: '100%',
        border: '1.5px solid #e0ede6',
        borderRadius: 10,
        padding: '11px 14px',
        fontSize: 13,
        color: '#1a3a2e',
        background: '#fafdfb',
        outline: 'none',
        marginBottom: 10,
        fontFamily: 'inherit',
    },
    chip: (selected) => ({
        border: `1.5px solid ${selected ? '#004836' : '#ddeee5'}`,
        borderRadius: 8,
        padding: '9px 14px',
        fontSize: 12,
        fontWeight: 600,
        color: selected ? '#fff' : '#004836',
        background: selected ? '#004836' : '#f6fbf8',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        transition: 'all .15s',
    }),
    textarea: {
        width: '100%',
        border: '1.5px solid #e0ede6',
        borderRadius: 10,
        padding: '11px 14px',
        fontSize: 13,
        color: '#1a3a2e',
        background: '#fafdfb',
        outline: 'none',
        resize: 'none',
        fontFamily: 'inherit',
        minHeight: 100,
    },
    btnPrimary: {
        background: '#004836',
        color: '#fff',
        border: 'none',
        borderRadius: 10,
        padding: '10px 22px',
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
        letterSpacing: 0.3,
    },
    btnSecondary: {
        background: 'transparent',
        color: '#004836',
        border: '1.5px solid #c8ddd4',
        borderRadius: 10,
        padding: '10px 18px',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
    },
}

export default function ContactPage() {
    const [step, setStep] = useState(1)
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
            await emailjs.send(
                EMAIL_CONFIG.serviceId,
                EMAIL_CONFIG.templateId,
                {
                    from_name: form.name,
                    company: form.company || 'N/A',
                    from_email: form.email,
                    phone: form.phone || 'N/A',
                    services: form.services.join(', '),
                    message: form.message || 'No additional message.',
                    to_email: 'codeyaa01@gmail.com',
                },
                EMAIL_CONFIG.publicKey
            )
            setStep(4)
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    function handleClose() {
        setForm({ name: '', company: '', email: '', phone: '', services: [], message: '' })
        setError('')
        setStep(1)
    }

    const stepTitles = ['Your info', 'Services', 'Message', 'Done!']
    const PHONE_NUMBER = '+1 (234) 567-8910' // <- you can edit to your real contact number

    return (
        <section style={styles.section}>
            <style>{`
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
                @keyframes spin { to { transform: rotate(360deg); } }
                @media(max-width:640px){
                    .contact-layout { grid-template-columns: 1fr !important; }
                    .left-panel { display: none; }
                }
            `}</style>

            {/* Top badge */}
            <div style={styles.topLabel}>
                <div style={styles.dot} />
                Available for new projects
            </div>

            {/* Hero */}
            <h1 style={styles.hero}>
                Let's build something<br />
                <span style={styles.heroAccent}>great together.</span>
            </h1>
            <p style={styles.sub}>Tell us about your project and we'll get back to you within 24 hours.</p>

            {/* Layout */}
            <div style={styles.layout} className="contact-layout">

                {/* Left Panel */}
                <div style={styles.leftPanel} className="left-panel">
                    <div style={styles.leftTitle}>Why choose us</div>
                    <div style={styles.statRow}>
                        {[
                            { num: '2+', label: 'Projects delivered' },
                            { num: '98%', label: 'Client satisfaction' },
                            { num: '24h', label: 'Response time' },
                        ].map(s => (
                            <div key={s.num} style={styles.statBox}>
                                <div style={styles.statNum}>{s.num}</div>
                                <div style={styles.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <div style={styles.contactInfo}>
                        <div style={styles.contactRow}>
                            <div style={styles.iconCircle}>@</div>
                            <a href="mailto:codeyaa01@gmail.com" style={{ color: '#d4ede3', textDecoration: 'none', fontSize: 13 }}>
                                codeyaa01@gmail.com
                            </a>
                        </div>
                        <div style={styles.contactRow}>
                            <div style={styles.iconCircle}>
                                <FaPhoneAlt />
                            </div>
                            <a href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, "")}`} style={{ color: '#d4ede3', textDecoration: 'none', fontSize: 13 }}>
                                {PHONE_NUMBER}
                            </a>
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                            {[
                                { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61578461982344" },
                                { icon: <FaWhatsapp />, href: "https://wa.me/" },
                                { icon: <FaInstagram />, href: "https://www.instagram.com/codeyaa01/" },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                    style={{
                                        width: 34, height: 34, borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#a3c4b0', fontSize: 14, textDecoration: 'none'
                                    }}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div style={styles.rightPanel}>
                    <div style={styles.formHeader}>
                        <span style={styles.stepLabel}>{stepTitles[step - 1]}</span>
                        <div style={styles.stepPills}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{
                                    height: 6,
                                    width: i <= Math.min(step, 3) ? 20 : 6,
                                    borderRadius: 4,
                                    background: i <= Math.min(step, 3) ? '#04d939' : '#e0ede6',
                                    transition: 'all .3s'
                                }} />
                            ))}
                        </div>
                    </div>

                    <div style={styles.formBody}>
                        {step <= 3 && (
                            <form onSubmit={handleSubmit} autoComplete="off">

                                {/* Step 1 - Info */}
                                {step === 1 && (
                                    <div>
                                        <p style={{ fontSize: 12, color: '#7aab96', marginBottom: 12 }}>Hi 👋, tell us about yourself</p>
                                        <input style={styles.inputField} type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required />
                                        <input style={styles.inputField} type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" />
                                        <input style={styles.inputField} type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" required />
                                        <input style={styles.inputField} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <button type="button" onClick={() => setStep(2)} disabled={!form.name || !form.email} style={styles.btnPrimary}>
                                                Continue →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2 - Services */}
                                {step === 2 && (
                                    <div>
                                        <p style={{ fontSize: 12, color: '#7aab96', marginBottom: 12 }}>What can we help you with?</p>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                                            {servicesList.map(({ key, label, icon }) => (
                                                <button key={key} type="button" onClick={() => toggleService(key)} style={styles.chip(form.services.includes(key))}>
                                                    <img src={icon} alt="" style={{ width: 16, height: 16 }} />
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <button type="button" onClick={() => setStep(1)} style={styles.btnSecondary}>← Back</button>
                                            <button type="button" onClick={() => setStep(3)} disabled={form.services.length === 0} style={styles.btnPrimary}>Continue →</button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3 - Message */}
                                {step === 3 && (
                                    <div>
                                        <p style={{ fontSize: 12, color: '#7aab96', marginBottom: 8 }}>Any additional details?</p>
                                        <textarea style={styles.textarea} name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project, timeline, budget..." rows={4} />

                                        {/* Error message */}
                                        {error && (
                                            <p style={{ fontSize: 12, color: '#e53e3e', marginTop: 8, marginBottom: 0 }}>
                                                ⚠️ {error}
                                            </p>
                                        )}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                                            <button type="button" onClick={() => setStep(2)} style={styles.btnSecondary} disabled={loading}>← Back</button>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                style={{
                                                    ...styles.btnPrimary,
                                                    background: loading ? '#a3c4b0' : '#04d939',
                                                    color: '#004836',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    cursor: loading ? 'not-allowed' : 'pointer',
                                                }}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span style={{
                                                            width: 14, height: 14,
                                                            border: '2px solid #004836',
                                                            borderTopColor: 'transparent',
                                                            borderRadius: '50%',
                                                            display: 'inline-block',
                                                            animation: 'spin 0.7s linear infinite'
                                                        }} />
                                                        Sending...
                                                    </>
                                                ) : 'Send Message ✓'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        )}

                        {/* Step 4 - Success */}
                        {step === 4 && (
                            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                                <div style={{
                                    width: 64, height: 64,
                                    background: '#eef9f1',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    fontSize: 28,
                                }}>🎉</div>
                                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0a1a10', marginBottom: 8 }}>
                                    Message sent!
                                </h2>
                                <p style={{ fontSize: 13, color: '#6b8f7a', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                    We've received your message and will get<br />back to you within 24 hours.
                                </p>
                                <button onClick={handleClose} style={{ ...styles.btnPrimary, padding: '10px 28px' }}>
                                    Send another
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}