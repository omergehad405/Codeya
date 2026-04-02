import React from 'react'
import { useTranslation } from 'react-i18next'

function SectionHeader({ title, accent }) {
    const { t } = useTranslation()

    return (
        <div className="relative text-center mb-4 pt-16 pb-6 overflow-hidden">
            {/* Radial glow behind the title */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,72,54,0.18)_0%,transparent_80%)]" />

            {/* Page Title */}
            <h1 className="relative font-serif text-[clamp(3.5rem,12vw,9rem)] font-black tracking-tighter leading-none select-none text-brand-deep drop-shadow-2xl animate-[fadeUp_0.8s_ease_forwards] opacity-0">
                {title ? t(title) : t('sectionHeader.title')}
                {accent && (
                    <span className="text-brand-dark ml-[0.15em]">
                        {t(accent)}
                    </span>
                )}
            </h1>
        </div>
    )
}

export default SectionHeader