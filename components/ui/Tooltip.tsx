import { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface TooltipImage {
  src: string;
  alt: string;
}

interface TooltipProps {
  title: string;
  description?: string;
  image?: TooltipImage;
  variant?: 'text' | 'image';
  className?: string;
  wrapperClassName?: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({
  title,
  description,
  image,
  variant = 'text',
  className,
  wrapperClassName,
  children,
  position = 'bottom',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const hasImage = variant === 'image' && image;

  useEffect(() => {
    setIsMounted(true);
    
    // Check if we're on a small screen (below md breakpoint - 768px)
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    // Don't process tooltip positioning on small screens
    if (isSmallScreen || !isVisible) {
      if (!isVisible) {
        setIsPositioned(false);
      }
      return;
    }
    
    if (triggerRef.current && tooltipRef.current) {
      // Reset positioned state when visibility changes
      setIsPositioned(false);
      
      const updatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current) return;
        
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 8;

        let top = 0;
        let left = 0;

        switch (position) {
          case 'top':
            top = triggerRect.top - tooltipRect.height - padding;
            left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
            break;
          case 'bottom':
            top = triggerRect.bottom + padding;
            left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
            break;
          case 'left':
            top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
            left = triggerRect.left - tooltipRect.width - padding;
            break;
          case 'right':
            top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
            left = triggerRect.right + padding;
            break;
        }

        // Boundary checks to keep tooltip within viewport
        // Adjust horizontally if tooltip goes off-screen
        if (left < padding) {
          left = padding;
        } else if (left + tooltipRect.width > viewportWidth - padding) {
          left = viewportWidth - tooltipRect.width - padding;
        }

        // Adjust vertically if tooltip goes off-screen
        if (top < padding) {
          top = padding;
        } else if (top + tooltipRect.height > viewportHeight - padding) {
          top = viewportHeight - tooltipRect.height - padding;
        }

        setTooltipPosition({ top, left });
        setIsPositioned(true);
      };

      // Initial position calculation
      requestAnimationFrame(updatePosition);

      // Update position on scroll and resize
      const handleScroll = () => {
        if (isVisible) {
          requestAnimationFrame(updatePosition);
        }
      };

      const handleResize = () => {
        if (isVisible) {
          requestAnimationFrame(updatePosition);
        }
      };

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible, position, isSmallScreen]);

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className={cn(
        'fixed z-[100] opacity-0 invisible transition-opacity duration-200',
        isVisible && isPositioned && 'opacity-100 visible',
        'pointer-events-none',
        className
      )}
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
      }}
    >
        <div
          className={cn(
            'bg-gray-900 text-white rounded-lg shadow-xl p-4',
            hasImage ? 'max-w-3xs' : 'max-w-2xs')}
        >
          {/* Images Grid */}
          {hasImage && (
              <div
                  className="relative aspect-3/2 rounded overflow-hidden bg-gray-800 max-w-full mb-2"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
              </div>
          )}

          {/* Title */}
          <h3 className={cn(
            'font-semibold text-base mb-1')}>
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className={cn(
              'text-gray-300 text-xs'
            )}>
              {description}
            </p>
          )}
        </div>
      </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={cn('inline-block', wrapperClassName)}
        onMouseEnter={() => {
          if (!isSmallScreen) {
            setIsVisible(true);
          }
        }}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isMounted && createPortal(tooltipContent, document.body)}
    </>
  );
}

