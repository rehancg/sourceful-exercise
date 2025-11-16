'use client';

import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AccountMenuProps {
  className?: string;
}

export function AccountMenu({ className }: AccountMenuProps) {
  const { user, logout, balance } = useAuth();

  const menuItems = [
    {
      label: 'Manage account',
      icon: (
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      badge: 'FREE',
      href: '/',
    },
    {
      label: 'Pricing',
      icon: (
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
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
      href: '/',
    },
    {
      label: 'Billing',
      icon: (
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
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      href: '/',
    },
    {
      label: 'Credit history',
      icon: (
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      href: '/',
    },
    {
      label: 'Help centre',
      icon: (
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      href: '/',
    },
  ];

  const userInitial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className={cn(
      'bg-white rounded-2xl shadow-lg p-6',
      'md:block md:static',
      'flex flex-col h-full md:h-auto',
      className
    )}>
      <div className="flex-1 md:flex-none">
        {/* User Info Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-yellow-200 flex items-center justify-center">
            <span className="text-gray-900 font-bold text-xl">{userInitial}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {user?.name || 'User'}
            </h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Credit Usage Section */}
        {balance !== null && (
          <div className="lg:hidden">
            <div className="border-t border-gray-200 mb-6"></div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-gray-900">Your credit usage</h3>
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
            </div>
            <div className="border-t border-gray-200 mb-6"></div>
          </div>
        )}

        {/* Menu Items */}
        <div className="space-y-1 mb-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-700 group-hover:text-gray-900">
                  {item.icon}
                </div>
                <span className="text-base font-medium text-gray-900">
                  {item.label}
                </span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-medium text-gray-900 border border-gray-300 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200"></div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors group"
        >
          <svg
            className="w-5 h-5 text-gray-700 group-hover:text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-base font-medium text-gray-900">Log out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 mt-auto md:mt-0">
        <span>© 2025 Sourceful Ltd</span>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-gray-700">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-gray-700">
            Terms of Use
          </Link>
        </div>
      </div>
    </div>
  );
}

