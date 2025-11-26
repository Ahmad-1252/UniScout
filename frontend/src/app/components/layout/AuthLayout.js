"use client";

import Link from "next/link";
import { GraduationCap, Sparkles } from "lucide-react";

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* --- 1. Background Effects --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full -z-10 opacity-50 mix-blend-multiply" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-violet-400/20 blur-[100px] rounded-full -z-10 opacity-50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      {/* --- 2. Global Header (The ONLY Logo) --- */}
      <div className="mb-8 text-center animate-fade-in-up">
        <Link href="/" className="inline-flex flex-col items-center group">
          <div className="flex items-center justify-center gap-3 mb-3 transition-transform duration-300 group-hover:scale-105">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-600/20">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-slate-900 tracking-tight">UniFinder</span>
          </div>
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-semibold text-slate-600">Official Education Partner</span>
          </div>
        </Link>
      </div>

      {/* --- 3. The Card Container (Injected Content) --- */}
      <div className="w-full max-w-[440px] relative z-10">
        {children}
      </div>

      {/* --- 4. Global Legal Footer --- */}
      <div className="mt-8 text-center max-w-sm mx-auto">
        <p className="text-xs text-slate-400 leading-relaxed">
          Protected by reCAPTCHA and subject to the Google
          <a href="#" className="underline hover:text-blue-600 mx-1 transition-colors">Privacy Policy</a>
          and
          <a href="#" className="underline hover:text-blue-600 mx-1 transition-colors">Terms of Service</a>.
        </p>
      </div>
    </div>
  );
};