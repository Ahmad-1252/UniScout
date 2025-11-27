'use client';
import React, { useState, useEffect } from 'react';

// --- Inline Icon Components (Replacing external dependencies) ---

const IconWrapper = ({ children, size = 24, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {children}
    </svg>
);

const SearchIcon = (props) => (
    <IconWrapper {...props}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </IconWrapper>
);

const GlobeIcon = (props) => (
    <IconWrapper {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </IconWrapper>
);

const BookOpenIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </IconWrapper>
);

const CalendarIcon = (props) => (
    <IconWrapper {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </IconWrapper>
);

const MapPinIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </IconWrapper>
);

const XIcon = (props) => (
    <IconWrapper {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </IconWrapper>
);

const EyeIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </IconWrapper>
);

const EyeOffIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07-2.3 2.3"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </IconWrapper>
);

const ArrowRightIcon = (props) => (
    <IconWrapper {...props}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </IconWrapper>
);

const CheckCircleIcon = (props) => (
    <IconWrapper {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </IconWrapper>
);

const MenuIcon = (props) => (
    <IconWrapper {...props}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </IconWrapper>
);


// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
    const baseStyle = "px-5 py-2.5 rounded-md font-medium transition-all duration-200 flex items-center justify-center";
    const variants = {
        primary: "bg-amber-500 hover:bg-amber-600 text-white shadow-sm", // Darker yellow/orange for buttons
        outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 bg-white",
        ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
        social: "border border-slate-300 text-slate-600 hover:bg-slate-50 bg-white w-full relative",
        link: "text-blue-600 hover:underline p-0 h-auto"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

// --- Dashboard Component ---

const Dashboard = ({ onLoginClick, onSignUpClick }) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo & Links */}
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <div className="bg-amber-500 text-white font-bold p-1 rounded text-lg">QS</div>
                                <span className="font-bold text-xl text-slate-800">TopUniversities</span>
                            </div>
                            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                                <a href="#" className="hover:text-amber-600">Rankings</a>
                                <a href="#" className="hover:text-amber-600">Discover</a>
                                <a href="#" className="hover:text-amber-600">Events</a>
                                <a href="#" className="hover:text-amber-600">Prepare</a>
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <Button variant="outline" className="hidden lg:flex rounded-full px-4 py-1.5 text-sm">
                                Free Counselling
                            </Button>
                            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                                <SearchIcon size={20} />
                            </button>
                            <button
                                onClick={onLoginClick}
                                className="hidden sm:block text-slate-600 font-medium hover:text-amber-600"
                            >
                                Login
                            </button>
                            <Button onClick={onSignUpClick} className="hidden sm:flex bg-amber-500 hover:bg-amber-600 text-white">
                                Sign Up
                            </Button>
                            <button className="md:hidden p-2">
                                <MenuIcon size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-[#FFC200] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">

                    {/* Left Hero Content */}
                    <div className="lg:w-1/2 z-10 space-y-6">
                        <div className="inline-block bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-slate-900 border border-white/20">
                            Course Recommendation
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                            Connect with your dream university today
                        </h1>
                        <div className="space-y-2 text-slate-800 font-medium">
                            <div className="flex items-center gap-2">
                                <CheckCircleIcon size={18} className="text-slate-900" />
                                <span>Get personalised admission support for the top universities</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircleIcon size={18} className="text-slate-900" />
                                <span>Get academic details from universities in just a few clicks.</span>
                            </div>
                        </div>

                        {/* Steps Widget */}
                        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mt-8">
                            <div className="text-xs text-slate-500 font-bold mb-1">STEP 4 of 4</div>
                            <div className="font-bold text-lg mb-4">Select your study start year</div>

                            <div className="grid grid-cols-3 gap-2 mb-6">
                                <button className="border border-slate-200 px-3 py-2 rounded hover:border-amber-500 hover:bg-amber-50 text-sm">Spring 2026</button>
                                <button className="border border-amber-500 bg-amber-50 px-3 py-2 rounded text-sm font-medium">Fall 2026</button>
                                <button className="border border-slate-200 px-3 py-2 rounded hover:border-amber-500 hover:bg-amber-50 text-sm">Spring 2027</button>
                            </div>

                            <div className="flex justify-between items-center">
                                <button className="text-blue-600 text-sm font-medium hover:underline">← Back</button>
                                <Button className="flex items-center gap-2 text-sm">
                                    View results <ArrowRightIcon size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Hero Illustration (Simplified SVG Representation) */}
                    <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center relative">
                        {/* Abstract Graphic mimicking the girl sitting */}
                        <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto drop-shadow-xl">
                            <circle cx="200" cy="200" r="160" fill="white" />
                            <path d="M200 360 C120 360 60 300 60 200" fill="none" stroke="#fbbf24" strokeWidth="20" />
                            <circle cx="340" cy="80" r="20" fill="none" stroke="black" strokeWidth="2" />
                            {/* Rocket */}
                            <path d="M60 60 L100 100 L90 120 L50 80 Z" fill="white" stroke="black" strokeWidth="2" />
                            {/* Character Placeholder */}
                            <path d="M150 250 Q200 150 250 250 T350 350 L150 350" fill="#e2e8f0" />
                            <circle cx="250" cy="180" r="30" fill="#1e293b" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "QS World University Rankings 2026", desc: "Discover the top-performing universities around the world" },
                        { title: "QS World University Rankings by Subject 2025", desc: "Find out which universities excel in your chosen subject" },
                        { title: "QS World University Rankings: Sustainability 2026", desc: "Leading the way in social and environmental sustainability." }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer flex flex-col h-full">
                            <div className="h-32 bg-amber-100 rounded-lg mb-6 flex items-center justify-center">
                                <span className="text-amber-600 font-bold opacity-50">Illustration {idx + 1}</span>
                            </div>
                            <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                            <p className="text-slate-600 mb-6 flex-grow">{item.desc}</p>
                            <Button variant="primary" className="self-start rounded-full px-6 bg-amber-500 hover:bg-amber-600">
                                Explore <ArrowRightIcon size={16} className="ml-2" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Auth Modal Component ---

