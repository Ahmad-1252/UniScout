import ProtectedDashboardPage from '@/components/ProtectedDashboardPage';
import { TrendingUp, Calendar, DollarSign, Award } from 'lucide-react';

const ScholarshipCard = ({ title, amount, deadline, university, matchScore, description }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-lg mb-1">{title}</h3>
                <p className="text-slate-500 text-sm mb-2">{university}</p>
                <p className="text-slate-600 text-sm">{description}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${matchScore >= 90 ? 'bg-emerald-100 text-emerald-700' : matchScore >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                {matchScore}% Match
            </div>
        </div>

        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-emerald-600 text-lg">{amount}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Deadline: {deadline}</span>
            </div>
        </div>

        <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all">
                Apply Now
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-semibold text-sm hover:bg-slate-900 hover:text-white transition-all">
                Learn More
            </button>
        </div>
    </div>
);

export default function ScholarshipsPage() {
    return (
        <ProtectedDashboardPage>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Scholarships</h1>
                        <p className="text-slate-500">Find funding opportunities for your education</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    <ScholarshipCard
                        title="Future Leaders Scholarship"
                        amount="$25,000"
                        deadline="Feb 20, 2025"
                        university="Multiple Universities"
                        matchScore={95}
                        description="Awarded to outstanding international students demonstrating leadership potential."
                    />
                    <ScholarshipCard
                        title="STEM Excellence Award"
                        amount="$15,000"
                        deadline="Jan 15, 2025"
                        university="Stanford University"
                        matchScore={88}
                        description="For students pursuing STEM degrees with exceptional academic records."
                    />
                    <ScholarshipCard
                        title="Global Citizen Grant"
                        amount="$10,000"
                        deadline="Mar 1, 2025"
                        university="University of Toronto"
                        matchScore={76}
                        description="Supporting students who contribute to global understanding and peace."
                    />
                    <ScholarshipCard
                        title="Women in Tech Scholarship"
                        amount="$20,000"
                        deadline="Dec 31, 2024"
                        university="MIT"
                        matchScore={82}
                        description="Empowering women pursuing technology and engineering degrees."
                    />
                    <ScholarshipCard
                        title="Merit-Based Award"
                        amount="$5,000"
                        deadline="Apr 1, 2025"
                        university="TU Munich"
                        matchScore={65}
                        description="Academic excellence award for international students."
                    />
                </div>

                <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Need More Funding?</h2>
                            <p className="text-violet-100">Explore additional scholarship opportunities and financial aid options.</p>
                        </div>
                        <button className="px-6 py-3 bg-white text-violet-600 rounded-xl font-semibold hover:bg-violet-50 transition-colors">
                            View All Scholarships
                        </button>
                    </div>
                </div>
            </div>
        </ProtectedDashboardPage>
    );
}