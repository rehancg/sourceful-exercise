import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { FeatureOption as FeatureOptionType } from '@/lib/prompt-box-features';

interface FeatureOptionProps {
  feature: FeatureOptionType;
  isSelected?: boolean;
  onClick?: () => void;
}

export const FeatureOption = forwardRef<HTMLButtonElement, FeatureOptionProps>(
  function FeatureOption({ feature, isSelected = false, onClick }, ref) {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200',
          'w-[130px] h-[110px] flex-shrink-0',
          isSelected
            ? 'bg-[#D5ECFF]'
            : 'hover:bg-gray-50'
        )}
        aria-label={feature.label}
        aria-pressed={isSelected}
      >
      <div className="text-black">
        {feature.icon}
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-medium text-black">
          {feature.label}
        </span>
        {feature.comingSoon ? (
          <span className="text-xs font-semibold text-orange-500">
            Coming soon
          </span>
        ) : feature.isNew ? (
          <span className="text-xs font-semibold bg-gradient-r-violet-blue-green bg-clip-text text-transparent">
            New!
          </span>
        ) : null}
      </div>
    </button>
    );
  }
);

