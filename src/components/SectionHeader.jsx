import React from 'react'
import { useTranslation } from 'react-i18next'

function SectionHeader({ title, accent }) {
    const { t } = useTranslation();

    return (
        <div className="relative text-center mb-4 pt-16 pb-6 overflow-hidden">

            {/* Radial glow behind the title */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,72,54,0.18) 0%, transparent 80%)',
                }}
            />

            {/* Page Title */}
            <h1
                className="relative font-black tracking-tight leading-none select-none"
                style={{
                    fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                    color: 'var(--second-color)',
                    textShadow: '0 0 80px rgba(0,72,54,0.15)',
                    animation: 'sectionFadeDown 0.8s cubic-bezier(.22,1,.36,1) both',
                }}
            >
                {title ? t(title) : t('sectionHeader.title')}
                {accent && (
                    <span style={{ color: 'var(--text-color)', marginLeft: '0.15em' }}>
                        {t(accent)}
                    </span>
                )}
            </h1>
        </div>
    )
}

export default SectionHeader