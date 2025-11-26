"use client";

import dynamic from 'next/dynamic';
import { AuthLayout } from "../../components/layout/AuthLayout";

// Load ResetPassword as a client-only dynamic component to avoid SSR / pre-render issues
const ResetPassword = dynamic(() => import("../../components/authentication/resetPassword"), { ssr: false });

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Create new password"
      subtitle="Choose a strong password for your account"
    >
      <ResetPassword />
    </AuthLayout>
  );
}
