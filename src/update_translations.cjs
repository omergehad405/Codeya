const fs = require('fs');
const enPath = 'd:/Programing/FronEnd/Work/codeya/frontend/src/locales/en.json';
const arPath = 'd:/Programing/FronEnd/Work/codeya/frontend/src/locales/ar.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf-8'));

const newEnglishHomePage = {
    hero: {
        available: 'Available for new projects',
        title1: 'Build Bold.',
        title2: 'Ship Fast.',
        title3: 'Win Big.',
        desc: 'We turn your ideas into digital products that wow your audience and deliver real results — with clean code, smart design, and on-time delivery.',
        contactNow: 'Contact us now',
        seeOurWork: 'See our work',
        scroll: 'Scroll to explore',
        availableNow: 'Available now',
        tags: {
            web: 'Web Development',
            uiux: 'UI / UX Design',
            backend: 'Backend & APIs',
            mobile: 'Mobile-First',
            perf: 'Performance',
            react: 'React & Next.js',
            node: 'Node.js',
            clean: 'Clean Code'
        }
    },
    stats: {
        projectsComp: 'PROJECTS COMPLETED',
        clientSat: 'CLIENT SATISFACTION',
        industry: 'IN THE INDUSTRY',
        responseTime: 'RESPONSE TIME'
    },
    about: {
        portfolio: 'Portfolio',
        weAre: 'We Are',
        agency: 'Agency.',
        p1: "We're a passionate team of developers and designers who believe that great digital products don't happen by accident — they're built with intention, craft, and honest communication.",
        p2a: 'Founded with the mission of ',
        p2b: '"Code Your Agency"',
        p2c: ' — we help businesses of all sizes take control of their digital presence.',
        pillars: {
            clean: 'Clean Code',
            onTime: 'On-Time Delivery',
            honest: 'Honest Pricing',
            support: 'Full Support'
        },
        ourMission: '// OUR MISSION',
        missionP1: 'We build digital products that ',
        missionP2: 'actually work',
        missionP3: ' — and look great doing it.',
        miniStats: {
            projects: 'Projects',
            satisfied: 'Satisfied',
            experience: 'Experience'
        },
        alwaysImproving: 'Always Improving',
        latestTech: 'Latest tech stack',
        founded: 'FOUNDED'
    },
    services: {
        whatWeDo: 'What We Do',
        our: 'Our ',
        services: 'Services.',
        desc: 'Everything you need to bring your digital product to life — designed and engineered with care.',
        list: {
            web: { title: 'Web Development', desc: 'Fast, responsive websites and web apps built with modern technologies that scale with your business goals.' },
            uiux: { title: 'UI / UX Design', desc: 'Beautiful, user-centered interfaces that convert visitors into customers and keep them coming back for more.' },
            backend: { title: 'Backend & APIs', desc: 'Robust server-side solutions, databases, and API integrations that power your digital products reliably.' },
            mobile: { title: 'Mobile App Services', desc: 'End-to-end development of powerful and user-friendly mobile applications for iOS and Android.' },
            perf: { title: 'Performance Tuning', desc: 'Speed matters. We audit, optimize, and ensure every millisecond counts for your user experience and SEO.' },
            support: { title: 'Maintenance & Support', desc: "We don't disappear after launch. Ongoing support, updates, and monitoring keep your product running smoothly." }
        }
    },
    projects: {
        portfolio: 'Portfolio',
        workWeAre: "Work we're ",
        proudOf: 'proud of.',
        viewAll: 'View all projects'
    },
    testimonials: {
        clientLove: 'Client Love',
        whatClients: 'What Clients ',
        say: 'Say.',
        comingSoon: 'Coming Soon',
        soonDesc: "We'll be publishing client reviews and amazing stories here soon. Stay tuned for authentic testimonials!"
    },
    contact: {
        getInTouch: 'Get in touch',
        readyToBuild: 'Ready to Build',
        somethingGreat: 'Something Great?',
        desc: "Code Your Agency. Reach out — we'll get back to you within 24 hours with a clear plan and honest pricing."
    }
};

