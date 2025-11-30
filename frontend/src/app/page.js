'use client';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

// --- Styles for the Custom Gradient ---
const CustomStyles = () => (
  <style>{`
    .amber-horizontal-gradient {
      /* The exact gradient requested */
      background: linear-gradient(
        270deg, 
        rgba(250, 150, 40, 0.6) 0%, 
        rgba(210, 110, 30, 0.8) 50%, 
        rgba(140, 60, 10, 0.95) 100%
      );
      height: 500px;
      width: auto;
      color: white;
      padding: 40px;
      border-radius: 24px;
      /* Shadow follows the direction slightly for depth */
      box-shadow: 10px 0 30px rgba(140, 60, 10, 0.3);
      position: relative;
    }

    /* Mobile adjustment to prevent fixed height breaking layout on small screens */
    @media (max-width: 768px) {
      .amber-horizontal-gradient {
        height: auto;
        min-height: 600px; /* Give it enough room for stacked content */
      }
    }
  `}</style>
);

// --- Shared Helper: Icon Wrapper ---
const IconWrapper = ({ children, size = 24, className = "", ...props }) => (
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
    {...props}
  >
    {children}
  </svg>
);

// --- Icons Definitions ---

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

const ChevronDownIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </IconWrapper>
);

const ChevronLeftIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </IconWrapper>
);

const ChevronRightIcon = (props) => (
  <IconWrapper {...props}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </IconWrapper>
);

const QuoteIcon = (props) => (
  <IconWrapper {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01691 21L5.01691 18C5.01691 16.8954 5.91234 16 7.01691 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01691C5.46462 8 5.01691 8.44772 5.01691 9V11C5.01691 11.5523 4.56919 12 4.01691 12H3.01691V5H13.0169V15C13.0169 18.3137 10.3306 21 7.01691 21H5.01691Z" />
  </IconWrapper>
);

const TwitterIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </IconWrapper>
);

const LinkedinIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </IconWrapper>
);

