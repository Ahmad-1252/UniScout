"use client";

import dynamic from 'next/dynamic';
import { AuthLayout } from "../../components/layout/AuthLayout";

const VerifyResetOtp = dynamic(() => import("../../components/authentication/verifyResetOtp"), { ssr: false });

export default function VerifyResetOtpPage() {
  return (
    <AuthLayout
      title="Verify reset code"
      subtitle="Enter the code we sent to your email"
    >
      <VerifyResetOtp />
    </AuthLayout>
  );
}
