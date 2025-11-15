'use client';

import { cn } from '@/lib/utils';
import { FeatureOptionId } from '@/lib/constants';
import { PROMPT_BOX_FEATURES } from '@/lib/prompt-box-features';
import { FeatureDataDisplay } from './type';

interface DesignActionInputProps {
  featureId: FeatureOptionId;
  date: Date;
  prompt?: string;
  imageUrl?: string;
  onRemix?: () => void;
  className?: string;
}

export function DesignActionInput({
  featureId,
  date,
  prompt,
  imageUrl,
  onRemix,
  className,
}: DesignActionInputProps) {
  const feature = PROMPT_BOX_FEATURES.find(f => f.id === featureId);
  const featureLabel = feature?.label || featureId;

  // Format date as "Nov 14, 2025 21:23"
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const dateTimeString = `${formattedDate} ${formattedTime}`;

  return (
    <div className="relative flex justify-end">
      <div className="max-w-2xl w-full">
        <div className="absolute -top-6 right-0">
          <span className="text-sm text-gray-500">{dateTimeString}</span>
        </div>
        <div
          className={cn(
            'rounded-2xl p-6 bg-gray-100',
            className
          )}
        >
     {/* Feature Badge and Remix Button Container */}
      <div className="flex items-center justify-between mb-4 px-4 py-3 bg-gray-200 rounded-full">
        {/* Feature Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-lg">
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-900">
            {featureLabel}
          </span>
        </div>

        {/* Remix Button */}
        <button
          onClick={onRemix}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="text-sm font-medium">Remix</span>
        </button>
      </div>

        {/* Feature-Specific Data Display */}
        <FeatureDataDisplay
          featureId={featureId}
          prompt={prompt}
          imageUrl={imageUrl}
        />
        </div>
      </div>
    </div>
  );
}