const FacebookIcon = (props) => (
  <IconWrapper {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </IconWrapper>
);


// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
  const baseStyle = "px-5 py-2.5 rounded-md font-medium transition-all duration-200 flex items-center justify-center";

  // Palette: Using the requested rgba(140, 60, 10, 0.95) which is roughly #8C3C0A
  const variants = {
    primary: "bg-[#8C3C0A] hover:bg-[#6b2d07] text-white shadow-sm border border-transparent",
    outline: "border border-[#8C3C0A] text-[#8C3C0A] hover:bg-orange-50 bg-transparent",
    ghost: "text-[#8C3C0A] hover:text-[#D26E1E] hover:bg-orange-50",
    social: "border border-slate-300 text-slate-700 hover:bg-slate-50 bg-white w-full relative",
    link: "text-[#D26E1E] hover:underline p-0 h-auto font-bold"
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

// --- Course Recommendation Widget (Multi-step) ---

const CourseRecommendationWidget = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    level: '',
    subject: '',
    destination: '',
    startYear: ''
  });

  const updateSelection = (field, value) => {
    setSelections(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinalSubmit = () => {
    console.log("Submitting selections:", selections);
    if (onComplete) onComplete();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mt-8 text-slate-800 transition-all duration-300 min-h-[240px] flex flex-col justify-between">
      <div>
        <div className="text-xs text-[#8C3C0A] font-bold mb-1">
          STEP {currentStep} of 4
        </div>

        {/* --- STEP 1: Study Level --- */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="font-bold text-lg mb-4 text-slate-900">Select your intended study level</div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {['Bachelors', 'Masters', 'MBA', 'PhD'].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    updateSelection('level', level);
                    handleNext();
                  }}
                  className={`border px-1 py-2 rounded text-sm transition-colors font-medium text-center ${selections.level === level
                    ? 'border-[#8C3C0A] bg-orange-50 text-[#8C3C0A] font-bold'
                    : 'border-gray-300 text-slate-600 hover:border-[#8C3C0A] hover:bg-orange-50'
                    }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="flex justify-end items-center h-8"></div>
          </div>
        )}

        {/* --- STEP 2: Subject Interest --- */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="font-bold text-lg mb-4 text-slate-900">Select a subject you're interested in</div>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={selections.subject}
                onChange={(e) => updateSelection('subject', e.target.value)}
                placeholder="Search your subject/specialisation"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none text-sm"
              />
            </div>

            <div className="flex justify-between items-center mt-8">
              <button onClick={handleBack} className="text-[#8C3C0A] text-sm font-medium hover:underline flex items-center gap-1">
                <span className="text-lg">←</span> Back
              </button>
              <Button onClick={handleNext} className="flex items-center gap-2 text-sm font-bold bg-[#8C3C0A] text-white hover:bg-[#6b2d07] border-none">
                Next <ArrowRightIcon size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* --- STEP 3: Destination --- */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="font-bold text-lg mb-4 text-slate-900">Select your study destination</div>

            <div className="flex gap-2 mb-6 flex-wrap">
              {['USA', 'UK', 'Germany'].map((country) => (
                <button
                  key={country}
                  onClick={() => updateSelection('destination', country)}
                  className={`border px-4 py-2 rounded text-sm font-medium transition-colors ${selections.destination === country
                    ? 'border-[#8C3C0A] bg-orange-50 text-[#8C3C0A] font-bold'
                    : 'border-gray-300 text-slate-700 hover:border-[#8C3C0A] hover:bg-orange-50'
                    }`}
                >
                  {country}
                </button>
              ))}
              <button className="border border-gray-300 px-3 py-2 rounded hover:border-[#8C3C0A] hover:bg-orange-50 text-sm text-slate-700 font-medium transition-colors flex items-center gap-1">
                More <ChevronDownIcon size={14} />
              </button>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button onClick={handleBack} className="text-[#8C3C0A] text-sm font-medium hover:underline flex items-center gap-1">
                <span className="text-lg">←</span> Back
              </button>
              <Button onClick={handleNext} className="flex items-center gap-2 text-sm font-bold bg-[#8C3C0A] text-white hover:bg-[#6b2d07] border-none">
                Next <ArrowRightIcon size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* --- STEP 4: Start Year --- */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="font-bold text-lg mb-4 text-slate-900">Select your study start year</div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {['Spring 2026', 'Fall 2026', 'Spring 2027'].map((year) => (
                <button
                  key={year}
                  onClick={() => updateSelection('startYear', year)}
                  className={`border px-3 py-2 rounded text-sm transition-colors ${selections.startYear === year
                    ? 'border-[#8C3C0A] bg-orange-50 text-[#8C3C0A] font-bold'
                    : 'border-gray-200 text-slate-600 hover:border-[#8C3C0A] hover:bg-orange-50'
                    }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button onClick={handleBack} className="text-[#8C3C0A] text-sm font-medium hover:underline flex items-center gap-1">
                <span className="text-lg">←</span> Back
              </button>
              {/* Action Button calls handleFinalSubmit */}
              <Button
                onClick={handleFinalSubmit}
                className="flex items-center gap-2 text-sm font-bold bg-[#8C3C0A] text-white hover:bg-[#6b2d07]"
              >
                View results <ArrowRightIcon size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Testimonials Section Component (Smooth Sliding) ---

const TestimonialsSection = () => {
  // Updated data with 6 entries
  const testimonials = [
    {
      id: 1,
      name: "Pranay Kasat",
      course: "Master of Science in Global Logistics",
      uni: "Arizona State University",
      quote: "My counsellor's assistance at every step has been invaluable, and I cannot thank him enough for making my dreams a reality.",
      initials: "PK",
    },
    {
      id: 2,
      name: "Bibil Jose",
      course: "BSc in Mechanical Engineering",
      uni: "Arizona State University",
      quote: "QS were a huge help from the very beginning. When I felt overwhelmed, it was my counsellor who helped me to clarify my goals.",
      initials: "BJ",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      course: "MA in Digital Marketing",
      uni: "University of Manchester",
      quote: "The guidance I received on scholarship applications was a game-changer. I wouldn't be studying in the UK without their support.",
      initials: "SJ",
    },
    {
      id: 4,
      name: "Ahmed Al-Fayed",
      course: "MBA",
      uni: "University of Toronto",
      quote: "From visa interviews to accommodation, the team supported me through every hurdle. Truly a comprehensive service.",
      initials: "AA",
    },
    {
      id: 5,
      name: "Maria Gonzalez",
      course: "PhD in Biotechnology",
      uni: "Technical University of Munich",
      quote: "Finding a PhD position can be daunted, but the personalized counseling made the process smooth and stress-free.",
      initials: "MG",
    },
    {
      id: 6,
      name: "Chen Wei",
      course: "Bachelor of Computer Science",
      uni: "National University of Singapore",
      quote: "They helped me shortlist universities that perfectly matched my academic profile and career aspirations.",
      initials: "CW",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-[#F0F4F8] py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">What students say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear how we've supported students like you to find their perfect study destination
          </p>
        </div>

        <div className="relative h-[450px] flex justify-center items-center max-w-6xl mx-auto">

          {/* Nav Left */}
          <button
            onClick={handlePrev}
            className="hidden md:flex p-3 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 text-slate-600 absolute left-0 z-30 transition-colors"
          >
            <ChevronLeftIcon size={20} />
          </button>

          {/* Smooth Sliding Container */}
          <div className="relative w-full h-full flex justify-center items-center">
            {testimonials.map((student, index) => {
              // Calculate position relative to active index
              const length = testimonials.length;
              let offset = (index - activeIndex + length) % length;
              // Normalize offset to find shortest path (-1, 0, 1)
              if (offset > length / 2) offset -= length;

              // Determine styles based on offset
              let wrapperClass = "absolute transition-all duration-500 ease-in-out w-full md:w-1/3 h-[400px] p-8 rounded-2xl shadow-md flex flex-col";
              let content = null;

              if (offset === 0) {
                // CENTER CARD (Active) - White, Big, Photo Layout
                wrapperClass += " z-20 bg-white border border-slate-100 transform scale-100 opacity-100 translate-x-0 h-[450px] shadow-xl";
                content = (
                  <>
                    <div className="h-1/2 bg-slate-200 relative -mx-8 -mt-8 mb-6 rounded-t-2xl overflow-hidden">
                      <div className="absolute top-4 left-4 bg-slate-900 text-white p-1.5 rounded">
                        <IconWrapper size={16}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></IconWrapper>
                      </div>
                      <div className="w-full h-full bg-gradient-to-t from-slate-400 to-slate-300 flex items-end justify-center">
                        <span className="mb-4 text-slate-600 font-bold opacity-50 flex flex-col items-center">
                          <span className="text-3xl mb-2">{student.initials}</span>
                          Student Photo
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow flex flex-col justify-center text-center">
                      <h3 className="font-bold text-xl text-slate-900 mb-2">{student.name}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{student.course}</p>
                      <p className="text-xs text-[#8C3C0A] font-bold uppercase mt-2">{student.uni}</p>
                    </div>
                  </>
                );
              } else if (offset === -1) {
                // LEFT CARD - Use new rgba(140, 60, 10, 0.95)
                wrapperClass += " z-10 bg-[#8C3C0A] text-white transform scale-95 opacity-90 -translate-x-full lg:-translate-x-[110%]";
                content = (
                  <>
                    <QuoteIcon size={32} className="text-white mb-4 opacity-50" />
                    <p className="text-sm font-medium leading-relaxed mb-6 flex-grow">{student.quote}</p>
                    <QuoteIcon size={24} className="text-white opacity-50 self-end mb-4 transform rotate-180" />
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center text-xs text-white font-bold bg-white/20">{student.initials}</div>
                      <div>
                        <p className="font-bold text-sm">{student.name}</p>
                        <p className="text-[10px] text-white opacity-80 uppercase">{student.uni}</p>
                      </div>
                    </div>
                  </>
                );
              } else if (offset === 1) {
                // RIGHT CARD - Use new rgba(140, 60, 10, 0.95)
                wrapperClass += " z-10 bg-[#8C3C0A] text-white transform scale-95 opacity-90 translate-x-full lg:translate-x-[110%]";
                content = (
                  <>
                    <QuoteIcon size={32} className="text-white mb-4 opacity-50" />
                    <p className="text-sm font-medium leading-relaxed mb-6 flex-grow">{student.quote}</p>
                    <QuoteIcon size={24} className="text-white opacity-50 self-end mb-4 transform rotate-180" />
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center text-xs text-white font-bold bg-white/20">{student.initials}</div>
                      <div>
                        <p className="font-bold text-sm">{student.name}</p>
                        <p className="text-[10px] text-white opacity-80 uppercase">{student.uni}</p>
                      </div>
                    </div>
                  </>
                );
              } else {
                // HIDDEN CARDS
                wrapperClass += " z-0 opacity-0 scale-75 bg-[#8C3C0A]";
                content = null;
              }

              return (
                <div key={student.id} className={wrapperClass}>
                  {content}
                </div>
              );
            })}
          </div>

          {/* Nav Right */}
          <button
            onClick={handleNext}
            className="hidden md:flex p-3 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 text-slate-600 absolute right-0 z-30 transition-colors"
          >
            <ChevronRightIcon size={20} />
          </button>

        </div>

        {/* Dots Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-[#002147] w-4' : 'bg-slate-300'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Support Section Component (UPDATED with 3 sections + ANIMATION + NEW COLORS) ---

const SupportSection = () => {
  const sectionRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight / 2;
      const val = startOffset - rect.top;
      const maxHeight = rect.height;

      setLineHeight(Math.max(0, Math.min(val, maxHeight)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="bg-white py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How QS can support you</h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            We're here to support you through all stages of the university journey; whether its researching institutions, navigating admissions or submitting your application.
          </p>
        </div>

        {/* Content Layout */}
        <div className="relative">

          {/* Timeline Center Line (Visible on Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -ml-[2px] w-1 bg-blue-700/20 rounded-full">
            {/* Animated Fill Line */}
            <div
              className="w-full bg-[#1d4ed8] rounded-full transition-all duration-75 ease-linear"
              style={{ height: `${lineHeight}px` }}
            ></div>
          </div>

          {/* --- Section 1: Find the right course --- */}
          <div className="flex flex-col md:flex-row items-center justify-center relative mb-20">
            {/* Left: Illustration with uploaded image */}
            <div className="w-full md:w-5/12 flex justify-end md:pr-12 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src="/Section/sec-1.png"
                  alt="Find course illustration"
                  className="max-w-full h-auto"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>

            {/* Center Dot */}
            <div className={`hidden md:block absolute left-1/2 top-10 -ml-[6px] z-10 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${lineHeight > 100 ? 'bg-[#1d4ed8]' : 'bg-blue-700'}`}></div>

            {/* Right: Card */}
            <div className="w-full md:w-5/12 md:pl-12">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm relative">
                {/* Mobile Timeline Connector */}
                <div className="md:hidden w-1 h-10 bg-blue-700/20 absolute -top-10 left-1/2 -ml-0.5"></div>
                <div className="md:hidden w-4 h-4 rounded-full bg-blue-700 border-4 border-white shadow-sm absolute -top-4 left-1/2 -ml-2"></div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">Find the right course for you</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Our course matching tool features thousands of programmes and uses your personal study preferences to find the right course for you.
                </p>
                <Button className="bg-[#8C3C0A] text-white hover:bg-[#6b2d07] border-none font-bold w-full sm:w-auto flex justify-between sm:justify-center">
                  Find Your Course <ArrowRightIcon size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* --- Section 2: Compare universities --- */}
          <div className="flex flex-col md:flex-row items-center justify-center relative mb-20">
            {/* Left: Card (Desktop Order: Card on Left) */}
            <div className="w-full md:w-5/12 order-2 md:order-1 md:pr-12 md:text-right flex flex-col items-end">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm relative text-left w-full">
                {/* Mobile Timeline Connector */}
                <div className="md:hidden w-1 h-10 bg-blue-700/20 absolute -top-10 left-1/2 -ml-0.5"></div>
                <div className="md:hidden w-4 h-4 rounded-full bg-blue-700 border-4 border-white shadow-sm absolute -top-4 left-1/2 -ml-2"></div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">Easily compare universities with QS rankings</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Filter our rankings by region or subject to compare university performance in factors that matter to you including reputation, employability and sustainability.
                </p>
                <Button className="bg-[#8C3C0A] text-white hover:bg-[#6b2d07] border-none font-bold w-full sm:w-auto flex justify-between sm:justify-center">
                  Explore Rankings <ArrowRightIcon size={18} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Center Dot */}
            <div className={`hidden md:block absolute left-1/2 top-10 -ml-[6px] z-10 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${lineHeight > 450 ? 'bg-[#1d4ed8]' : 'bg-blue-700'}`}></div>

            {/* Right: Image (Desktop Order: Image on Right) */}
            <div className="w-full md:w-5/12 order-1 md:order-2 flex justify-start md:pl-12 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src="/Section/sec-2.png"
                  alt="Compare rankings illustration"
                  className="max-w-full h-auto"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>
          </div>

          {/* --- Section 3: Personalized Advice --- */}
          <div className="flex flex-col md:flex-row items-center justify-center relative mb-20">
            {/* Left: Illustration with uploaded image */}
            <div className="w-full md:w-5/12 flex justify-end md:pr-12 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src="/Section/sec-3.png"
                  alt="Personalized advice illustration"
                  className="max-w-full h-auto"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>

            {/* Center Dot */}
            <div className={`hidden md:block absolute left-1/2 top-10 -ml-[6px] z-10 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${lineHeight > 800 ? 'bg-[#1d4ed8]' : 'bg-blue-700'}`}></div>

            {/* Right: Card */}
            <div className="w-full md:w-5/12 md:pl-12">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm relative">
                {/* Mobile Timeline Connector */}
                <div className="md:hidden w-1 h-10 bg-blue-700/20 absolute -top-10 left-1/2 -ml-0.5"></div>
                <div className="md:hidden w-4 h-4 rounded-full bg-blue-700 border-4 border-white shadow-sm absolute -top-4 left-1/2 -ml-2"></div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized advice and support with your university application</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Our friendly QS counsellors have helped to submit over 13,000 applications and will personally guide you through to enrolment on your chosen course.
                </p>
                <Button className="bg-[#8C3C0A] text-white hover:bg-[#6b2d07] border-none font-bold w-full sm:w-auto flex justify-between sm:justify-center">
                  Speak To A Counsellor <ArrowRightIcon size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* --- Section 4: Financial Support (NEW) --- */}
          <div className="flex flex-col md:flex-row items-center justify-center relative mb-20">
            {/* Left: Card (Desktop Order: Card on Left) */}
            <div className="w-full md:w-5/12 order-2 md:order-1 md:pr-12 md:text-right flex flex-col items-end">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm relative text-left w-full">
                {/* Mobile Timeline Connector */}
                <div className="md:hidden w-1 h-10 bg-blue-700/20 absolute -top-10 left-1/2 -ml-0.5"></div>
                <div className="md:hidden w-4 h-4 rounded-full bg-blue-700 border-4 border-white shadow-sm absolute -top-4 left-1/2 -ml-2"></div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">Looking for financial support?</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Find out more about the US$111m available through QS and partner scholarships.
                </p>
                <Button className="bg-[#8C3C0A] text-white hover:bg-[#6b2d07] border-none font-bold w-full sm:w-auto flex justify-between sm:justify-center">
                  Explore Our Scholarships <ArrowRightIcon size={18} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Center Dot */}
            <div className={`hidden md:block absolute left-1/2 top-10 -ml-[6px] z-10 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${lineHeight > 1150 ? 'bg-[#1d4ed8]' : 'bg-blue-700'}`}></div>

            {/* Right: Image (Desktop Order: Image on Right) */}
            <div className="w-full md:w-5/12 order-1 md:order-2 flex justify-start md:pl-12 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src="/Section/sec-4.png"
                  alt="Financial Support illustration"
                  className="max-w-full h-auto"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>
          </div>

          {/* --- Section 5: Advice on where to study (NEW) --- */}
          <div className="flex flex-col md:flex-row items-center justify-center relative mb-20">
            {/* Left: Illustration with uploaded image */}
            <div className="w-full md:w-5/12 flex justify-end md:pr-12 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src="/Section/sec-5.png"
                  alt="Advice illustration"
                  className="max-w-full h-auto"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>

            {/* Center Dot */}
            <div className={`hidden md:block absolute left-1/2 top-10 -ml-[6px] z-10 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${lineHeight > 1500 ? 'bg-[#1d4ed8]' : 'bg-blue-700'}`}></div>

            {/* Right: Card */}
            <div className="w-full md:w-5/12 md:pl-12">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm relative">
                {/* Mobile Timeline Connector */}
                <div className="md:hidden w-1 h-10 bg-blue-700/20 absolute -top-10 left-1/2 -ml-0.5"></div>
                <div className="md:hidden w-4 h-4 rounded-full bg-blue-700 border-4 border-white shadow-sm absolute -top-4 left-1/2 -ml-2"></div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">Need more advice on where to study?</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Learn more about student experiences at universities in the world's most incredible cities and get advice on visas, finding accommodation and fun things to do once you've arrived.
                </p>
                <Button className="bg-[#8C3C0A] text-white hover:bg-[#6b2d07] border-none font-bold w-full sm:w-auto flex justify-between sm:justify-center">
                  Read More <ArrowRightIcon size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* --- Section 6: Meet representatives (NEW) --- */}
          <div className="flex flex-col md:flex-row items-center justify-center relative">
            {/* Left: Card (Desktop Order: Card on Left) */}
            <div className="w-full md:w-5/12 order-2 md:order-1 md:pr-12 md:text-right flex flex-col items-end">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm relative text-left w-full">
                {/* Mobile Timeline Connector */}
                <div className="md:hidden w-1 h-10 bg-blue-700/20 absolute -top-10 left-1/2 -ml-0.5"></div>
                <div className="md:hidden w-4 h-4 rounded-full bg-blue-700 border-4 border-white shadow-sm absolute -top-4 left-1/2 -ml-2"></div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">Meet university representatives in person</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Create connections and finalize your shortlist by speaking directly with staff at our global events.
                </p>
                <Button className="bg-[#8C3C0A] text-white hover:bg-[#6b2d07] border-none font-bold w-full sm:w-auto flex justify-between sm:justify-center">
                  Find An Event Near You <ArrowRightIcon size={18} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Center Dot */}
            <div className={`hidden md:block absolute left-1/2 top-10 -ml-[6px] z-10 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-colors duration-300 ${lineHeight > 1850 ? 'bg-[#1d4ed8]' : 'bg-blue-700'}`}></div>

            {/* Right: Image (Desktop Order: Image on Right) */}
            <div className="w-full md:w-5/12 order-1 md:order-2 flex justify-start md:pl-12 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src="/Section/sec-6.png"
                  alt="Meet Reps illustration"
                  className="max-w-full h-auto"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Footer Component ---

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-[#D26E1E] text-white font-bold p-1 rounded text-lg">QS</div>
              <span className="font-bold text-xl text-slate-800">TopUniversities</span>
            </div>
            <p className="text-slate-500 mb-8 max-w-sm leading-relaxed text-sm">
              Making higher education accessible to everyone through transparent data, trusted rankings, and AI-powered guidance technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#D26E1E] hover:bg-orange-50 transition-colors">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#D26E1E] hover:bg-orange-50 transition-colors">
                <LinkedinIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#D26E1E] hover:bg-orange-50 transition-colors">
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-[#D26E1E] transition-colors">Rankings</a></li>
              <li><a href="#" className="hover:text-[#D26E1E] transition-colors">Course Finder</a></li>
              <li><a href="#" className="hover:text-[#D26E1E] transition-colors">University Profiles</a></li>
              <li><a href="#" className="hover:text-[#D26E1E] transition-colors">QS Events</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-[#D26E1E] transition-colors">Student Blog</a></li>
              <li><a href="#" className="hover:text-[#D26E1E] transition-colors">Scholarship Guide</a></li>
              <li><a href="#" className="hover:text-[#D26E1E] transition-colors">Visa Help</a></li>
              <li><a href="#" className="hover:text-[#D26E1E] transition-colors">Study Destinations</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-900 mb-6">Stay Updated</h4>
            <p className="text-sm text-slate-500 mb-4">Subscribe to our newsletter for the latest study abroad news and scholarship alerts.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-50 border border-slate-200 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#D26E1E]"
              />
              <Button className="px-4 py-2 text-sm font-bold bg-[#8C3C0A] hover:bg-[#6b2d07]">
                Subscribe
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-400 text-sm">
            © 2026 QS Quacquarelli Symonds Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-medium text-slate-500">All Systems Operational</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-[#D26E1E]">Privacy</a>
              <a href="#" className="hover:text-[#D26E1E]">Terms</a>
              <a href="#" className="hover:text-[#D26E1E]">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#8C3C0A]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col lg:flex-row h-[90vh] lg:h-auto animate-in fade-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition"
        >
          <XIcon size={20} />
        </button>

        {/* LEFT SIDE: Info Panel */}
        <div className="hidden lg:flex w-5/12 bg-orange-50 p-10 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-[#8C3C0A] mb-8 leading-tight">
              Discover top ranked universities!
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D26E1E]">
                  <GlobeIcon size={20} />
                </div>
                <div>
                  <div className="font-bold text-[#8C3C0A] text-lg">9000+</div>
                  <div className="text-[#8C3C0A]/70 text-sm">Universities</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D26E1E]">
                  <BookOpenIcon size={20} />
                </div>
                <div>
                  <div className="font-bold text-[#8C3C0A] text-lg">144567</div>
                  <div className="text-[#8C3C0A]/70 text-sm">Programmes</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D26E1E]">
                  <CalendarIcon size={20} />
                </div>
                <div>
                  <div className="font-bold text-[#8C3C0A] text-lg">150+</div>
                  <div className="text-[#8C3C0A]/70 text-sm">Events every year</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D26E1E]">
                  <MapPinIcon size={20} />
                </div>
                <div>
                  <div className="font-bold text-[#8C3C0A] text-lg">25</div>
                  <div className="text-[#8C3C0A]/70 text-sm">Countries</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex justify-center">
            <div className="relative">
              <div className="flex -space-x-4 justify-center">
                <div className="w-12 h-12 rounded-full bg-[#FA9628] border-2 border-white"></div>
                <div className="w-16 h-16 rounded-full bg-[#8C3C0A] border-2 border-white -mt-4 relative z-10"></div>
                <div className="w-12 h-12 rounded-full bg-[#D26E1E] border-2 border-white"></div>
              </div>
              <div className="w-32 h-32 bg-[#8C3C0A] rounded-full mx-auto -mt-6 flex items-center justify-center border-4 border-white relative z-20">
                <GlobeIcon size={64} className="text-white opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form Panel */}
        <div className="w-full lg:w-7/12 p-8 lg:p-10 overflow-y-auto">
          <div className="max-w-md mx-auto">

            <div className="space-y-3 mb-8">
              <Button variant="social" className="gap-3 py-3 font-medium border-gray-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign {mode === 'login' ? 'in' : 'up'} with Google
              </Button>
              <Button variant="social" className="gap-3 py-3 font-medium text-blue-800 border-blue-200 bg-blue-50/50 hover:bg-blue-100">
                <div className="bg-blue-800 rounded-full p-0.5 text-white">
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </div>
                Sign {mode === 'login' ? 'in' : 'up'} with Facebook
              </Button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400">OR</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#8C3C0A] mb-2">
                {mode === 'login' ? 'Sign in' : 'Sign up'}
              </h3>
              <p className="text-[#8C3C0A]/70">
                {mode === 'login'
                  ? 'Enter your registered email id to sign in'
                  : "What's your name?"
                }
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="First name*"
                      className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Last name*"
                      className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition"
                    />
                  </div>
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="peer w-full px-4 pt-5 pb-2 rounded border border-gray-300 focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition placeholder-transparent"
                  placeholder="Email"
                />
                <label htmlFor="email" className="absolute left-4 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#8C3C0A]">
                  Email*
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="peer w-full px-4 pt-5 pb-2 rounded border border-gray-300 focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition placeholder-transparent pr-10"
                  placeholder="Password"
                />
                <label htmlFor="password" className="absolute left-4 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#8C3C0A]">
                  {mode === 'login' ? 'Password*' : 'Choose a password*'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>

              {mode === 'login' && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-[#D26E1E] hover:text-[#8C3C0A] hover:underline font-semibold">Forgot password?</a>
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="text-sm text-[#8C3C0A]/80 mb-2">Is your age below 16?</p>
                    <div className="flex gap-4">
                      <button className="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-[#8C3C0A]">Yes</button>
                      <button className="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-[#8C3C0A]">No</button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="mt-1 rounded border-gray-300 text-[#D26E1E] focus:ring-[#D26E1E]" />
                      <span className="text-xs text-gray-500 group-hover:text-gray-700">I am happy to receive communication and useful resources from QS that are related to my study preferences.</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="mt-1 rounded border-gray-300 text-[#D26E1E] focus:ring-[#D26E1E]" />
                      <span className="text-xs text-gray-500 group-hover:text-gray-700">I am happy to receive messages from third parties including institutions relevant to my study preferences.</span>
                    </label>
                  </div>
                </div>
              )}

              <Button className="w-full py-3.5 text-lg font-bold mt-4">
                {mode === 'login' ? 'Sign In' : 'Continue to Sign Up'}
              </Button>

            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <span className="text-gray-500 text-sm">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              </span>
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-[#D26E1E] hover:text-[#8C3C0A] hover:underline font-bold text-sm transition-colors"
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

// --- Dashboard Component ---

const Dashboard = ({ onLoginClick, onSignUpClick }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Links */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer">
                {/* Updated Logo Color to match Amber theme */}
                <div className="bg-[#D26E1E] text-white font-bold p-1 rounded text-lg">QS</div>
                <span className="font-bold text-xl text-slate-800">TopUniversities</span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <a href="#" className="hover:text-[#D26E1E] transition-colors">Rankings</a>
                <a href="#" className="hover:text-[#D26E1E] transition-colors">Discover</a>
                <a href="#" className="hover:text-[#D26E1E] transition-colors">Events</a>
                <a href="#" className="hover:text-[#D26E1E] transition-colors">Prepare</a>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Button variant="outline" className="hidden lg:flex rounded-full px-4 py-1.5 text-sm border-gray-200 text-slate-600 hover:text-[#D26E1E] hover:border-[#D26E1E]">
                Free Counselling
              </Button>
              <button className="p-2 text-slate-600 hover:bg-orange-50 rounded-full">
                <SearchIcon size={20} />
              </button>
              <button
                onClick={onLoginClick}
                className="hidden sm:block text-slate-700 font-bold hover:text-[#D26E1E] transition-colors"
              >
                Login
              </button>
              <Button onClick={onSignUpClick} className="hidden sm:flex font-bold">
                Sign Up
              </Button>
              <button className="md:hidden p-2 text-slate-600">
                <MenuIcon size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Responsive Gradient Card 
        - Mobile: Vertical Gradient (to-b) + Less Padding (p-6)
        - Desktop: Horizontal Gradient (to-r) + More Padding (p-16)
    */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl shadow-orange-900/20 
        bg-gradient-to-b lg:bg-gradient-to-r 
        from-[rgba(250,150,40,0.6)] via-[rgba(210,110,30,0.8)] to-[rgba(140,60,10,0.95)]
        p-6 sm:p-10 lg:p-16">

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
                  <CheckCircleIcon size={20} className="text-white shrink-0 mt-0.5 lg:mt-0" />
                  <span>Get personalised admission support for top universities</span>
                </div>
                <div className="flex items-start lg:items-center gap-3 justify-center lg:justify-start">
                  <CheckCircleIcon size={20} className="text-white shrink-0 mt-0.5 lg:mt-0" />
                  <span>Get academic details from universities in just a few clicks.</span>
                </div>
              </div>

              {/* Widget Container */}
              <div className="relative mt-8 max-w-md mx-auto lg:mx-0 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <CourseRecommendationWidget onComplete={onSignUpClick} />
              </div>
            </div>

            {/* Right Hero Illustration 
                - Mobile: Visible, Centered, Smaller (max-w-xs)
                - Desktop: Full size (lg:max-w-lg)
            */}
            <div className="w-full lg:w-1/2 flex justify-center items-center relative mt-4 lg:mt-0">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg transition-transform duration-500 hover:scale-105">
                {/* Optional: Glow effect behind the rocket */}
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

      {/* Cards Section - Enhanced & Real Data */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Rankings & Reports</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1: World Rankings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-6 right-6 bg-orange-100 text-[#D26E1E] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide z-10">
              Flagship
            </div>

            {/* Visual */}
            <div className="h-40 w-full rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 mb-6 flex items-center justify-center relative overflow-hidden">
              <GlobeIcon size={96} className="text-[#D26E1E] opacity-10 absolute -bottom-6 -right-6" />
              <div className="bg-white p-4 rounded-full shadow-sm z-10 text-[#D26E1E]">
                <GlobeIcon size={32} />
              </div>
            </div>

            <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-[#D26E1E] transition-colors">
              QS World University Rankings 2026
            </h3>
            <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
              The world's most trusted university ranking. Compare the top 1,500 institutions based on academic reputation, employer reputation, and research impact.
            </p>

            <Button variant="primary" className="self-start rounded-full px-6 font-bold w-full flex justify-between items-center group-hover:bg-[#8C3C0A]">
              Explore Rankings <ArrowRightIcon size={16} />
            </Button>
          </div>

          {/* Card 2: Subject Rankings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">

            {/* Visual */}
            <div className="h-40 w-full rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 mb-6 flex items-center justify-center relative overflow-hidden">
              <BookOpenIcon size={96} className="text-[#D26E1E] opacity-10 absolute -bottom-6 -right-6" />
              <div className="bg-white p-4 rounded-full shadow-sm z-10 text-[#D26E1E]">
                <BookOpenIcon size={32} />
              </div>
            </div>

            <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-[#D26E1E] transition-colors">
              QS World University Rankings by Subject 2025
            </h3>
            <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
              Find the top universities for your field. Covering 55 subjects across 5 broad faculty areas including Engineering, Medicine, and Law.
            </p>

            <Button variant="primary" className="self-start rounded-full px-6 font-bold w-full flex justify-between items-center group-hover:bg-[#8C3C0A]">
              View Subjects <ArrowRightIcon size={16} />
            </Button>
          </div>

          {/* Card 3: Sustainability */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">

            {/* Visual */}
            <div className="h-40 w-full rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 mb-6 flex items-center justify-center relative overflow-hidden">
              <MapPinIcon size={96} className="text-[#D26E1E] opacity-10 absolute -bottom-6 -right-6" />
              <div className="bg-white p-4 rounded-full shadow-sm z-10 text-[#D26E1E]">
                <MapPinIcon size={32} />
              </div>
            </div>

            <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-[#D26E1E] transition-colors">
              QS Sustainability Rankings 2026
            </h3>
            <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
              Discover universities leading the way in social and environmental impact. See who is committed to a more sustainable future.
            </p>

            <Button variant="primary" className="self-start rounded-full px-6 font-bold w-full flex justify-between items-center group-hover:bg-[#8C3C0A]">
              See Impact <ArrowRightIcon size={16} />
            </Button>
          </div>

        </div>
      </div>

      {/* NEW SECTION: Testimonials */}
      <TestimonialsSection />

      {/* NEW SECTION: Support Section */}
      <SupportSection />

      {/* NEW SECTION: Footer */}
      <Footer />

    </div>
  );
};

const App = () => {
  const [modalState, setModalState] = useState('closed'); // 'closed', 'login', 'signup'

  return (
    <div className="relative">
      <CustomStyles />
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