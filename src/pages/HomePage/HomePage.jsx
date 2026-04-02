import React from 'react'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import StatsBand from './StatsBand'
import ServicesSection from './ServicesSection'
import ProjectsSection from './ProjectsSection'
import TestimonialsSection from './TestimonialsSection'
import ContactSection from './ContactSection'

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <StatsBand />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <TestimonialsSection />
            <ContactSection />
        </>
    )
}