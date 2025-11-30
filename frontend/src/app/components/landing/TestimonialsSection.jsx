"use client";

import React, { useState, useEffect, useCallback } from "react";
import { QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from "../icons";

const testimonials = [
    {
        id: 1,
        quote:
            "QS rankings helped me identify the best universities for my MBA. I'm now studying at a top 50 business school!",
        name: "Sarah Johnson",
        program: "MBA, London Business School",
        avatar: "SJ",
        color: "bg-[#D26E1E]",
    },
    {
        id: 2,
        quote:
            "The subject rankings were invaluable. I found a Computer Science program that perfectly matched my research interests.",
        name: "Raj Patel",
        program: "MSc Computer Science, ETH Zurich",
        avatar: "RP",
        color: "bg-[#8C3C0A]",
    },
    {
        id: 3,
        quote:
            "Thanks to QS, I discovered universities I never knew existed. Now I'm pursuing my dream degree in Australia.",
        name: "Emma Chen",
        program: "Bachelor of Engineering, University of Melbourne",
        avatar: "EC",
        color: "bg-[#FA9628]",
    },
    {
        id: 4,
        quote:
            "The sustainability rankings showed me which universities align with my values. It made my choice so much easier.",
        name: "Marcus Silva",
        program: "MSc Sustainable Development, Uppsala University",
        avatar: "MS",
        color: "bg-[#D26E1E]",
    },
    {
        id: 5,
        quote:
            "I used QS to compare medical schools globally. The detailed metrics helped me make an informed decision.",
        name: "Aisha Okafor",
        program: "MBBS, University of Edinburgh",
        avatar: "AO",
        color: "bg-[#8C3C0A]",
    },
    {
        id: 6,
        quote:
            "QS events connected me with admission officers directly. I got my questions answered and secured my spot!",
        name: "Liam Brennan",
        program: "LLM, Harvard Law School",
        avatar: "LB",
        color: "bg-[#FA9628]",
    },
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    return (
        <section className="py-16 bg-gradient-to-b from-white to-orange-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block bg-orange-100 text-[#D26E1E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                        Student Stories
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                        Hear from our community
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Over 150 million students and prospective students use QS each year.
                        Here are some of their success stories.
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative max-w-4xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Testimonial Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
                        <QuoteIcon size={40} className="text-[#D26E1E] opacity-20 mb-6" />

                        <div className="min-h-[120px]">
                            <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8 font-medium">
                                &ldquo;{testimonials[currentIndex].quote}&rdquo;
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div
                                className={`w-14 h-14 rounded-full ${testimonials[currentIndex].color} flex items-center justify-center text-white font-bold text-lg`}
                            >
                                {testimonials[currentIndex].avatar}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">
                                    {testimonials[currentIndex].name}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {testimonials[currentIndex].program}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-[#D26E1E] hover:scale-110 transition-all border border-gray-100"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeftIcon size={24} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-[#D26E1E] hover:scale-110 transition-all border border-gray-100"
                        aria-label="Next testimonial"
                    >
                        <ChevronRightIcon size={24} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === index
                                        ? "bg-[#D26E1E] w-8"
                                        : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
