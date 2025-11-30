"use client";

import { useState } from "react";
import {
  Navbar,
  HeroSection,
  RankingsCards,
  TestimonialsSection,
  SupportSection,
  Footer,
} from "./components/landing";
import AuthModal from "./components/authentication/AuthModal";

const LandingPage = () => {
  const [modalState, setModalState] = useState("closed"); // 'closed', 'login', 'signup'

  return (
    <div className="relative">
      <div className="min-h-screen bg-white font-sans text-slate-800">
        {/* Navbar */}
        <Navbar
          onLoginClick={() => setModalState("login")}
          onSignUpClick={() => setModalState("signup")}
        />

        {/* Hero Section */}
        <HeroSection onSignUpClick={() => setModalState("signup")} />

        {/* Rankings Cards */}
        <RankingsCards />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Support Section */}
        <SupportSection />

        {/* Footer */}
        <Footer />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={modalState !== "closed"}
        initialMode={modalState === "closed" ? "login" : modalState}
        onClose={() => setModalState("closed")}
      />
    </div>
  );
};

export default LandingPage;
