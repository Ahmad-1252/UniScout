"use client";

import React, { useState } from "react";
import {
    GlobeIcon,
    BookOpenIcon,
    CalendarIcon,
    MapPinIcon,
    ChevronDownIcon,
    ArrowRightIcon,
} from "../icons";

const CourseRecommendationWidget = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState({
        studyLevel: "",
        subject: "",
        intake: "",
        destination: "",
    });
    const [showDropdown, setShowDropdown] = useState(null);

    const steps = [
        {
            key: "studyLevel",
            label: "Study level",
            icon: BookOpenIcon,
            options: ["Bachelor's", "Master's", "PhD", "Diploma"],
        },
        {
            key: "subject",
            label: "Subject area",
            icon: BookOpenIcon,
            options: [
                "Engineering",
                "Business",
                "Medicine",
                "Computer Science",
                "Law",
                "Arts",
            ],
        },
        {
            key: "intake",
            label: "Intake",
            icon: CalendarIcon,
            options: [
                "Fall 2025",
                "Spring 2026",
                "Fall 2026",
                "Spring 2027",
            ],
        },
        {
            key: "destination",
            label: "Destination",
            icon: MapPinIcon,
            options: ["USA", "UK", "Canada", "Australia", "Germany", "Netherlands"],
        },
    ];

    const handleSelect = (key, value) => {
        setSelections((prev) => ({ ...prev, [key]: value }));
        setShowDropdown(null);
        if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };

    const isComplete = Object.values(selections).every((v) => v !== "");

    return (
        <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                <GlobeIcon size={20} className="text-[#D26E1E]" />
                <span className="font-semibold text-slate-800">
                    Find your perfect course
                </span>
            </div>

            <div className="space-y-3">
                {steps.map((s, index) => {
                    const Icon = s.icon;
                    const isActive = step === index;
                    const isCompleted = selections[s.key] !== "";

                    return (
                        <div key={s.key} className="relative">
                            <button
                                onClick={() => {
                                    setStep(index);
                                    setShowDropdown(showDropdown === s.key ? null : s.key);
                                }}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${isActive
                                        ? "border-[#D26E1E] bg-orange-50"
                                        : isCompleted
                                            ? "border-green-300 bg-green-50"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={18}
                                        className={
                                            isActive
                                                ? "text-[#D26E1E]"
                                                : isCompleted
                                                    ? "text-green-600"
                                                    : "text-gray-400"
                                        }
                                    />
                                    <span
                                        className={`text-sm ${isCompleted ? "text-slate-800 font-medium" : "text-gray-500"
                                            }`}
                                    >
                                        {selections[s.key] || s.label}
                                    </span>
                                </div>
                                <ChevronDownIcon
                                    size={16}
                                    className={`text-gray-400 transition-transform ${showDropdown === s.key ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {showDropdown === s.key && (
                                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-48 overflow-y-auto">
                                    {s.options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleSelect(s.key, option)}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-[#D26E1E] transition-colors"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                onClick={isComplete ? onComplete : undefined}
                disabled={!isComplete}
                className={`w-full mt-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${isComplete
                        ? "bg-[#D26E1E] text-white hover:bg-[#8C3C0A]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
            >
                {isComplete ? (
                    <>
                        Find Universities <ArrowRightIcon size={16} />
                    </>
                ) : (
                    "Complete all steps"
                )}
            </button>
        </div>
    );
};

export default CourseRecommendationWidget;
