import React from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { MdOutlineCastForEducation, MdEventNote, MdPublic } from 'react-icons/md';
import { LiaUniversitySolid } from "react-icons/lia";
import { FiEyeOff, FiX } from 'react-icons/fi';

const LoginPage = () => {
    return (
        // Main Container - Full screen height, flex layout for side-by-side
        <div className="min-h-screen flex items-stretch bg-white dark:bg-gray-950">

            {/* ================= Left Sidebar (Info Section) ================= */}
            {/* Hidden on small screens, visible on large (lg) screens */}
            <div className="hidden lg:flex w-1/2 bg-slate-100 dark:bg-slate-900 relative overflow-hidden flex-col justify-between p-10 xl:p-16">

                {/* Top Content */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 leading-tight">
                        Discover top ranked universities!
                    </h1>

                    <div className="space-y-8">
                        {/* Stat Item 1 */}
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                <MdPublic className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">9000+</p>
                                <p className="text-gray-600 dark:text-gray-400">Universities</p>
                            </div>
                        </div>

                        {/* Stat Item 2 */}
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                <LiaUniversitySolid className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">144567</p>
                                <p className="text-gray-600 dark:text-gray-400">Programmes</p>
                            </div>
                        </div>

                        {/* Stat Item 3 */}
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                <MdEventNote className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">150+</p>
                                <p className="text-gray-600 dark:text-gray-400">Events every year</p>
                            </div>
                        </div>

                        {/* Stat Item 4 */}
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                <MdOutlineCastForEducation className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900 dark:text-white">25</p>
                                <p className="text-gray-600 dark:text-gray-400">Countries</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Illustration Placeholder */}
                <div className="mt-10 relative h-64 w-full flex items-end justify-center">
                    {/* NOTE: In a real project, replace this div with an <Image /> component 
              pointing to your actual illustration SVG/PNG assets.
           */}
                    <div className="text-center text-gray-400 dark:text-gray-600 italic">
                        [Illustration of diverse people and globe goes here]
                        {/* To mimic the image roughly with CSS (optional placeholder) */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gray-300 dark:bg-gray-700 rounded-t-full opacity-50 z-0"></div>
                    </div>
                </div>
            </div>


            {/* ================= Right Side (Login Form) ================= */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">

                {/* Close Button (Top Right) */}
                <button className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <FiX size={20} />
                </button>

                <div className="w-full max-w-md space-y-8">

                    {/* Social Login Buttons */}
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center py-2.5 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                            <FcGoogle className="w-6 h-6 mr-3" />
                            Sign in with Google
                        </button>
                        <button className="w-full flex items-center justify-center py-2.5 border border-blue-600 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-gray-900 transition font-medium">
                            <FaFacebookF className="w-5 h-5 mr-3" />
                            Sign in with Facebook
                        </button>
                    </div>

                    {/* Legal Text */}
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 px-4">
                        By signing up I agree to share my data and according to{' '}
                        <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">User agreement</Link>,{' '}
                        <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie policy</Link> and{' '}
                        <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy policy</Link>.
                    </p>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">OR</span>
                        </div>
                    </div>

                    {/* Form Header */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Sign in</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Enter your registered email id to sign in or{' '}
                            <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up</Link> to get started.
                        </p>
                    </div>

                    {/* Actual Form Inputs */}
                    <form className="space-y-6">

                        {/* Email Input with Floating Label */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="email"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Email*
                            </label>
                        </div>

                        {/* Password Input with Floating Label & Eye Icon */}
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                className="block px-3.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-10"
                                placeholder=" "
                            />
                            <label
                                htmlFor="password"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Password*
                            </label>
                            <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <FiEyeOff className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex justify-end">
                            <Link href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        {/* Using amber-300/400 to match the yellowish-gold color in the design */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded text-lg font-medium text-amber-900 bg-amber-300 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition dark:ring-offset-gray-900"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            {/* Extra padding to cover the line completely */}
                            <span className="px-4 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">
                                Don't have an account? <Link href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Sign up</Link>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;