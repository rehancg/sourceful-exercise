import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  text?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className,
  leftIcon,
  rightIcon,
  text,
  disabled,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: cn(
      "h-8",
      "px-3",
      "min-h-8",
      "text-sm",
      "gap-1.5"
    ),
    md: cn(
      "h-12",
      "px-4",
      "min-h-12",
      "text-base",
      "gap-2"
    ),
    lg: cn(
      "h-14",
      "px-6",
      "min-h-14",
      "text-lg",
      "gap-2.5"
    ),
  };

  const baseStyles = cn(
    "rounded-full",
    "flex items-center justify-center",
    "font-medium",
    "leading-6",
    "tracking-normal",
    "relative",
    "overflow-hidden",
    "z-[1]",
    "whitespace-nowrap",
    "transition-all",
    "duration-200",
    sizeStyles[size],
    fullWidth && "w-full"
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

  const disabledStyles = disabled
    ? cn(
        "bg-gray-300",
        "text-gray-500",
        "cursor-not-allowed",
        "hover:bg-gray-300",
        "hover:!from-gray-300",
        "hover:!to-gray-300",
        "active:scale-100"
      )
    : "";

  const content = text || children;

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], disabledStyles, className)}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {content && <span>{content}</span>}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}

