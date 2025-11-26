import ProtectedDashboardPage from '@/components/ProtectedDashboardPage';
import { FileText, Clock, CheckCircle, AlertCircle, MapPin } from 'lucide-react';

const ApplicationCard = ({ university, status, submittedDate, deadline, progress }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-emerald-600 bg-emerald-50';
            case 'in-progress': return 'text-amber-600 bg-amber-50';
            case 'pending': return 'text-slate-600 bg-slate-50';
            case 'rejected': return 'text-red-600 bg-red-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle size={16} />;
            case 'in-progress': return <Clock size={16} />;
            case 'pending': return <AlertCircle size={16} />;
            case 'rejected': return <AlertCircle size={16} />;
            default: return <FileText size={16} />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">{university}</h3>
                    <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                        <MapPin size={14} />
                        Submitted {submittedDate}
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                    {status.replace('-', ' ').toUpperCase()}
                </span>
            </div>

            <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Application Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-sm text-slate-500">
                    Deadline: <span className="font-medium text-slate-900">{deadline}</span>
                </div>
                <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default function ApplicationsPage() {
    return (
        <ProtectedDashboardPage>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
                        <p className="text-slate-500">Track your university applications</p>
                    </div>
                    <button className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors">
                        Start New Application
                    </button>
                </div>

                <div className="grid gap-6">
                    <ApplicationCard
                        university="Stanford University"
                        status="in-progress"
                        submittedDate="Dec 1, 2024"
                        deadline="Jan 15, 2025"
                        progress={75}
                    />
                    <ApplicationCard
                        university="University of Toronto"
                        status="completed"
                        submittedDate="Nov 15, 2024"
                        deadline="Dec 31, 2024"
                        progress={100}
                    />
                    <ApplicationCard
                        university="TU Munich"
                        status="pending"
                        submittedDate="Dec 10, 2024"
                        deadline="Feb 1, 2025"
                        progress={30}
                    />
                </div>

                {false && (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-slate-400" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">No Applications Yet</h2>
                            <p className="text-slate-500 mb-6">Start your first university application</p>
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