import React from 'react'

function HeroPage() {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <h1 className="relative text-5xl md:text-9xl font-bold text-(--second-color) tracking-wide text-center select-none">
                <span className="block animate-pulse transition-all duration-700">
                    Coming Soon
                </span>
            </h1>
        </div>
    )
}

export default HeroPage