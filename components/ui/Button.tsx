import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    "h-12",
    "px-4",
    "min-h-12",
    "rounded-full",      
    "text-base",
    "font-medium",
    "leading-6",
    "tracking-normal",
    "relative",
    "overflow-hidden",
    "z-[1]",
    "whitespace-nowrap",
    "transition-all",
    "duration-200",
    fullWidth && "w-full max-w-[300px]"
  );

  const variantStyles = {
    primary: cn(
      "text-white",
      "bg-gradient-to-br from-[#8f00ff] from-10% to-[#0038ff]",
      "hover:from-[#a020ff] hover:to-[#0048ff]",
      "active:scale-[0.98]"
    ),
    secondary: cn(
      "text-[var(--color-text-primary-light)]",
      "bg-transparent",
      "border-2 border-[var(--color-text-primary-light)]",
      "hover:bg-gray-50",
      "active:scale-[0.98]"
    ),
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

