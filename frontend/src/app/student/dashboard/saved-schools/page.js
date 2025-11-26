import ProtectedDashboardPage from '@/components/ProtectedDashboardPage';
import { Heart, MapPin, TrendingUp } from 'lucide-react';

const SavedUniversityCard = ({ name, location, matchScore, rank, imageColor, saved }) => (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl ${imageColor} flex items-center justify-center text-xl font-bold text-white shadow-md`}>
                {name.charAt(0)}
            </div>
            <button className={`p-2 rounded-full transition-colors ${saved ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50'}`}>
                <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
            </button>
        </div>

        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover:text-violet-600 transition-colors">{name}</h3>
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

        <div className="flex gap-2 mt-5">
            <button className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-all">
                Apply Now
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-semibold text-sm hover:bg-slate-900 hover:text-white transition-all">
                View Details
            </button>
        </div>
    </div>
);

export default function SavedSchoolsPage() {
    return (
        <ProtectedDashboardPage>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Saved Schools</h1>
                        <p className="text-slate-500">Your favorite universities</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SavedUniversityCard
                        name="Stanford University"
                        location="California, USA"
                        matchScore={94}
                        rank={3}
                        imageColor="bg-red-800"
                        saved={true}
                    />
                    <SavedUniversityCard
                        name="University of Toronto"
                        location="Toronto, Canada"
                        matchScore={88}
                        rank={21}
                        imageColor="bg-blue-800"
                        saved={true}
                    />
                    <SavedUniversityCard
                        name="TU Munich"
                        location="Munich, Germany"
                        matchScore={72}
                        rank={37}
                        imageColor="bg-sky-600"
                        saved={true}
                    />
                    <SavedUniversityCard
                        name="ETH Zurich"
                        location="Zurich, Switzerland"
                        matchScore={91}
                        rank={11}
                        imageColor="bg-purple-800"
                        saved={true}
                    />
                    <SavedUniversityCard
                        name="University of Cambridge"
                        location="Cambridge, UK"
                        matchScore={85}
                        rank={2}
                        imageColor="bg-emerald-800"
                        saved={true}
                    />
                </div>

                {false && (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-slate-400" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">No Saved Schools Yet</h2>
                            <p className="text-slate-500 mb-6">Start exploring universities and save your favorites</p>
                            <button className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors">
                                Browse Universities
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedDashboardPage>
    );
}