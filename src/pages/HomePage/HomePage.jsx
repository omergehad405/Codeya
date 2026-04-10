import React from 'react'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import StatsBand from './StatsBand'
import ServicesSection from './ServicesSection'
import ProjectsSection from './ProjectsSection'
import TestimonialsSection from './TestimonialsSection'
import ContactSection from './ContactSection'
import SEO from '../../components/SEO'

export default function HomePage() {
    return (
        <>
            <SEO
                title="Software Development Company"
                description="Codeya builds web & mobile apps that drive results. Let's build something great together."
                url="/"
            />
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