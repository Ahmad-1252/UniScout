"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button, Input, Label } from "../ui";
import { AlertCircle, CheckCircle, ArrowRight, Loader2, RefreshCw, Mail } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyOTP, resendOTP } = useAuth();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push(ROUTES.LOGIN);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    if (otp.length !== 4) {
      setError("OTP must be 4 digits");
      return;
    }

    setLoading(true);

    try {
      const result = await verifyOTP(email, otp);

      if (result.success) {
        setSuccess("Email verified! Redirecting...");
        setTimeout(() => {
          // New users need to complete profile setup
          if (result.user && !result.user.profileCompleted) {
            window.location.href = ROUTES.STUDENT_SETUP;
          } else {
            window.location.href = ROUTES.STUDENT_DASHBOARD;
          }
        }, 1500);
      } else {
        setError(result.message || "Invalid OTP");
      }
    } catch (error) {
      setError(error.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setResending(true);

    try {
      const result = await resendOTP(email);

      if (result.success) {
        setSuccess("OTP sent successfully!");
        setCountdown(60); // Start 60 second countdown
      } else {
        setError(result.message || "Failed to resend OTP");
      }
    } catch (error) {
      setError(error.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div>
      {/* Main Card */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">

        {/* Card Header: Clean text only, NO LOGO */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Verify your email</h1>
          <p className="text-slate-500 text-sm">
            We've sent a verification code to <strong className="text-slate-900">{email}</strong>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl animate-in slide-in-from-top-2 text-red-600 text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl animate-in slide-in-from-top-2 text-green-600 text-sm font-medium">
              <CheckCircle className="w-5 h-5 shrink-0" />
              {success}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="otp" className="text-slate-900 font-semibold text-sm ml-1">Verification Code</Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              placeholder="0000"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                setOtp(value);
                if (error) setError("");
              }}
              required
              maxLength={4}
              className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-violet-500/20 rounded-xl transition-all duration-200 text-center text-2xl tracking-widest font-mono"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-lg shadow-violet-600/20 hover:shadow-xl hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify Email <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Resend Section */}
        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <p className="text-slate-500 text-sm mb-3">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendOTP}
            disabled={resending || countdown > 0}
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-bold hover:underline transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:underline-none"
          >
            {resending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : countdown > 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Resend in {countdown}s
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Resend OTP
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
