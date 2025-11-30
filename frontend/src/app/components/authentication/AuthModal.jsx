"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import Button from "../ui/Button";
import {
    XIcon,
    EyeIcon,
    EyeOffIcon,
    GlobeIcon,
    GoogleIcon,
} from "../icons";

const AuthModal = ({ isOpen, initialMode = "login", onClose }) => {
    const router = useRouter();
    const { login, register, verifyOTP, resendOTP, user, isAuthenticated } = useAuth();
    const { notify } = useNotification();

    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        otp: "",
        isUnder16: null,
        acceptCommunication: false,
        acceptThirdParty: false,
    });

    // Error states
    const [errors, setErrors] = useState({});

    // Reset form when mode changes
    useEffect(() => {
        setMode(initialMode);
        setShowOTP(false);
        setErrors({});
    }, [initialMode, isOpen]);

    // Redirect if authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            onClose();
            // Role-based redirect
            const role = user.role?.toLowerCase();
            if (role === "admin") {
                router.push("/admin/dashboard");
            } else if (role === "student") {
                // Check if student has completed setup
                if (user.setupCompleted) {
                    router.push("/student/dashboard");
                } else {
                    router.push("/student/setup");
                }
            } else {
                // Default redirect for 'user' role
                router.push("/student/setup");
            }
        }
    }, [isAuthenticated, user, router, onClose]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (mode === "signup") {
            if (!formData.firstName) {
                newErrors.firstName = "First name is required";
            }
            if (!formData.lastName) {
                newErrors.lastName = "Last name is required";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            if (mode === "login") {
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    notify.success("Login successful!");
                    // Redirect is handled by useEffect above
                } else {
                    notify.error(result.message || "Login failed");
                }
            } else {
                // Signup
                const result = await register(
                    formData.firstName,
                    formData.lastName,
                    formData.email,
                    formData.password
                );

                if (result.success) {
                    notify.success("Please check your email for the verification code");
                    setShowOTP(true);
                } else {
                    notify.error(result.message || "Registration failed");
                }
            }
        } catch (error) {
            notify.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();

        if (!formData.otp || formData.otp.length !== 4) {
            setErrors({ otp: "Please enter a valid 4-digit code" });
            return;
        }

        setLoading(true);

        try {
            const result = await verifyOTP(formData.email, formData.otp);
            if (result.success) {
                notify.success("Email verified successfully!");
                // Redirect handled by useEffect
            } else {
                notify.error(result.message || "Verification failed");
            }
        } catch (error) {
            notify.error(error.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setLoading(true);
        try {
            const result = await resendOTP(formData.email);
            if (result.success) {
                notify.success("Verification code sent!");
            } else {
                notify.error(result.message || "Failed to resend code");
            }
        } catch (error) {
            notify.error("Failed to resend code");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to Google OAuth endpoint
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003';
        window.location.href = `${apiUrl}/auth/google`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4">
            <div
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 shadow-md transition-all"
                    aria-label="Close modal"
                >
                    <XIcon size={20} />
                </button>

                {/* LEFT SIDE: Branding Panel */}
                <div className="hidden lg:flex lg:w-5/12 amber-horizontal-gradient flex-col justify-between p-10 text-white relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24 blur-xl"></div>

                    {/* Logo */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-white text-[#D26E1E] font-bold p-2 rounded-lg text-xl shadow-lg">
                                QS
                            </div>
                            <span className="font-bold text-2xl drop-shadow-sm">
                                TopUniversities
                            </span>
                        </div>
                        <p className="text-white/90 text-lg leading-relaxed max-w-xs">
                            Join millions of students in finding their perfect university match.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="relative z-10 space-y-6 my-8">
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <GlobeIcon size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-2xl">150M+</p>
                                <p className="text-sm text-white/80">Students Helped</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-xl">🎓</span>
                            </div>
                            <div>
                                <p className="font-bold text-2xl">1,500+</p>
                                <p className="text-sm text-white/80">Universities Ranked</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative circles */}
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
                        {showOTP ? (
                            // OTP Verification Form
                            <>
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-[#8C3C0A] mb-2">
                                        Verify Your Email
                                    </h3>
                                    <p className="text-[#8C3C0A]/70">
                                        We&apos;ve sent a 4-digit code to{" "}
                                        <strong>{formData.email}</strong>
                                    </p>
                                </div>

                                <form className="space-y-4" onSubmit={handleOTPSubmit}>
                                    <div>
                                        <input
                                            type="text"
                                            name="otp"
                                            value={formData.otp}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                                                setFormData((prev) => ({ ...prev, otp: value }));
                                                if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
                                            }}
                                            placeholder="0000"
                                            maxLength={4}
                                            className="w-full px-4 py-4 text-center text-2xl tracking-[0.5em] font-mono rounded border border-gray-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition"
                                        />
                                        {errors.otp && (
                                            <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 text-lg font-bold"
                                    >
                                        {loading ? "Verifying..." : "Verify Email"}
                                    </Button>

                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={handleResendOTP}
                                            disabled={loading}
                                            className="text-[#D26E1E] hover:text-[#8C3C0A] hover:underline font-semibold text-sm"
                                        >
                                            Resend Code
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            // Login/Signup Form
                            <>
                                {/* Social Login Buttons */}
                                <div className="space-y-3 mb-8">
                                    <Button
                                        variant="social"
                                        className="gap-3 py-3 font-medium border-gray-300"
                                        onClick={handleGoogleLogin}
                                    >
                                        <GoogleIcon size={20} />
                                        Sign {mode === "login" ? "in" : "up"} with Google
                                    </Button>
                                    <Button
                                        variant="social"
                                        className="gap-3 py-3 font-medium text-blue-800 border-blue-200 bg-blue-50/50 hover:bg-blue-100"
                                    >
                                        <div className="bg-blue-800 rounded-full p-0.5 text-white">
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                className="w-3 h-3"
                                            >
                                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                            </svg>
                                        </div>
                                        Sign {mode === "login" ? "in" : "up"} with Facebook
                                    </Button>
                                </div>

                                {/* Divider */}
                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-400">OR</span>
                                    </div>
                                </div>

                                {/* Form Header */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-[#8C3C0A] mb-2">
                                        {mode === "login" ? "Sign in" : "Sign up"}
                                    </h3>
                                    <p className="text-[#8C3C0A]/70">
                                        {mode === "login"
                                            ? "Enter your registered email id to sign in"
                                            : "What's your name?"}
                                    </p>
                                </div>

                                {/* Form */}
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {mode === "signup" && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    placeholder="First name*"
                                                    className={`w-full px-4 py-3 rounded border ${errors.firstName
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                        } focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition`}
                                                />
                                                {errors.firstName && (
                                                    <p className="text-xs text-red-500">
                                                        {errors.firstName}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    placeholder="Last name*"
                                                    className={`w-full px-4 py-3 rounded border ${errors.lastName
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                        } focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition`}
                                                />
                                                {errors.lastName && (
                                                    <p className="text-xs text-red-500">
                                                        {errors.lastName}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Email Input */}
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`peer w-full px-4 pt-5 pb-2 rounded border ${errors.email ? "border-red-500" : "border-gray-300"
                                                } focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition placeholder-transparent`}
                                            placeholder="Email"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-4 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#8C3C0A]"
                                        >
                                            Email*
                                        </label>
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`peer w-full px-4 pt-5 pb-2 rounded border ${errors.password ? "border-red-500" : "border-gray-300"
                                                } focus:border-[#8C3C0A] focus:ring-1 focus:ring-[#8C3C0A] outline-none transition placeholder-transparent pr-10`}
                                            placeholder="Password"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-4 top-1 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#8C3C0A]"
                                        >
                                            {mode === "login" ? "Password*" : "Choose a password*"}
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon size={18} />
                                            ) : (
                                                <EyeIcon size={18} />
                                            )}
                                        </button>
                                        {errors.password && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {mode === "login" && (
                                        <div className="flex justify-end">
                                            <a
                                                href="/auth/forgot-password"
                                                className="text-sm text-[#D26E1E] hover:text-[#8C3C0A] hover:underline font-semibold"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    )}

                                    {mode === "signup" && (
                                        <div className="space-y-4 pt-2">
                                            <div>
                                                <p className="text-sm text-[#8C3C0A]/80 mb-2">
                                                    Is your age below 16?
                                                </p>
                                                <div className="flex gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                isUnder16: true,
                                                            }))
                                                        }
                                                        className={`flex-1 py-2 border rounded text-sm font-medium transition ${formData.isUnder16 === true
                                                            ? "border-[#D26E1E] bg-orange-50 text-[#D26E1E]"
                                                            : "border-gray-300 hover:bg-gray-50 text-[#8C3C0A]"
                                                            }`}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                isUnder16: false,
                                                            }))
                                                        }
                                                        className={`flex-1 py-2 border rounded text-sm font-medium transition ${formData.isUnder16 === false
                                                            ? "border-[#D26E1E] bg-orange-50 text-[#D26E1E]"
                                                            : "border-gray-300 hover:bg-gray-50 text-[#8C3C0A]"
                                                            }`}
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="flex items-start gap-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        name="acceptCommunication"
                                                        checked={formData.acceptCommunication}
                                                        onChange={handleInputChange}
                                                        className="mt-1 rounded border-gray-300 text-[#D26E1E] focus:ring-[#D26E1E]"
                                                    />
                                                    <span className="text-xs text-gray-500 group-hover:text-gray-700">
                                                        I am happy to receive communication and useful
                                                        resources from QS that are related to my study
                                                        preferences.
                                                    </span>
                                                </label>
                                                <label className="flex items-start gap-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        name="acceptThirdParty"
                                                        checked={formData.acceptThirdParty}
                                                        onChange={handleInputChange}
                                                        className="mt-1 rounded border-gray-300 text-[#D26E1E] focus:ring-[#D26E1E]"
                                                    />
                                                    <span className="text-xs text-gray-500 group-hover:text-gray-700">
                                                        I am happy to receive messages from third parties
                                                        including institutions relevant to my study
                                                        preferences.
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 text-lg font-bold mt-4"
                                    >
                                        {loading
                                            ? mode === "login"
                                                ? "Signing In..."
                                                : "Creating Account..."
                                            : mode === "login"
                                                ? "Sign In"
                                                : "Continue to Sign Up"}
                                    </Button>
                                </form>

                                {/* Toggle Mode */}
                                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                    <span className="text-gray-500 text-sm">
                                        {mode === "login"
                                            ? "Don't have an account?"
                                            : "Already have an account?"}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setMode(mode === "login" ? "signup" : "login");
                                            setErrors({});
                                        }}
                                        className="ml-2 text-[#D26E1E] hover:text-[#8C3C0A] hover:underline font-bold text-sm transition-colors"
                                    >
                                        {mode === "login" ? "Sign up" : "Sign in"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
