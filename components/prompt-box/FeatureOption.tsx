import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { FeatureOption as FeatureOptionType } from '@/lib/prompt-box-features';
import { Tooltip } from '@/components/ui/Tooltip';

interface FeatureOptionProps {
  feature: FeatureOptionType;
  isSelected?: boolean;
  onClick?: () => void;
}

export const FeatureOption = forwardRef<HTMLButtonElement, FeatureOptionProps>(
  function FeatureOption({ feature, isSelected = false, onClick }, ref) {
    const buttonContent = (
      <button
        ref={ref}
        onClick={onClick}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        data-feature-id={feature.id}
        className={cn(
          'flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200',
          'w-full md:w-[130px] h-[110px] flex-shrink-0',
          'focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2',
          isSelected
            ? 'bg-[#D5ECFF]'
            : 'hover:bg-gray-50'
        )}
        aria-label={`${feature.label}${feature.comingSoon ? ', coming soon' : feature.isNew ? ', new feature' : ''}`}
        aria-selected={isSelected}
        aria-pressed={isSelected}
      >
        <div className={cn(
          'text-black p-2 rounded-lg flex items-center justify-center',
          isSelected ? 'bg-blue-200' : 'bg-white border border-gray-200'
        )}>
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

    // Wrap with Tooltip if tooltip config exists
    if (feature.tooltip) {
      return (
        <Tooltip
          title={feature.tooltip.title}
          description={feature.tooltip.description}
          image={feature.tooltip.image}
          variant={feature.tooltip.variant}
          position={feature.tooltip.position}
          wrapperClassName="w-full"
        >
          {buttonContent}
        </Tooltip>
      );
    }

    return buttonContent;
  }
);

