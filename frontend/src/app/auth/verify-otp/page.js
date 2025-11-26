"use client";

import dynamic from 'next/dynamic';
import { AuthLayout } from "../../components/layout/AuthLayout";

const VerifyOtp = dynamic(() => import("../../components/authentication/verifyOtp"), { ssr: false });

export default function VerifyOtpPage() {
  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the code we sent to your email"
    >
      <VerifyOtp />
    </AuthLayout>
  );
}
