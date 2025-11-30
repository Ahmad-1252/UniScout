"use client";

import React from "react";

/**
 * Multi-variant Button component for UniScout
 * 
 * Variants:
 * - primary (default): Orange gradient button
 * - outline: Bordered button with transparent background
 * - ghost: No border, subtle hover effect
 * - social: For social login buttons
 */
const Button = ({
    children,
    variant = "primary",
    className = "",
    disabled = false,
    type = "button",
    onClick,
    ...props
}) => {
    const baseStyles =
        "px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#D26E1E] text-white hover:bg-[#8C3C0A] shadow-sm hover:shadow-md",
        outline:
            "border border-gray-300 text-gray-700 hover:border-[#D26E1E] hover:text-[#D26E1E] bg-transparent",
        ghost: "text-gray-600 hover:text-[#D26E1E] hover:bg-orange-50 bg-transparent",
        social:
            "w-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
