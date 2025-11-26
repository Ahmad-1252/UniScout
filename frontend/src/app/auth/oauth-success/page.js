"use client";

import dynamic from 'next/dynamic';

// Client-only dynamic component (prevents SSR pre-render issue with useSearchParams())
const OAuthSuccess = dynamic(() => import('../../components/authentication/oauthSuccess'), { ssr: false });

export default function OAuthSuccessPage() {
  return <OAuthSuccess />;
}
