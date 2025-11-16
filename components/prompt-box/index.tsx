'use client';
import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { FeatureOptionsRow } from './FeatureOptionsRow';
import { PromptInput } from './PromptInput';
import { InfoBanner } from './InfoBanner';
import { PromptActions } from './PromptActions';
import { PromptBoxProvider, usePromptBox } from './context/PromptBoxContext';
import { PROMPT_BOX_CONFIG, FeatureOptionId } from '@/lib/constants';
import { PROMPT_BOX_FEATURES } from '@/lib/prompt-box-features';
import { cn } from '@/lib/utils';

interface PromptBoxProps {
  className?: string;
  initialPrompt?: string;
  initialFeature?: FeatureOptionId;
}

function PromptBoxContent({ className }: { className?: string }) {
  const { isAuthenticated } = useAuth();
  const {
    selectedFeature,
    prompt,
    uploadedImage,
    fileInputRef,
    onPromptChange,
    onFeatureSelect,
    onFileSelect,
    onAddClick,
    onRemoveImage,
    onActionClick,
  } = usePromptBox();

  const selectedFeatureData = useMemo(() => {
    return PROMPT_BOX_FEATURES.find(feature => feature.id === selectedFeature);
  }, [selectedFeature]);

  const isComingSoon = selectedFeatureData?.comingSoon ?? false;
  
  // Determine which action button config to use based on authentication
  const actionButtonConfig = isAuthenticated
    ? selectedFeatureData?.userActionButton || selectedFeatureData?.actionButton
    : selectedFeatureData?.guestActionButton || selectedFeatureData?.actionButton;
  
  const buttonText = actionButtonConfig?.text;
  const buttonLeftIcon = actionButtonConfig?.leftIcon;
  const buttonRightIcon = actionButtonConfig?.rightIcon;
  const customComponent = actionButtonConfig?.customComponent;
  const showAddButton = selectedFeatureData?.showAddButton === true;
  const addButtonTooltip = selectedFeatureData?.addButtonTooltip;
  const placeholder = selectedFeatureData?.placeholder || PROMPT_BOX_CONFIG.placeholder;

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPromptChange(e.target.value);
  };

  return (
    <div
      className={cn(
        'bg-white rounded-4xl mx-4 p-4 md:p-8',
        className
      )}
    >
      {/* Feature Options Row */}
      <FeatureOptionsRow
        selectedFeature={selectedFeature}
        onFeatureSelect={onFeatureSelect}
      />

      {/* Image Preview */}
      {uploadedImage && (
        <div className="mb-4 relative inline-block group">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src={uploadedImage}
              alt="Uploaded preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            onClick={onRemoveImage}
            className="absolute inset-0 w-full h-full bg-black/0 group-hover:bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <div className="w-8 h-8 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-sm">
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
        aria-label="Upload image"
      />

      {/* Prompt Input or Info Banner */}
      <div className="mb-6">
        {selectedFeatureData?.infoMessage ? (
          <InfoBanner message={selectedFeatureData.infoMessage} />
        ) : (
          <PromptInput
            value={prompt}
            onChange={handlePromptChange}
            placeholder={placeholder}
            aria-label="Enter your prompt"
          />
        )}
      </div>

      {/* Action Buttons */}
      {!isComingSoon && (
        <PromptActions
          onAddClick={showAddButton ? onAddClick : undefined}
          onActionClick={() => onActionClick()}
          actionButtonText={buttonText}
          actionButtonLeftIcon={buttonLeftIcon}
          actionButtonRightIcon={buttonRightIcon}
          addButtonTooltip={showAddButton ? addButtonTooltip : undefined}
          customActionComponent={customComponent}
        />
      )}
    </div>
  );
}

export function PromptBox({
  className,
  initialPrompt = '',
  initialFeature = PROMPT_BOX_CONFIG.defaultSelectedFeature,
}: PromptBoxProps) {
  return (
    <PromptBoxProvider
      initialPrompt={initialPrompt}
      initialFeature={initialFeature}
    >
      <PromptBoxContent className={className} />
    </PromptBoxProvider>
  );
}

