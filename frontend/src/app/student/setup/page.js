'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Check,
    ChevronRight,
    ChevronLeft,
    GraduationCap,
    Globe,
    BookOpen,
    Upload,
    Users,
} from 'lucide-react';
import { Button, Input, Label } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import * as authService from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

const steps = [
    { id: 1, title: 'Basic Info', icon: Users },
    { id: 2, title: 'Academics', icon: GraduationCap },
    { id: 3, title: 'Preferences', icon: Globe },
    { id: 4, title: 'Goals (SOP)', icon: BookOpen },
];

export default function ProfileSetup() {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { updateUser } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        citizenship: '',
        degreeLevel: 'Masters',
        cgpa: '',
        englishTest: 'IELTS',
        englishScore: '',
        testScoreType: 'GRE',
        testScore: '',
        fieldOfInterest: '',
        targetCountries: [],
        budget: 30000,
        sopText: '',
    });

    const handleNext = () => {
        if (currentStep < steps.length) setCurrentStep((c) => c + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep((c) => c - 1);
    };

    const handleFinish = async () => {
        setLoading(true);
        try {
            const response = await authService.completeProfileSetup();
            if (response.success && response.user) {
                // Update the user in context with the new profileCompleted status
                updateUser(response.user);
            }
            router.push(ROUTES.STUDENT_DASHBOARD);
        } catch (error) {
            console.error('Failed to complete profile setup:', error);
            // For now, just redirect anyway - in a real app you'd show an error
            router.push(ROUTES.STUDENT_DASHBOARD);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const toggleCountry = (country) => {
        setFormData((p) => ({
            ...p,
            targetCountries: p.targetCountries.includes(country)
                ? p.targetCountries.filter((c) => c !== country)
                : [...p.targetCountries, country],
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 text-slate-900 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
                <Link href={ROUTES.HOME} className="flex items-center gap-2">
                    <div className="bg-[#D26E1E] p-1.5 rounded-lg shadow-lg shadow-orange-500/20">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#8C3C0A] to-[#D26E1E]">UniScout</span>
                </Link>
                <div className="text-sm text-slate-500 font-medium">Profile Setup • Step {currentStep} of {steps.length}</div>
            </header>

            <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between mb-4">
                        {steps.map((step) => (
                            <div key={step.id} className={`flex flex-col items-center gap-2 w-1/4 ${step.id <= currentStep ? 'text-[#D26E1E]' : 'text-slate-400'}`}>
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step.id < currentStep
                                        ? 'bg-[#D26E1E] border-[#D26E1E] text-white'
                                        : step.id === currentStep
                                            ? 'bg-white border-[#D26E1E] text-[#D26E1E] shadow-lg shadow-orange-100'
                                            : 'bg-white border-slate-200 text-slate-400'
                                        }`}
                                >
                                    {step.id < currentStep ? <Check size={20} /> : step.id}
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wide hidden sm:block text-center">{step.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#FA9628] via-[#D26E1E] to-[#8C3C0A] transition-all duration-500 ease-out"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-8 md:p-10 min-h-[400px] relative animate-in slide-in-from-bottom-4 duration-500">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Let&apos;s start with the basics</h2>
                            <p className="text-slate-500">This information helps us check your eligibility for specific regions.</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Full Name</Label>
                                    <Input id="fullName" name="fullName" type="text" placeholder="e.g. John Doe" value={formData.fullName} onChange={handleInputChange} className="h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#D26E1E] rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-slate-700">Date of Birth</Label>
                                    <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} className="h-11 bg-slate-50 border-slate-200 text-slate-900 focus:border-[#D26E1E] rounded-xl" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="citizenship" className="text-sm font-semibold text-slate-700">Current Citizenship</Label>
                                    <select id="citizenship" name="citizenship" value={formData.citizenship} onChange={handleInputChange} className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#D26E1E]">
                                        <option value="">Select Country</option>
                                        <option value="India">India</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="United States">United States</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="China">China</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Academic Background</h2>
                            <p className="text-slate-500">Our AI uses your grades to predict acceptance probability.</p>

                            <div className="space-y-4">
                                <div className="p-4 border border-orange-100 bg-orange-50 rounded-xl flex gap-3 items-start">
                                    <BookOpen className="w-5 h-5 text-[#D26E1E] mt-0.5" />
                                    <p className="text-sm text-[#8C3C0A]">Please convert your CGPA to a 4.0 scale if possible for better accuracy. Don&apos;t worry, we can help calculate it later.</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="degreeLevel" className="text-sm font-semibold text-slate-700">Degree Level</Label>
                                        <select id="degreeLevel" name="degreeLevel" value={formData.degreeLevel} onChange={handleInputChange} className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#D26E1E]">
                                            <option>High School</option>
                                            <option>Bachelors</option>
                                            <option>Masters</option>
                                            <option>PhD</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cgpa" className="text-sm font-semibold text-slate-700">CGPA (out of 4.0)</Label>
                                        <Input id="cgpa" name="cgpa" type="number" step="0.01" placeholder="3.5" value={formData.cgpa} onChange={handleInputChange} className="h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#D26E1E] rounded-xl" />
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-4">
                                    <h3 className="text-sm font-bold text-slate-900 mb-4">Test Scores</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-slate-700">English Test</Label>
                                            <div className="flex gap-2">
                                                <select name="englishTest" value={formData.englishTest} onChange={handleInputChange} className="w-1/3 h-11 px-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#D26E1E]">
                                                    <option>IELTS</option>
                                                    <option>TOEFL</option>
                                                </select>
                                                <Input type="number" placeholder="Band Score" name="englishScore" value={formData.englishScore} onChange={handleInputChange} className="flex-1 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#D26E1E] rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-slate-700">Aptitude Test (Optional)</Label>
                                            <div className="flex gap-2">
                                                <select name="testScoreType" value={formData.testScoreType} onChange={handleInputChange} className="w-1/3 h-11 px-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#D26E1E]">
                                                    <option>GRE</option>
                                                    <option>GMAT</option>
                                                    <option>SAT</option>
                                                </select>
                                                <Input type="number" placeholder="Score" name="testScore" value={formData.testScore} onChange={handleInputChange} className="flex-1 h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#D26E1E] rounded-xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Your Preferences</h2>
                            <p className="text-slate-500">Tell us what you are looking for in your future university.</p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fieldOfInterest" className="text-sm font-semibold text-slate-700">Field of Interest</Label>
                                    <select id="fieldOfInterest" name="fieldOfInterest" value={formData.fieldOfInterest} onChange={handleInputChange} className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#D26E1E]">
                                        <option value="">Select Field</option>
                                        <option>Computer Science</option>
                                        <option>Data Science</option>
                                        <option>Business Administration</option>
                                        <option>Engineering</option>
                                        <option>Psychology</option>
                                        <option>Medicine</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold text-slate-700">Preferred Countries</Label>
                                    <div className="flex flex-wrap gap-3">
                                        {['USA', 'Canada', 'UK', 'Germany', 'Australia'].map((country) => (
                                            <button key={country} onClick={() => toggleCountry(country)} className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${formData.targetCountries.includes(country)
                                                ? 'bg-[#D26E1E] border-[#D26E1E] text-white shadow-lg shadow-orange-500/25'
                                                : 'border-slate-200 text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-[#D26E1E]'
                                                }`}>
                                                {country}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-slate-700 flex justify-between">
                                        <span>Max Annual Budget (Tuition)</span>
                                        <span className="text-[#D26E1E] font-bold">${formData.budget.toLocaleString()}</span>
                                    </label>
                                    <input type="range" min="5000" max="100000" step="1000" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#D26E1E]" />
                                    <div className="flex justify-between text-xs text-slate-400 font-medium">
                                        <span>$5k</span>
                                        <span>$100k+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">Goals & Statement</h2>
                            <p className="text-slate-500"><span className="font-bold text-[#D26E1E]">This is the most important part.</span> Our Semantic AI analyzes this text to find programs that match your specific research interests and career goals.</p>

                            <div className="space-y-4">
                                <textarea name="sopText" value={formData.sopText} onChange={handleInputChange} className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#D26E1E] focus:ring-2 focus:ring-orange-100 transition-all resize-none text-slate-900 placeholder:text-slate-400" placeholder="Tell us about your academic interests, research projects, and what you want to achieve in your career..."></textarea>

                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <div className="flex-1 h-px bg-slate-200"></div>
                                    <span className="font-medium">OR</span>
                                    <div className="flex-1 h-px bg-slate-200"></div>
                                </div>

                                <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-[#D26E1E] hover:bg-orange-50 hover:text-[#D26E1E] transition-all flex items-center justify-center gap-2">
                                    <Upload size={20} /> Upload your existing SOP (PDF/Docx)
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Actions */}
                <div className="flex justify-between mt-8">
                    <button onClick={handleBack} className={`px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-2 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}>
                        <ChevronLeft size={20} /> Back
                    </button>

                    <button onClick={currentStep === steps.length ? handleFinish : handleNext} disabled={loading} className="px-8 py-3 bg-gradient-to-r from-[#8C3C0A] to-[#D26E1E] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Completing Setup...' : (currentStep === steps.length ? 'Finish & Find Matches' : 'Next Step')}
                        <ChevronRight size={20} />
                    </button>
                </div>
            </main>
        </div>
    );
}
