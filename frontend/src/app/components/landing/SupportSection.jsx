"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    SearchIcon,
    GlobeIcon,
    BookOpenIcon,
    CalendarIcon,
    MapPinIcon,
    CheckCircleIcon,
} from "../icons";

const sections = [
    {
        id: 1,
        title: "Find Your Perfect University",
        description:
            "Search through thousands of universities worldwide. Filter by country, subject, ranking, and more to find your ideal match.",
        icon: SearchIcon,
        color: "from-[#FA9628]",
    },
    {
        id: 2,
        title: "Compare Rankings",
        description:
            "Access comprehensive university rankings including overall, subject-specific, and sustainability rankings to make informed decisions.",
        icon: GlobeIcon,
        color: "from-[#D26E1E]",
    },
    {
        id: 3,
        title: "Explore Programs",
        description:
            "Browse detailed program information including curriculum, duration, fees, and entry requirements for thousands of courses.",
        icon: BookOpenIcon,
        color: "from-[#8C3C0A]",
    },
    {
        id: 4,
        title: "Plan Your Timeline",
        description:
            "Stay on track with application deadlines, intake dates, and important milestones. Never miss a deadline again.",
        icon: CalendarIcon,
        color: "from-[#FA9628]",
    },
    {
        id: 5,
        title: "Discover Destinations",
        description:
            "Learn about study destinations worldwide. Compare cost of living, visa requirements, and career opportunities.",
        icon: MapPinIcon,
        color: "from-[#D26E1E]",
    },
    {
        id: 6,
        title: "Get Accepted",
        description:
            "Receive personalized guidance throughout your application journey. Our experts help you put your best foot forward.",
        icon: CheckCircleIcon,
        color: "from-[#8C3C0A]",
    },
];

const SupportSection = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observers = [];

        sectionRefs.current.forEach((ref, index) => {
            if (ref) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                setActiveSection(index);
                            }
                        });
                    },
                    { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
                );
                observer.observe(ref);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block bg-orange-100 text-[#D26E1E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                        Your Journey
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                        We support you every step of the way
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        From finding your dream university to getting accepted, we&apos;re here
                        to help you succeed.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Left: Timeline Navigation (Fixed on desktop) */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-24">
                            <div className="space-y-2">
                                {sections.map((section, index) => {
                                    const Icon = section.icon;
                                    const isActive = activeSection === index;

                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => {
                                                sectionRefs.current[index]?.scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "center",
                                                });
                                            }}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${isActive
                                                    ? "bg-gradient-to-r " +
                                                    section.color +
                                                    " to-orange-100 shadow-md"
                                                    : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? "bg-white shadow-sm" : "bg-orange-100"
                                                    }`}
                                            >
                                                <Icon
                                                    size={20}
                                                    className={isActive ? "text-[#D26E1E]" : "text-[#D26E1E]/60"}
                                                />
                                            </div>
                                            <span
                                                className={`font-semibold ${isActive ? "text-slate-900" : "text-slate-500"
                                                    }`}
                                            >
                                                {section.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Content Sections */}
                    <div className="lg:w-2/3 space-y-24 lg:space-y-32">
                        {sections.map((section, index) => {
                            const Icon = section.icon;

                            return (
                                <div
                                    key={section.id}
                                    ref={(el) => (sectionRefs.current[index] = el)}
                                    className={`transform transition-all duration-500 ${activeSection === index
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-50 translate-y-4"
                                        }`}
                                >
                                    <div
                                        className={`bg-gradient-to-br ${section.color} to-white rounded-3xl p-8 lg:p-12 shadow-lg border border-orange-100`}
                                    >
                                        <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6">
                                            <Icon size={32} className="text-[#D26E1E]" />
                                        </div>

                                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                                            {section.title}
                                        </h3>

                                        <p className="text-lg text-slate-600 leading-relaxed">
                                            {section.description}
                                        </p>

                                        <div className="mt-8 flex items-center gap-2 text-[#D26E1E] font-semibold">
                                            <span>Learn more</span>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportSection;
