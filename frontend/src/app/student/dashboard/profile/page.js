'use client';

import { useState } from 'react';
import ProtectedDashboardPage from '@/components/ProtectedDashboardPage';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Edit3, Save, X } from 'lucide-react';
import { Button, Input, Label } from '../../../components/ui';

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        dateOfBirth: '1998-05-15',
        education: 'Bachelor of Science in Computer Science',
        gpa: '3.8',
        testScores: {
            gre: '320',
            ielts: '7.5'
        }
    });

    const handleSave = () => {
        // Here you would typically save to backend
        setIsEditing(false);
        // Show success message
    };

    const handleCancel = () => {
        // Reset form data if needed
        setIsEditing(false);
    };

    return (
        <ProtectedDashboardPage>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
                        <p className="text-slate-500">Manage your personal information and academic details</p>
                    </div>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors flex items-center gap-2"
                        >
                            <Edit3 size={18} />
                            Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
                            >
                                <Save size={18} />
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors flex items-center gap-2"
                            >
                                <X size={18} />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Overview */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                                    {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 mb-1">
                                    {formData.firstName} {formData.lastName}
                                </h2>
                                <p className="text-slate-500 text-sm mb-4">Masters Applicant</p>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <div className="flex items-center justify-center gap-2">
                                        <Mail size={16} />
                                        <span>{formData.email}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <MapPin size={16} />
                                        <span>{formData.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <User size={20} className="text-slate-400" />
                                Personal Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <GraduationCap size={20} className="text-slate-400" />
                                Academic Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="education">Current Education</Label>
                                    <Input
                                        id="education"
                                        value={formData.education}
                                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="gpa">GPA</Label>
                                    <Input
                                        id="gpa"
                                        value={formData.gpa}
                                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="gre">GRE Score</Label>
                                    <Input
                                        id="gre"
                                        value={formData.testScores.gre}
                                        onChange={(e) => setFormData({ ...formData, testScores: { ...formData.testScores, gre: e.target.value } })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="ielts">IELTS Score</Label>
                                    <Input
                                        id="ielts"
                                        value={formData.testScores.ielts}
                                        onChange={(e) => setFormData({ ...formData, testScores: { ...formData.testScores, ielts: e.target.value } })}
                                        disabled={!isEditing}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Account Settings</h3>
                            <div className="space-y-4">
                                <button className="w-full text-left p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="font-semibold text-slate-900">Change Password</div>
                                    <div className="text-sm text-slate-500">Update your account password</div>
                                </button>
                                <button className="w-full text-left p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="font-semibold text-slate-900">Privacy Settings</div>
                                    <div className="text-sm text-slate-500">Manage your privacy preferences</div>
                                </button>
                                <button className="w-full text-left p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors text-red-700">
                                    <div className="font-semibold">Delete Account</div>
                                    <div className="text-sm text-red-500">Permanently delete your account</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedDashboardPage>
    );
}