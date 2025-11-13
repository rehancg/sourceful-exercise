'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IconButton } from '@/components/ui/IconButton';
import { NAV_LINKS } from '@/lib/constants';
import { useMobileMenu } from './MobileMenuProvider';

export function MobileMenuOverlay() {
  const { isOpen, close } = useMobileMenu();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 lg:hidden">
      {/* Menu Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="font-bold text-[var(--color-text-primary-light)]">Menu</h2>
        <IconButton
          onClick={close}
          size="md"
          variant="ghost"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col p-4">
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={close}
            className={cn(
              "flex items-center justify-between py-4 text-[var(--color-text-primary-light)] font-medium transition-colors",
              index !== NAV_LINKS.length - 1 && "border-b border-gray-100"
            )}
          >
            <span>{link.label}</span>
            {link.label === 'Products' && (
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}

