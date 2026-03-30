import React from 'react'
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import StatsBand from './StatsBand';
import ServicesSection from './ServicesSection';
import ProjectsSection from './ProjectsSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';

function HomePage() {
    return (
        <>
            {/* Hero section  */}
            <HeroSection />
            {/* About section  */}
            <AboutSection />
            {/* Services section  */}
            <ServicesSection />
            {/* Projects Section  */}
            <ProjectsSection />
            {/* Testimonials Section */}
            <TestimonialsSection />
            {/* contact section  */}
            <ContactSection />
        </>

    )
}

export default HomePage