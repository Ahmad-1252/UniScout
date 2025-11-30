"use client";

import React from "react";
import Button from "../ui/Button";
import { SearchIcon, MenuIcon } from "../icons";

const Navbar = ({ onLoginClick, onSignUpClick }) => {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Links */}
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-[#D26E1E] text-white font-bold p-1 rounded text-lg">
                                QS
                            </div>
                            <span className="font-bold text-xl text-slate-800">
                                TopUniversities
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                            <a href="#" className="hover:text-[#D26E1E] transition-colors">
                                Rankings
                            </a>
                            <a href="#" className="hover:text-[#D26E1E] transition-colors">
                                Discover
                            </a>
                            <a href="#" className="hover:text-[#D26E1E] transition-colors">
                                Events
                            </a>
                            <a href="#" className="hover:text-[#D26E1E] transition-colors">
                                Prepare
                            </a>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="hidden lg:flex rounded-full px-4 py-1.5 text-sm border-gray-200 text-slate-600 hover:text-[#D26E1E] hover:border-[#D26E1E]"
                        >
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
    );
};

export default Navbar;
