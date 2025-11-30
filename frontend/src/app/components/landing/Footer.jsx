"use client";

import React, { useState } from "react";
import {
    TwitterIcon,
    LinkedinIcon,
    FacebookIcon,
    ArrowRightIcon,
} from "../icons";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Subscribe:", email);
        setEmail("");
    };

    return (
        <footer className="amber-horizontal-gradient text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-white text-[#D26E1E] font-bold p-1.5 rounded text-lg">
                                QS
                            </div>
                            <span className="font-bold text-xl">TopUniversities</span>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            Empowering students worldwide to make informed decisions about
                            their higher education journey since 1990.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Twitter"
                            >
                                <TwitterIcon size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                                aria-label="Facebook"
                            >
                                <FacebookIcon size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Rankings</h4>
                        <ul className="space-y-3 text-white/80 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    World University Rankings
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Subject Rankings
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Sustainability Rankings
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Regional Rankings
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Best Student Cities
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Resources</h4>
                        <ul className="space-y-3 text-white/80 text-sm">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    University Guides
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Scholarship Finder
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Application Tips
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Student Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Events Calendar
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
                        <p className="text-white/80 text-sm mb-4">
                            Get the latest rankings, guides, and tips delivered to your inbox.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:border-white/40 transition-colors text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-white text-[#D26E1E] font-bold rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                            >
                                Subscribe <ArrowRightIcon size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
                        <p>© 2025 QS Quacquarelli Symonds Limited. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Terms of Use
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Cookie Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
