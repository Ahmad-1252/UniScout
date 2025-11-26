import ProtectedDashboardPage from '@/components/ProtectedDashboardPage';

export default function FindUniversitiesPage() {
    return (
        <ProtectedDashboardPage>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Find Universities</h1>
                        <p className="text-slate-500">Discover your perfect university match</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">University Search</h2>
                        <p className="text-slate-500 mb-6">Search and filter universities based on your preferences</p>
                        <div className="max-w-md mx-auto">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search universities..."
                                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                />
                                <button className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedDashboardPage>
    );
}