'use client';

import React from 'react';
import {
    ChevronRight,
    TrendingUp,
    Calendar,
    CheckCircle,
    MapPin,
    ArrowUpRight,
    FileText,
    Heart,
} from 'lucide-react';

const UniversityCard = ({ name, location, matchScore, rank, imageColor }) => (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl ${imageColor} flex items-center justify-center text-xl font-bold text-white shadow-md`}>
                {name.charAt(0)}
            </div>
            <button className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                <Heart size={18} />
            </button>
        </div>

        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-[#D26E1E] transition-colors">{name}</h3>
        <div className="flex items-center gap-1 text-slate-400 text-sm mb-4">
            <MapPin size={14} /> {location}
        </div>

        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Match</span>
                <span className={`text-lg font-bold ${matchScore >= 90 ? 'text-emerald-500' : matchScore >= 70 ? 'text-amber-500' : 'text-slate-500'
                    }`}>
                    {matchScore}%
                </span>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Rank</span>
                <span className="text-lg font-bold text-slate-900">#{rank}</span>
            </div>
        </div>

        <button className="w-full mt-5 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-semibold text-sm hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
            View Details <ArrowUpRight size={16} />
        </button>
    </div>
);

const DeadlineItem = ({ university, task, date, urgent = false }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
        <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl ${urgent ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'
            }`}>
            <span className="text-xs font-bold uppercase">{date.split(' ')[0]}</span>
            <span className="text-lg font-bold">{date.split(' ')[1]}</span>
        </div>
        <div className="flex-1">
            <h4 className="font-bold text-slate-900">{university}</h4>
            <p className="text-sm text-slate-500">{task}</p>
        </div>
        {urgent && (
            <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                3 Days Left
            </span>
        )}
    </div>
);

// small placeholder for Award icon if needed
const Award = (props) => <TrendingUp {...props} />;

export default function DashboardContent() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Applications', value: '2', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Shortlisted', value: '8', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Scholarships', value: '12', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Profile Score', value: '85%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                                <Icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><span className="flex w-2 h-2 rounded-full bg-[#D26E1E] animate-pulse"></span>AI Recommended for You</h2>
                                <p className="text-sm text-slate-500">Based on your new GRE score update.</p>
                            </div>
                            <button className="text-sm font-semibold text-[#D26E1E] hover:text-[#8C3C0A] flex items-center gap-1">View All <ChevronRight size={16} /></button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <UniversityCard name="Stanford University" location="California, USA" matchScore={94} rank={3} imageColor="bg-red-800" />
                            <UniversityCard name="University of Toronto" location="Toronto, Canada" matchScore={88} rank={21} imageColor="bg-blue-800" />
                            <UniversityCard name="TU Munich" location="Munich, Germany" matchScore={72} rank={37} imageColor="bg-sky-600" />
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-6 text-center hover:bg-orange-50 hover:border-orange-200 transition-all cursor-pointer group">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <ArrowUpRight className="text-slate-400 group-hover:text-[#D26E1E]" />
                                </div>
                                <h3 className="font-bold text-slate-600 group-hover:text-[#8C3C0A]">See 15 More Matches</h3>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-lg text-slate-900">Application Status: NYU</h2>
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">In Progress</span>
                        </div>

                        <div className="relative pt-4 pb-8">
                            <div className="h-1.5 bg-slate-100 rounded-full w-full absolute top-5 left-0"></div>
                            <div className="h-1.5 bg-gradient-to-r from-[#D26E1E] to-[#8C3C0A] rounded-full w-2/3 absolute top-5 left-0"></div>

                            <div className="flex justify-between relative">
                                {['Profile', 'Docs', 'Essays', 'Review', 'Submit'].map((step, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ring-4 ring-white transition-all ${i < 2 ? 'bg-[#D26E1E]' : i === 2 ? 'bg-white border-4 border-[#D26E1E] w-4 h-4' : 'bg-slate-200'}`} />
                                        <span className={`text-xs font-bold ${i < 3 ? 'text-slate-900' : 'text-slate-400'}`}>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-xl p-4 flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#D26E1E] mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-slate-900">Action Required: Upload SOP</p>
                                <p className="text-xs text-slate-500">Your statement of purpose is missing for New York University.</p>
                            </div>
                            <button className="ml-auto text-xs font-bold bg-white px-3 py-1.5 rounded-lg shadow-sm text-slate-900 hover:text-[#D26E1E] whitespace-nowrap">Upload</button>
                        </div>
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg">
                        <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2"><Calendar size={20} className="text-slate-400" /> Deadlines</h3>
                        <div className="space-y-3">
                            <DeadlineItem university="Stanford Univ" task="Application Due" date="DEC 15" urgent />
                            <DeadlineItem university="MIT" task="Scholarship App" date="JAN 05" />
                            <DeadlineItem university="UBC" task="Early Action" date="JAN 15" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full blur-[60px] opacity-20"></div>
                        <h3 className="font-bold text-lg mb-1">New Scholarship</h3>
                        <p className="text-slate-400 text-sm mb-4">Matched to your profile yesterday.</p>

                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 mb-4">
                            <p className="font-bold text-amber-400 text-xl mb-1">$25,000</p>
                            <p className="font-medium text-sm">Future Leaders Award</p>
                            <p className="text-xs text-slate-400 mt-1">Deadline: Feb 20, 2026</p>
                        </div>

                        <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors">Apply Now</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}