import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import SEO from '../../components/SEO';
import { useServicesQuery } from '../../hooks/useServicesQuery';

export default function ServicesPage() {
  const { t } = useTranslation();
  const { data: services = [], isLoading } = useServicesQuery();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category).filter(Boolean)))];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <>
      <SEO
        title={t('servicesPage.meta.title', 'Services & Solutions')}
        description={t('servicesPage.meta.description', 'Explore Codeya full suite of software development, bespoke web platforms, e-commerce architectures, and UI/UX design capabilities.')}
        url="/services"
      />

      <div className="font-sans bg-[#eee] overflow-x-hidden ">

        {/* ── HERO ── */}
        <div className="relative bg-brand-deep min-h-[72vh] flex flex-col justify-end px-6 pb-20 md:px-12 lg:px-24 overflow-hidden">
          {/* Background Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(100px,18vw,220px)] font-black text-white/[0.03] whitespace-nowrap pointer-events-none tracking-[-4px]">
            {t('servicesPage.hero.watermark', 'SERVICES')}
          </div>

          {/* Est. Tag */}
          <div className="absolute top-10 right-6 md:right-12 font-sans text-xs text-white/20 tracking-[3px] uppercase [writing-mode:vertical-rl]">
            Est. 2025
          </div>

          {/* Decorative Dots */}
          <div className="absolute top-10 left-6 md:left-12 grid grid-cols-5 gap-2 opacity-15">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white" />
            ))}
          </div>

          {/* Badge */}
          <div className="animate-[fadeUp_0.8s_ease_0.2s_forwards]">
            <div className="inline-flex items-center gap-2 bg-brand-neon/12 border border-brand-neon/30 rounded-full px-4 py-1.5 text-xs font-bold text-brand-neon tracking-widest uppercase mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
              {t('servicesPage.hero.badge', 'Our Capabilities')}
            </div>
          </div>

          {/* Title */}
          <div className="animate-[fadeUp_0.8s_ease_0.4s_forwards]">
            <h1 className="font-serif text-[clamp(42px,7vw,90px)] font-black text-white leading-none tracking-tight mb-6">
              {t('servicesPage.hero.title1', 'Digital Solutions')}<br />
              <span className="text-brand-neon">{t('servicesPage.hero.title2', 'Built for Scale')}</span><br />
              {t('servicesPage.hero.title3', 'Crafted to Lead.')}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-[fadeUp_0.8s_ease_0.6s_forwards]">
            <p className="text-[clamp(14px,1.5vw,17px)] text-white/55 max-w-[500px] leading-relaxed mb-12">
              {t('servicesPage.hero.subtitle', 'We design, engineer, and scale high-performance digital ecosystems tailored precisely around your business goals.')}
            </p>
          </div>

          {/* Scroll Tag */}
          <div className="flex items-center gap-3 text-white/30 text-[10px] tracking-[2px] uppercase">
            <div className="w-12 h-[1px] bg-white/20" />
            {t('servicesPage.hero.scroll', 'Explore Services')}
          </div>
        </div>

        {/* ── SERVICES CONTENT ── */}
        <div className="">
          {/* Services List */}
          {isLoading ? (
            <div className="py-24 text-center text-[#6b8a78] font-medium">
              {t('servicesPage.loading', 'Loading services...')}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="py-20 px-6 max-w-[1280px] mx-auto">
              <div className="bg-white border border-[#e4ede8] rounded-3xl p-12 text-center text-[#6b8a78]">
                <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">No services found</h3>
                <p>Services will appear here once added from the dashboard.</p>
              </div>
            </div>
          ) : (
            <div>
              {filteredServices.map((service, index) => {
                const num = service.num || String(index + 1).padStart(2, '0');
                const isEven = (index + 1) % 2 === 0;

                return (
                  <div
                    key={service._id || service.id || index}
                    className={`w-full transition-colors ${isEven ? 'bg-brand-deep text-white' : 'bg-[#eee] text-brand-dark'
                      }`}
                  >
                    <div className="max-w-[1280px] mx-auto p-8 sm:p-10 md:p-14 py-16 md:py-24 my-5">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

                        {/* Left Column */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="flex items-center gap-3">
                            <span className={`font-serif text-3xl font-black ${isEven ? 'text-white' : 'text-(--brand-deep)'}`}>
                              {num}
                            </span>
                            <span className="text-md font-bold uppercase tracking-[2px] text-(--brand-neon)">
                              {service.category}
                            </span>
                          </div>

                          <h2 className={`font-serif text-4xl sm:text-5xl md:text-6xl font-black leading-tight ${isEven ? 'text-white' : 'text-(--brand-deep)'
                            }`}>
                            {service.title}
                          </h2>

                          <p className={`text-md leading-relaxed ${isEven ? 'text-white/70' : 'text-[#6b8a78]'}`}>
                            {service.description}
                          </p>

                          <div className={`h-[1px] ${isEven ? 'bg-white/10' : 'bg-[#e4ede8]'}`} />

                          <div className="space-y-2">
                            <span className="text-md font-bold uppercase tracking-[2px] text-(--brand-neon)">
                              {t('servicesPage.bestSuitedFor', 'BEST SUITED FOR')}
                            </span>
                            <p className={`text-md leading-relaxed ${isEven ? 'text-white/70' : 'text-[#6b8a78]'}`}>
                              {service.suitedFor}
                            </p>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className={`lg:col-span-7 space-y-8 lg:border-l lg:pl-12 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-12 ${isEven ? 'lg:border-white/10' : 'lg:border-[#e4ede8]'
                          }`}>

                          {/* Built to Achieve */}
                          {service.builtToAchieve && service.builtToAchieve.length > 0 && (
                            <div className="space-y-3">
                              <span className="text-md font-bold uppercase tracking-[2px] text-(--brand-neon)">
                                {t('servicesPage.builtToAchieve', 'BUILT TO ACHIEVE')}
                              </span>
                              <ul className="space-y-2.5">
                                {service.builtToAchieve.map((item, idx) => (
                                  <li key={idx} className={`flex items-start gap-3 text-sm leading-relaxed ${isEven ? 'text-white/90' : 'text-[#6b8a78]'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-[1px] mt-2 shrink-0 ${isEven ? 'bg-brand-neon' : 'bg-(--brand-deep)'
                                      }`} />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className={`h-[1px] ${isEven ? 'bg-white/10' : 'bg-[#e4ede8]'}`} />

                          {/* Can Include */}
                          {service.canInclude && service.canInclude.length > 0 && (
                            <div className="space-y-3">
                              <span className="text-md font-bold uppercase tracking-[2px] text-(--brand-neon)">
                                {t('servicesPage.canInclude', 'CAN INCLUDE')}
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                {service.canInclude.map((item, idx) => (
                                  <div key={idx} className={`flex items-start gap-3 text-sm leading-relaxed ${isEven ? 'text-white/70' : 'text-[#6b8a78]'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-[1px] mt-2 shrink-0 ${isEven ? 'bg-brand-neon' : 'bg-(--brand-deep)'
                                      }`} />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Scope Note & Action */}
                          <div className="space-y-4 pt-2">
                            <p className={`text-xs italic pl-3 border-l-2 rtl:pl-0 rtl:pr-3 rtl:border-l-0 rtl:border-r-2 ${isEven ? 'text-white/50 border-brand-neon' : 'text-[#6b8a78] border-[#c59b27]'
                              }`}>
                              {t('servicesPage.scopeNotice', 'Final store features depend on the agreed project scope.')}
                            </p>

                            <Link
                              to={`/contact?service=${encodeURIComponent(service.title)}`}
                              className={`inline-flex items-center gap-1.5 text-sm font-bold hover:underline ${isEven ? 'text-white hover:text-brand-neon' : 'text-brand-dark hover:text-brand-deep'
                                }`}
                            >
                              <span>{t('servicesPage.exploreCta', 'Explore')} {service.title}</span>
                              <FiArrowUpRight className="text-base text-brand-neon" />
                            </Link>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