const newArabicHomePage = {
    hero: {
        available: 'متاحون لمشاريع جديدة',
        title1: 'ابنِ بجرأة.',
        title2: 'أطلق بسرعة.',
        title3: 'حقق نجاحاً كبيراً.',
        desc: 'نحوّل أفكارك إلى منتجات رقمية تُبهر جمهورك وتحقق نتائج حقيقية — بكود نظيف، تصميم ذكي، وتسليم في الوقت.',
        contactNow: 'تواصل معنا الآن',
        seeOurWork: 'شوف شغلنا',
        scroll: 'تمرير لاستكشاف المزيد',
        availableNow: 'متاح الآن',
        tags: {
            web: 'تطوير الويب',
            uiux: 'تصميم واجهة المستخدم',
            backend: 'قواعد البيانات وواجهات برمجة التطبيقات',
            mobile: 'تصميم للهاتف أولاً',
            perf: 'تحسين الأداء',
            react: 'React و Next.js',
            node: 'Node.js',
            clean: 'كود نظيف'
        }
    },
    stats: {
        projectsComp: 'مشاريع مكتملة',
        clientSat: 'رضا العملاء',
        industry: 'في المجال',
        responseTime: 'وقت الاستجابة'
    },
    about: {
        portfolio: 'معرض الأعمال',
        weAre: 'نحن وكالة',
        agency: '.',
        p1: 'نحن فريق متحمس من المطورين والمصممين الذين يؤمنون بأن المنتجات الرقمية الرائعة لا تحدث بالصدفة — بل تُبنى بقصد وحرفة وتواصل صادق.',
        p2a: 'تأسست الوكالة بمهمة ',
        p2b: '"برمج وكالتك"',
        p2c: ' — نساعد الشركات بجميع أحجامها على التحكم في وجودها الرقمي.',
        pillars: {
            clean: 'كود نظيف',
            onTime: 'تسليم في الوقت',
            honest: 'تسعير صادق',
            support: 'دعم كامل'
        },
        ourMission: '// مهمتنا',
        missionP1: 'نبني منتجات رقمية ',
        missionP2: 'تعمل حقًا',
        missionP3: ' — وتبدو رائعة أثناء القيام بذلك.',
        miniStats: {
            projects: 'مشاريع',
            satisfied: 'راضون',
            experience: 'خبرة'
        },
        alwaysImproving: 'دائمًا نتحسن',
        latestTech: 'أحدث التقنيات',
        founded: 'تأسست'
    },
    services: {
        whatWeDo: 'ماذا نفعل',
        our: 'خدماتنا ',
        services: '.',
        desc: 'كل ما تحتاجه لإحياء منتجك الرقمي — مُصمم ومُهندس بعناية.',
        list: {
            web: { title: 'تطوير الويب', desc: 'مواقع الويب السريعة والمتجاوبة وتطبيقات الويب المبنية بأحدث التقنيات التي تتوسع مع أهداف عملك.' },
            uiux: { title: 'تصميم واجهة المستخدم', desc: 'تطبيقات جميلة وواجهات مستخدم تركز على المستخدم لتحويل الزوار إلى عملاء ولتحافظ عليهم للعودة مرة أخرى.' },
            backend: { title: 'البنية التحتية وواجهات برمجة التطبيقات', desc: 'الخوادم وحلول قواعد البيانات والتكاملات التي تدير منتجاتك الرقمية بشكل موثوق.' },
            mobile: { title: 'تطبيقات الهاتف المحمول', desc: 'تطوير شامل لتطبيقات الهاتف المحمول الذكية سهلة الاستخدام لنظامي iOS و Android.' },
            perf: { title: 'تحسين الأداء', desc: 'السرعة تهم. نراجع ونحسن ونضمن أن كل جزء من الثانية مهم لتجربة المستخدم وتحديثات محرك البحث.' },
            support: { title: 'الصيانة والدعم', desc: 'نحن لا نختفي بعد الإطلاق. الدعم المستمر والتحديثات والمراقبة لضمان تشغيل منتجك بصورة سلسة.' }
        }
    },
    projects: {
        portfolio: 'معرض الأعمال',
        workWeAre: 'أعمال نفتخر ',
        proudOf: 'بها.',
        viewAll: 'عرض كل المشاريع'
    },
    testimonials: {
        clientLove: 'حب العملاء',
        whatClients: 'ماذا يقول ',
        say: 'العملاء؟',
        comingSoon: 'قريباً',
        soonDesc: 'سنقوم بنشر مراجعات العملاء والقصص الرائعة هنا قريبًا.'
    },
    contact: {
        getInTouch: 'تواصل معنا',
        readyToBuild: 'جاهز لبناء',
        somethingGreat: 'شيء رائع؟',
        desc: 'برمج وكالتك. تواصل معنا — سنرد عليك خلال 24 ساعة بخطة واضحة وتسعير صادق.'
    }
};

en.translation.homePage = newEnglishHomePage;
ar.translation.homePage = newArabicHomePage;

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));
console.log('Translations successfully updated in json files.');
