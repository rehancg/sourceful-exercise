'use client';

import { useAuth } from '@/contexts/AuthContext';
import { AccountMenu } from '@/components/account/AccountMenu';
import { CreditUsage } from '@/components/account/CreditUsageMenu';
import { Popover } from '@/components/ui/Popover';

export function UserHeader() {
  const { user, balance } = useAuth();

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className="hidden lg:flex fixed top-4 right-4 z-40 items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
      {/* Notification Bell */}
      <button
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Notifications"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      {/* Credit Balance with Popover */}
      {balance !== null && (
        <Popover
          trigger={
            <button className="flex items-center gap-1 px-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <span className="text-sm font-semibold text-gray-900">{balance}</span>
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
            </button>
          }
          position="bottom"
          align="end"
          contentClassName="w-96"
        >
          <CreditUsage />
        </Popover>
      )}

      {/* User Avatar with Popover */}
      <Popover
        trigger={
          <button
            className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center hover:bg-yellow-300 transition-colors"
            aria-label="User menu"
          >
            <span className="text-gray-900 font-bold text-lg">{userInitial}</span>
          </button>
        }
        position="bottom"
        align="end"
        contentClassName="w-96"
      >
        <AccountMenu />
      </Popover>
    </div>
  );
}

