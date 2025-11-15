'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CreditUsageProps {
  className?: string;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 24) {
    return `about ${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
}

function getActionLabel(actionType: string): string {
  const labels: Record<string, string> = {
    refine: 'Refine',
    image_generation: 'Image Generation',
    bonus: 'Bonus Credits',
  };
  return labels[actionType] || actionType;
}

function getActionIcon(actionType: string) {
  if (actionType === 'bonus') {
    return (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

export function CreditUsage({ className }: CreditUsageProps) {
  const { balance, creditHistory } = useAuth();

  return (
    <div className={cn('bg-white rounded-2xl shadow-lg p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your credit usage</h2>
        {balance !== null && (
          <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
            <span className="text-sm font-medium text-gray-900">{balance}</span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
              <path d="M7 6h1v4" />
              <path d="m16.71 13.88.7.71-2.82 2.82" />
            </svg>
          </div>
        )}
      </div>

      {/* Credit History List */}
      <div className="space-y-4 mb-6">
        {creditHistory.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-700">
                {getActionIcon(item.actionType)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {getActionLabel(item.actionType)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(item.createdAt)}
                </p>
              </div>
            </div>
            <div
              className={cn(
                'text-sm font-medium',
                item.amount > 0 ? 'text-green-600' : 'text-gray-900'
              )}
            >
              {item.amount > 0 ? '+' : ''}
              {item.amount} credits
            </div>
          </div>
        ))}
      </div>

      {/* See all credit history link */}
      <Link
        href="/account/credits"
        className="block text-sm text-blue-600 hover:text-blue-700 mb-6"
      >
        See all credit history
      </Link>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          className="flex-1 rounded-lg"
          onClick={() => {
            // Handle buy credits
            console.log('Buy credits clicked');
          }}
        >
          Buy credits
        </Button>
        <Button
          variant="primary"
          className="flex-1 rounded-lg"
          onClick={() => {
            // Handle upgrade account
            console.log('Upgrade account clicked');
          }}
        >
          Upgrade account
        </Button>
      </div>
    </div>
  );
}

