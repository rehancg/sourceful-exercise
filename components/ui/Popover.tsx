'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  position?: PopoverPosition;
  align?: PopoverAlign;
  className?: string;
  contentClassName?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  defaultOpen?: boolean;
  closeOnClickOutside?: boolean;
  closeOnContentClick?: boolean;
}

export function Popover({
  trigger,
  children,
  position = 'bottom',
  align = 'end',
  className,
  contentClassName,
  onOpenChange,
  open: controlledOpen,
  defaultOpen = false,
  closeOnClickOutside = true,
  closeOnContentClick = false,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // Close on click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Position classes
  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  const alignClasses = {
    top: {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    },
    bottom: {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    },
    left: {
      start: 'top-0',
      center: 'top-1/2 -translate-y-1/2',
      end: 'bottom-0',
    },
    right: {
      start: 'top-0',
      center: 'top-1/2 -translate-y-1/2',
      end: 'bottom-0',
    },
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleContentClick = () => {
    if (closeOnContentClick) {
      setIsOpen(false);
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="inline-block cursor-pointer"
      >
        {trigger}
      </div>

      {/* Popover Content */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            'absolute z-50',
            positionClasses[position],
            alignClasses[position][align],
            contentClassName
          )}
          onClick={handleContentClick}
        >
          {children}
        </div>
      )}
    </div>
  );
}

