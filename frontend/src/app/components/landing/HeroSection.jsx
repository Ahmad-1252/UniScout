"use client";

import React from "react";
import { CheckCircleIcon } from "../icons";
import CourseRecommendationWidget from "./CourseRecommendationWidget";

const HeroSection = ({ onSignUpClick }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
            {/* Responsive Gradient Card */}
            <div
                className="relative w-full rounded-3xl overflow-hidden shadow-xl shadow-orange-900/20 
        bg-gradient-to-b lg:bg-gradient-to-r 
        from-[rgba(250,150,40,0.6)] via-[rgba(210,110,30,0.8)] to-[rgba(140,60,10,0.95)]
        p-6 sm:p-10 lg:p-16"
            >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 h-full">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 z-10 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center lg:justify-start bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 shadow-sm">
                            <span className="text-xs font-bold uppercase tracking-wider text-white">
                                Course Recommendation
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-sm">
                            Connect with your dream university today
                        </h1>

                        <div className="space-y-3 text-orange-50 font-medium text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                            <div className="flex items-start lg:items-center gap-3 justify-center lg:justify-start">
                                <CheckCircleIcon
                                    size={20}
                                    className="text-white shrink-0 mt-0.5 lg:mt-0"
                                />
                                <span>Get personalised admission support for top universities</span>
                            </div>
                            <div className="flex items-start lg:items-center gap-3 justify-center lg:justify-start">
                                <CheckCircleIcon
                                    size={20}
                                    className="text-white shrink-0 mt-0.5 lg:mt-0"
                                />
                                <span>
                                    Get academic details from universities in just a few clicks.
                                </span>
                            </div>
                        </div>

                        {/* Widget Container */}
                        <div className="relative mt-8 max-w-md mx-auto lg:mx-0 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                            <CourseRecommendationWidget onComplete={onSignUpClick} />
                        </div>
                    </div>

                    {/* Right Hero Illustration */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center relative mt-4 lg:mt-0">
                        <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg transition-transform duration-500 hover:scale-105">
                            {/* Glow effect behind the rocket */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/20 blur-[50px] rounded-full -z-10"></div>

                            <img
                                src="/Section/female_rocket_new.svg"
                                alt="Student launching career"
                                className="w-full h-auto drop-shadow-2xl"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
