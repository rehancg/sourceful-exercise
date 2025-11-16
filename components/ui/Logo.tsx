import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  href?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ 
  href = '/', 
  showText = true, 
  size = 'md',
  className 
}: LogoProps) {
  const sizeStyles = {
    sm: {
      container: 'w-6 h-6',
      icon: 'w-3 h-3',
      text: 'text-base',
    },
    md: {
      container: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-lg',
    },
    lg: {
      container: 'w-10 h-10',
      icon: 'w-5 h-5',
      text: 'text-xl',
    },
  };

  const currentSize = sizeStyles[size];

  const logoContent = (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        currentSize.container,
        'bg-[var(--color-text-primary-light)] rounded-full flex items-center justify-center'
      )}>
        <span className="text-white font-bold text-lg">S</span>
      </div>
      {showText && (
        <span className={cn(
          'font-bold text-[var(--color-text-primary-light)]',
          currentSize.text
        )}>
          Sourceful
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

