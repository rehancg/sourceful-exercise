'use client';

import dynamic from 'next/dynamic';

const Session = dynamic(
  () => import('@/components/session').then(mod => ({ default: mod.Session })),
  { 
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading session...</div>
      </div>
    ),
    ssr: false
  }
);

export default function SessionPage() {
  return <Session />;
}

