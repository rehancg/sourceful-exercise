'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

export function FullScreenModal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  className,
}: FullScreenModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management: Move focus to close button when modal opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Header */}
      {(title || showCloseButton) && (
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          {title && (
            <h2 id="modal-title" className="font-bold text-gray-900 flex-1">
              {title}
            </h2>
          )}
          {showCloseButton && (
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className={cn(
                "p-2 hover:bg-gray-100 rounded-lg transition-colors",
                !title && "ml-auto"
              )}
              aria-label="Close modal"
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
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          title || showCloseButton
            ? 'h-[calc(100vh-73px)] overflow-y-auto'
            : 'h-screen overflow-y-auto',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

