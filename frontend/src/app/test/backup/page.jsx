'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    Search,
    CheckCircle2,
    Zap,
    BarChart3,
    Star,
    ShieldCheck,
    Menu,
    X,
    ArrowRight,
    GraduationCap,
    Globe,
    Sparkles,
    ChevronDown,
    Trophy,
    Timer,
    AlertCircle,
    FileText,
    PieChart,
    Twitter,
    Linkedin,
    Facebook,
    Lightbulb,
    Target,
    Users
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

// --- Utility: Intersection Observer Hook ---
const useElementOnScreen = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (containerRef.current) observer.unobserve(containerRef.current);
            }
        }, options);

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, [options]);

    return [containerRef, isVisible];
};

// --- Component: Animated Counter ---
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [containerRef, isVisible] = useElementOnScreen({ threshold: 0.5 });

    const numberValue = parseInt(end.toString().replace(/,/g, ''));

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * numberValue));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [isVisible, numberValue, duration]);

    return (
        <span ref={containerRef} className="tabular-nums tracking-tight">
            {count.toLocaleString()}{suffix}
        </span>
    );
};

// --- Component: Feature Card ---
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <div
        className="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_2px_10px_-4px_rgba(124,58,202,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(124,58,202,0.2)] transition-all duration-500 ease-out hover:-translate-y-2"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-600 transition-colors duration-500">
            <Icon className="w-7 h-7 text-violet-600 group-hover:text-white transition-colors duration-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
);

// --- Component: Logo Marquee ---
const LogoMarquee = () => {
    const logos = ["Harvard", "Stanford", "MIT", "Oxford", "Cambridge", "Yale", "Princeton", "Columbia"];
    return (
        <div className="w-full py-12 bg-white border-y border-slate-100 overflow-hidden">
            <div className="flex animate-scroll gap-16 min-w-full items-center justify-around whitespace-nowrap px-8">
                {[...logos, ...logos, ...logos].map((logo, i) => (
                    <span key={i} className="text-2xl font-serif font-bold text-slate-300 select-none hover:text-slate-800 transition-colors cursor-default">
                        {logo}
                    </span>
                ))}
            </div>
            <style jsx>{`
        .animate-scroll { animation: scroll 40s linear infinite; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      `}</style>
        </div>
    );
};

