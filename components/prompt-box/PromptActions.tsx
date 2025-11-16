import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';
import type { TooltipConfig } from '@/lib/prompt-box-features';

interface PromptActionsProps {
  onAddClick?: () => void;
  onActionClick?: () => void;
  actionButtonText?: string;
  actionButtonLeftIcon?: ReactNode;
  actionButtonRightIcon?: ReactNode;
  addButtonTooltip?: TooltipConfig;
  customActionComponent?: ReactNode; // Custom action component (e.g., GenerateButton)
}

export function PromptActions({ 
  onAddClick, 
  onActionClick, 
  actionButtonText,
  actionButtonLeftIcon,
  actionButtonRightIcon,
  addButtonTooltip,
  customActionComponent,
}: PromptActionsProps) {
  const addButton = (
    <IconButton
      onClick={onAddClick}
      size="lg"
      variant="default"
      className="bg-black text-white hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={addButtonTooltip?.title || "Add reference image or file"}
      aria-describedby={addButtonTooltip ? "add-button-description" : undefined}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </IconButton>
  );

  return (
    <div className="flex items-center justify-between gap-4 mt-6" role="group" aria-label="Action buttons">
      {onAddClick && (addButtonTooltip ? (
        <>
          <Tooltip
            title={addButtonTooltip.title}
            description={addButtonTooltip.description}
            image={addButtonTooltip.image}
            variant={addButtonTooltip.variant || 'text'}
            position={addButtonTooltip.position || 'bottom'}
          >
            {addButton}
          </Tooltip>
          <div id="add-button-description" className="sr-only">
            {addButtonTooltip.description}
          </div>
        </>
      ) : (
        addButton
      ))}
      {/* Custom Action Component (e.g., GenerateButton) */}
      {customActionComponent}
      {/* Standard Action Button */}
      {!customActionComponent && actionButtonText && (
        <Button
          variant="primary"
          onClick={onActionClick}
          className="flex items-center gap-2 px-6 ml-auto"
          text={actionButtonText}
          leftIcon={actionButtonLeftIcon}
          rightIcon={actionButtonRightIcon}
        />
      )}
    </div>
  );
}

