"use client";

import React from "react";
import Button from "../ui/Button";
import {
    GlobeIcon,
    BookOpenIcon,
    MapPinIcon,
    ArrowRightIcon,
} from "../icons";

const RankingsCards = () => {
    const cards = [
        {
            title: "QS World University Rankings 2026",
            description:
                "The world's most trusted university ranking. Compare the top 1,500 institutions based on academic reputation, employer reputation, and research impact.",
            icon: GlobeIcon,
            badge: "Flagship",
            buttonText: "Explore Rankings",
        },
        {
            title: "QS World University Rankings by Subject 2025",
            description:
                "Find the top universities for your field. Covering 55 subjects across 5 broad faculty areas including Engineering, Medicine, and Law.",
            icon: BookOpenIcon,
            badge: null,
            buttonText: "View Subjects",
        },
        {
            title: "QS Sustainability Rankings 2026",
            description:
                "Discover universities leading the way in social and environmental impact. See who is committed to a more sustainable future.",
            icon: MapPinIcon,
            badge: null,
            buttonText: "See Impact",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Latest Rankings & Reports
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative overflow-hidden"
                        >
                            {/* Badge */}
                            {card.badge && (
                                <div className="absolute top-6 right-6 bg-orange-100 text-[#D26E1E] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide z-10">
                                    {card.badge}
                                </div>
                            )}

                            {/* Visual */}
                            <div className="h-40 w-full rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 mb-6 flex items-center justify-center relative overflow-hidden">
                                <Icon
                                    size={96}
                                    className="text-[#D26E1E] opacity-10 absolute -bottom-6 -right-6"
                                />
                                <div className="bg-white p-4 rounded-full shadow-sm z-10 text-[#D26E1E]">
                                    <Icon size={32} />
                                </div>
                            </div>

                            <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-[#D26E1E] transition-colors">
                                {card.title}
                            </h3>
                            <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
                                {card.description}
                            </p>

                            <Button
                                variant="primary"
                                className="self-start rounded-full px-6 font-bold w-full flex justify-between items-center group-hover:bg-[#8C3C0A]"
                            >
                                {card.buttonText} <ArrowRightIcon size={16} />
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RankingsCards;