// --- Component: Interactive Admission Predictor ---
const AdmissionPredictor = () => {
    const [gpa, setGpa] = useState(3.5);
    const [activities, setActivities] = useState(5);
    const [probability, setProbability] = useState(0);

    useEffect(() => {
        const score = ((gpa / 4) * 60) + ((activities / 10) * 40);
        setProbability(Math.min(Math.round(score), 98));
    }, [gpa, activities]);

    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row">
                    {/* Left: Controls */}
                    <div className="p-10 md:p-16 md:w-1/2 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                            <Timer className="w-4 h-4" /> Interactive Tool
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Check your odds instantly.</h2>
                        <p className="text-slate-500 mb-10">Adjust the sliders to see how your GPA and extracurriculars impact your admission probability score.</p>

                        {/* Slider 1 */}
                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <label className="font-bold text-slate-700">GPA Score</label>
                                <span className="font-mono text-blue-600 font-bold">{gpa.toFixed(1)}</span>
                            </div>
                            <input
                                type="range" min="2.0" max="4.0" step="0.1" value={gpa}
                                onChange={(e) => setGpa(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-violet-600 hover:accent-violet-700"
                            />
                        </div>

                        {/* Slider 2 */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="font-bold text-slate-700">Extracurricular Activities</label>
                                <span className="font-mono text-blue-600 font-bold">{activities}</span>
                            </div>
                            <input
                                type="range" min="0" max="10" step="1" value={activities}
                                onChange={(e) => setActivities(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-violet-600 hover:accent-violet-700"
                            />
                        </div>
                    </div>

                    {/* Right: Result Visualization */}
                    <div className="md:w-1/2 bg-slate-900 p-10 md:p-16 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="text-center relative z-10">
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-4">Acceptance Probability</p>
                            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tabular-nums transition-all duration-300">
                                {probability}%
                            </div>
                            <div className="mt-8 flex justify-center gap-2">
                                {probability > 80 ? (
                                    <span className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-bold flex items-center gap-2 border border-emerald-500/30">
                                        <CheckCircle2 className="w-4 h-4" /> High Chance
                                    </span>
                                ) : (
                                    <span className="px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm font-bold flex items-center gap-2 border border-violet-500/30">
                                        <Trophy className="w-4 h-4" /> Keep Improving
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Component: FAQ Accordion ---
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = [
        { q: "How accurate is the prediction engine?", a: "Our AI model is trained on over 5 million historical application records, giving it a 94% accuracy rate for top 100 universities." },
        { q: "Does this work for international students?", a: "Absolutely. We support grading systems from 150+ countries and automatically convert them to the US/UK equivalent scale." },
        { q: "Can I find full-ride scholarships?", a: "Yes. Our database includes over $12M in financial aid opportunities, including merit-based, need-based, and athletic scholarships." },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-violet-600 font-semibold tracking-wide uppercase text-xs mb-4">FAQ</h2>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Common Questions</h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-200">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-bold text-slate-900 text-lg">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${openIndex === idx ? 'max-h-48' : 'max-h-0'}`}>
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function UniversityFinder() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-violet-50 to-slate-50 text-slate-900 font-sans selection:bg-violet-200 selection:text-violet-900">

            {/* Navigation */}
            <nav
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled
                    ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 h-16'
                    : 'bg-transparent border-transparent h-24'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-violet-600 to-purple-600 p-1.5 rounded-lg shadow-lg shadow-violet-500/20">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">UniFinder</span>
                    </div>

                    <div className="md:flex items-center space-x-8">
                        {['How it works', 'Features', 'Pricing'].map((item) => (
                            <button key={item} className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors">
                                {item}
                            </button>
                        ))}
                        <div className="pl-4 flex items-center gap-4 border-l border-slate-200">
                            <Link href={ROUTES.LOGIN}>
                                <button className="text-sm font-medium text-slate-900 hover:text-violet-600">Log in</button>
                            </Link>
                            <Link href={ROUTES.SIGNUP}>
                                <button className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-violet-600/20 active:scale-95 transition-all duration-200">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>

                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-400/20 blur-[120px] rounded-full -z-10 opacity-50 mix-blend-multiply" />
                <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-purple-400/20 blur-[100px] rounded-full -z-10 opacity-50 mix-blend-multiply" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm mb-8 animate-fade-in-up">
                        <Sparkles className="w-4 h-4 text-violet-500 fill-violet-500" />
                        <span className="text-sm font-semibold text-slate-700">New: AI Scholarship Matching</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
                        Find your dream university. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                            Backed by Data.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Stop guessing. Our algorithms analyze 5,000+ universities to calculate your exact acceptance probability and scholarship eligibility.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                        <Link href={ROUTES.SIGNUP}>
                            <button className="h-14 px-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 group">
                                Find My Match
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <button className="h-14 px-8 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-slate-900 border-b-[4px] border-b-transparent ml-1"></div>
                            </div>
                            Watch Demo
                        </button>
                    </div>

                    {/* Dashboard Preview (The "Testing Phase") */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent z-10 h-full w-full"></div>
                        <div className="bg-white rounded-t-[2.5rem] p-2 border border-slate-200 shadow-2xl shadow-slate-200/50 mx-4 md:mx-0">
                            <div className="bg-slate-50 rounded-t-[2rem] border border-slate-100 aspect-[16/9] flex items-center justify-center overflow-hidden relative">

                                {/* Abstract App Interface */}
                                <div className="absolute top-8 left-8 right-8 bottom-0 bg-white rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex overflow-hidden">

                                    {/* Fake Sidebar */}
                                    <div className="w-56 bg-slate-50/50 border-r border-slate-100 p-6 hidden md:block">
                                        <div className="flex items-center gap-2 mb-8">
                                            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-8 w-full bg-violet-50 rounded-lg border border-violet-100 flex items-center px-3 gap-3">
                                                <PieChart className="w-4 h-4 text-violet-600" />
                                                <div className="h-2 w-16 bg-violet-200 rounded-full"></div>
                                            </div>
                                            <div className="h-8 w-full flex items-center px-3 gap-3 opacity-50">
                                                <FileText className="w-4 h-4 text-slate-400" />
                                                <div className="h-2 w-20 bg-slate-200 rounded-full"></div>
                                            </div>
                                            <div className="h-8 w-full flex items-center px-3 gap-3 opacity-50">
                                                <AlertCircle className="w-4 h-4 text-slate-400" />
                                                <div className="h-2 w-14 bg-slate-200 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Analysis Content */}
                                    <div className="flex-1 p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900">Eligibility Assessment</h4>
                                                <p className="text-xs text-slate-500 mt-1">Simulating application against 2025 Criteria</p>
                                            </div>
                                            <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100 flex items-center gap-2 animate-pulse">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                LIVE SCAN
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Progress Item 1: Complete */}
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                        Academic Score Normalization
                                                    </span>
                                                    <span className="text-xs font-bold text-emerald-600">COMPLETE</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                                                </div>
                                            </div>

                                            {/* Progress Item 2: Processing */}
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                                        Scholarship & Grant Matching
                                                    </span>
                                                    <span className="text-xs font-bold text-blue-600">PROCESSING...</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 w-3/4 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                                                </div>
                                                <div className="mt-2 flex gap-2 overflow-hidden opacity-70">
                                                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Merit-based</span>
                                                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Need-based</span>
                                                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">Sports</span>
                                                </div>
                                            </div>

                                            {/* Progress Item 3: Pending */}
                                            <div className="opacity-50">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                                        <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                                                        Visa Probability Check
                                                    </span>
                                                    <span className="text-xs font-bold text-slate-400">PENDING</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-slate-300 w-0 rounded-full"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Marquee */}
            <LogoMarquee />

            {/* Stats Section */}
            <section className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">
                        {[
                            { label: 'Universities', value: 5000, suffix: '+' },
                            { label: 'Countries', value: 150, suffix: '+' },
                            { label: 'Scholarships', value: 12000000, suffix: '$' },
                            { label: 'Success Rate', value: 98, suffix: '%' },
                        ].map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-slate-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Admission Predictor */}
            <AdmissionPredictor />

            {/* Features Grid */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-violet-600 font-semibold tracking-wide uppercase text-xs mb-4">Why Choose Us</h2>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                            Complete toolkit for admission success.
                        </h2>
                    </div>          <div className="grid md:grid-cols-3 gap-8">
                        {/* Large Card */}
                        <div className="md:col-span-2 bg-gradient-to-br from-violet-50 to-purple-50 rounded-[2.5rem] p-10 border border-violet-100 relative overflow-hidden group">
                            <div className="relative z-10 max-w-md">
                                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                                    <Zap size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">AI-Powered Matching Engine</h3>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Our proprietary algorithm analyzes your grades, test scores, and extracurriculars against millions of data points to predict your admission chances with 94% accuracy.
                                </p>
                            </div>
                            <div className="absolute top-1/2 -right-20 w-64 h-64 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        </div>

                        {/* Tall Card */}
                        <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div>
                                <Globe className="w-10 h-10 mb-6 text-violet-400" />
                                <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Access database of universities across US, UK, Canada, Australia, and Europe.
                                </p>
                            </div>
                            <div className="mt-8 flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full bg-slate-800 border-2 border-purple-900 flex items-center justify-center text-xs font-bold">
                                        {['UK', 'US', 'CA', 'EU'][i - 1]}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3 Smaller Cards */}
                        <FeatureCard
                            icon={Search}
                            title="Smart Filtering"
                            description="Filter by tuition budget, ranking, location, and course availability."
                            delay={0}
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Visa Assistant"
                            description="Step-by-step guidance on documentation and interview prep."
                            delay={100}
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Cost Calculator"
                            description="Estimate total cost of attendance including living expenses."
                            delay={200}
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* Call to Action */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-violet-600 to-purple-600 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-violet-900/20">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-12">
                        <div className="text-left md:max-w-lg">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start your journey?</h2>
                            <p className="text-blue-100 text-lg mb-8">
                                Join 50,000+ students who found their dream university with UniFinder.
                            </p>
                            <div className="flex gap-4">
                                <Link href={ROUTES.SIGNUP}>
                                    <button className="px-8 py-4 bg-white text-violet-600 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-lg">
                                        Get Started Free
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-white max-w-xs">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="font-medium italic mb-6">&ldquo;I got into my top choice university with a 50% scholarship using this tool.&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center font-bold">S</div>
                                <div>
                                    <p className="text-sm font-bold">Sarah Jenkins</p>
                                    <p className="text-xs text-violet-200">Stanford &apos;25</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-5 gap-12 mb-16">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-gradient-to-br from-violet-600 to-purple-600 p-1.5 rounded-lg shadow-lg shadow-violet-500/20">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">UniFinder</span>
                            </div>
                            <p className="text-slate-500 mb-6 max-w-sm">
                                Making higher education accessible to everyone through transparent data and AI technology.
                            </p>
                            <div className="flex gap-4">
                                <button className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-600"><Twitter size={18} /></button>
                                <button className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-600"><Linkedin size={18} /></button>
                                <button className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-600"><Facebook size={18} /></button>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-violet-600 transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-violet-600 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-violet-600 transition-colors">Enterprise</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-violet-600 transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-violet-600 transition-colors">Scholarship Guide</a></li>
                                <li><a href="#" className="hover:text-violet-600 transition-colors">Visa Help</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-violet-600 transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-violet-600 transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-400">© 2025 UniFinder Inc. All rights reserved.</p>
                        <div className="flex gap-6 items-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-xs text-slate-500 font-medium">All Systems Operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}