const AuthModal = ({ isOpen, initialMode = 'login', onClose }) => {
    const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setMode(initialMode);
    }, [initialMode, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content - Height controlled by padding adjustments below */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col lg:flex-row h-[90vh] lg:h-auto animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition"
                >
                    <XIcon size={20} />
                </button>

                {/* LEFT SIDE: Info Panel */}
                <div className="hidden lg:flex w-5/12 bg-slate-50 p-10 flex-col relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 leading-tight">
                            Discover top ranked universities!
                        </h2>

                        <div className="space-y-6">
                            {[
                                { icon: GlobeIcon, count: "9000+", label: "Universities" },
                                { icon: BookOpenIcon, count: "144567", label: "Programmes" },
                                { icon: CalendarIcon, count: "150+", label: "Events every year" },
                                { icon: MapPinIcon, count: "25", label: "Countries" },
                            ].map((stat, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                                        <stat.icon size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-lg">{stat.count}</div>
                                        <div className="text-slate-500 text-sm">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center relative z-10">
                        <img src="/signup-banner.svg" alt="Sign In Illustration" className="w-48 h-auto" />
                    </div>
                </div>

                {/* RIGHT SIDE: Form Panel - Reduced padding to decrease height */}
                <div className="w-full lg:w-7/12 p-8 lg:p-10 overflow-y-auto">
                    <div className="max-w-md mx-auto">

                        {/* Social Login */}
                        <div className="space-y-3 mb-8">
                            <Button variant="social" className="gap-3 py-3 font-medium">
                                {/* Google Icon SVG */}
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Sign {mode === 'login' ? 'in' : 'up'} with Google
                            </Button>
                            <Button variant="social" className="gap-3 py-3 font-medium text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-50">
                                <div className="bg-blue-600 rounded-full p-0.5 text-white">
                                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                                </div>
                                Sign {mode === 'login' ? 'in' : 'up'} with Facebook
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-slate-500">OR</span>
                            </div>
                        </div>

                        {/* Header Text */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                {mode === 'login' ? 'Sign in' : 'Sign up'}
                            </h3>
                            <p className="text-slate-500">
                                {mode === 'login'
                                    ? 'Enter your registered email id to sign in'
                                    : "What's your name?"
                                }
                            </p>
                        </div>

                        {/* Form Fields */}
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                            {mode === 'signup' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            placeholder="First name*"
                                            className="w-full px-4 py-3 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            placeholder="Last name*"
                                            className="w-full px-4 py-3 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    className="peer w-full px-4 pt-5 pb-2 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label htmlFor="email" className="absolute left-4 top-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
                                    Email*
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="peer w-full px-4 pt-5 pb-2 rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition placeholder-transparent pr-10"
                                    placeholder="Password"
                                />
                                <label htmlFor="password" className="absolute left-4 top-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
                                    {mode === 'login' ? 'Password*' : 'Choose a password*'}
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </button>
                            </div>

                            {mode === 'login' && (
                                <div className="flex justify-end">
                                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                                </div>
                            )}

                            {mode === 'signup' && (
                                <div className="space-y-4 pt-2">
                                    <div>
                                        <p className="text-sm text-slate-700 mb-2">Is your age below 16?</p>
                                        <div className="flex gap-4">
                                            <button className="flex-1 py-2 border border-slate-300 rounded hover:bg-slate-50 text-sm font-medium">Yes</button>
                                            <button className="flex-1 py-2 border border-slate-300 rounded hover:bg-slate-50 text-sm font-medium">No</button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input type="checkbox" className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-xs text-slate-500 group-hover:text-slate-700">I am happy to receive communication and useful resources from QS that are related to my study preferences.</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input type="checkbox" className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-xs text-slate-500 group-hover:text-slate-700">I am happy to receive messages from third parties including institutions relevant to my study preferences.</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            <Button className="w-full py-3.5 text-lg font-bold bg-[#FDC040] hover:bg-[#eeb12f] text-slate-900 mt-4">
                                {mode === 'login' ? 'Sign In' : 'Continue to Sign Up'}
                            </Button>

                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <span className="text-slate-500 text-sm">
                                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            </span>
                            <button
                                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                className="ml-2 text-blue-600 hover:underline font-medium text-sm"
                            >
                                {mode === 'login' ? 'Sign up' : 'Sign in'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

const App = () => {
    const [modalState, setModalState] = useState('closed'); // 'closed', 'login', 'signup'

    return (
        <div className="relative">
            <Dashboard
                onLoginClick={() => setModalState('login')}
                onSignUpClick={() => setModalState('signup')}
            />

            <AuthModal
                isOpen={modalState !== 'closed'}
                initialMode={modalState === 'closed' ? 'login' : modalState}
                onClose={() => setModalState('closed')}
            />
        </div>
    );
};

export default App;