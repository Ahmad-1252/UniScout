'use client';

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Search,
    Heart,
    FileText,
    Settings,
    LogOut,
    Bell,
    User,
    ChevronRight,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';

const SidebarItem = ({ icon: Icon, label, active = false, count, href }) => (
    <Link href={href}>
        <div className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all group ${active ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}>
            <div className="flex items-center gap-3">
                <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
                <span className="font-medium">{label}</span>
            </div>
            {count && (
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                    {count}
                </span>
            )}
        </div>
    </Link>
);

const DashboardLayout = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            router.push(ROUTES.LOGIN);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/student/dashboard' },
        { icon: Search, label: 'Find Universities', href: '/student/dashboard/find-universities' },
        { icon: Heart, label: 'Saved Schools', href: '/student/dashboard/saved-schools', count: 5 },
        { icon: FileText, label: 'Applications', href: '/student/dashboard/applications', count: 2 },
        { icon: Settings, label: 'Scholarships', href: '/student/dashboard/scholarships' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col fixed h-full z-20 shadow-lg">
                <div className="p-8 flex items-center gap-2">
                    <div className="bg-gradient-to-br from-violet-600 to-purple-600 p-1.5 rounded-lg shadow-lg shadow-violet-500/20">
                        <div className="w-5 h-5 bg-white rounded-sm" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">UniFinder</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">Menu</p>
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            active={pathname === item.href}
                            count={item.count}
                            href={item.href}
                        />
                    ))}

                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-8">Settings</p>
                    <SidebarItem icon={User} label="My Profile" href="/student/dashboard/profile" />
                    <div onClick={handleLogout} className="cursor-pointer">
                        <div className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all group text-slate-500 hover:bg-slate-100 hover:text-slate-900">
                            <div className="flex items-center gap-3">
                                <LogOut size={20} className="text-slate-400 group-hover:text-slate-900" />
                                <span className="font-medium">Logout</span>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="p-4">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                        <p className="text-sm font-medium text-slate-300 mb-1">Pro Plan</p>
                        <p className="font-bold mb-3">Upgrade to Premium</p>
                        <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-violet-50 transition-colors">View Plans</button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-72 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-10 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Welcome back, {user?.firstName || 'Student'} 👋
                            </h1>
                            <p className="text-slate-500 text-sm">Here is what's happening with your applications today.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-3 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-violet-600 hover:border-violet-200 transition-all relative shadow-sm">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-900">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="text-xs text-slate-400">Masters Applicant</p>
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;