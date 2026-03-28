import React from 'react'
import { useTranslation } from 'react-i18next'

function HeroPage() {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <h1 className="relative text-5xl md:text-9xl font-bold text-(--second-color) tracking-wide text-center select-none">
                <span className="block animate-pulse transition-all duration-700">
                    {t('comingSoon')}
                </span>
            </h1>
        </div>
    )
}

export default HeroPage