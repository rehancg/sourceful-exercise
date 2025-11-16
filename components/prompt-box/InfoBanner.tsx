import { cn } from '@/lib/utils';

interface InfoBannerProps {
  message: string;
  className?: string;
  id?: string;
}

export function InfoBanner({ message, className, id }: InfoBannerProps) {
  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg bg-gray-50',
        className
      )}
    >
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-sm text-gray-700 flex-1">
        {message}
      </p>
    </div>
  );
}

