'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { mainNavItems, bottomNavItems } from './SideNav';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { AccountMenu } from '@/components/account/AccountMenu';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  // Safety check for nav items
  const safeMainNavItems = mainNavItems || [];
  const safeBottomNavItems = bottomNavItems || [];

  return (
    <>
      {/* Mobile Header - Always Visible */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Hamburger Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* Logo */}
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
          </div>

          {/* Right: Notification & User Avatar */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <svg
                className="w-6 h-6"
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
            {/* User Avatar */}
            <button
              onClick={() => setIsAccountMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center hover:bg-yellow-300 transition-colors"
              aria-label="User menu"
            >
              <span className="text-gray-900 font-bold text-lg">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <FullScreenModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          {/* Left: Hamburger Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* Logo */}
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
          </div>

          {/* Right: Notification & User Avatar */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <svg
                className="w-6 h-6"
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
            {/* User Avatar */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsAccountMenuOpen(true);
              }}
              className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center hover:bg-yellow-300 transition-colors"
              aria-label="User menu"
            >
              <span className="text-gray-900 font-bold text-lg">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {safeMainNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 mx-4 rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-100'
                  )}
                >
                  <div className="text-gray-900">{item.icon}</div>
                  <span className="text-base font-medium text-gray-900">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Navigation Items */}
          <div className="border-t border-gray-200 py-4">
            {safeBottomNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const isHighlighted = item.isHighlighted;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 mx-4 rounded-lg transition-colors',
                    isHighlighted && !isActive
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                      : isActive
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-100'
                  )}
                >
                  <div className={cn(isHighlighted && !isActive ? 'text-white' : 'text-gray-900')}>
                    {item.icon}
                  </div>
                  <span
                    className={cn(
                      'text-base font-medium',
                      isHighlighted && !isActive ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </FullScreenModal>

      {/* Account Menu Modal */}
      <FullScreenModal
        isOpen={isAccountMenuOpen}
        onClose={() => setIsAccountMenuOpen(false)}
        showCloseButton={true}
      >
        <div className="p-4 h-full flex flex-col">
          <AccountMenu className="bg-transparent shadow-none rounded-none p-0 flex-1" />
        </div>
      </FullScreenModal>
    </>
  );
}

