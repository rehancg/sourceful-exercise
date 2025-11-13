import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
}

export function IconButton({
  children,
  size = 'md',
  variant = 'default',
  className,
  ...props
}: IconButtonProps) {
  const baseStyles = cn(
    "flex items-center justify-center",
    "rounded-full",
    "transition-colors",
    "relative",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
  );
  const sizeStyles = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const variantStyles = {
    default: cn(
      "text-[var(--color-text-primary-light)]",
      "hover:bg-gray-100",
      "active:bg-gray-200"
    ),
    ghost: cn(
      "text-[var(--color-text-secondary-light)]",
      "hover:text-[var(--color-text-primary-light)]",
      "hover:bg-gray-50",
      "active:bg-gray-100"
    ),
    outline: cn(
      "text-[var(--color-text-primary-light)]",
      "border-2 border-[var(--color-text-primary-light)]",
      "hover:bg-gray-50",
      "active:bg-gray-100"
    ),
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

