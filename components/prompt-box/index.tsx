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
    <section
      className={cn(
        'bg-white rounded-4xl mx-4 p-4 md:p-8',
        className
      )}
      aria-label="Prompt input"
      aria-describedby={selectedFeatureData?.infoMessage ? 'prompt-info-banner' : undefined}
    >
      {/* Feature Options Row */}
      <FeatureOptionsRow
        selectedFeature={selectedFeature}
        onFeatureSelect={onFeatureSelect}
      />

      {/* Image Preview */}
      {uploadedImage && (
        <div className="mb-4 relative inline-block group" role="group" aria-label="Uploaded image preview">
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
            className="absolute inset-0 w-full h-full bg-black/20 md:bg-black/0 md:group-hover:bg-black/20 rounded-lg flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Remove uploaded image"
            type="button"
          >
            <div className="w-8 h-8 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-sm">
              <svg
                className="w-5 h-5 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
        aria-label="Upload reference image"
        aria-describedby={showAddButton && addButtonTooltip ? "add-button-description" : undefined}
      />

      {/* Prompt Input or Info Banner */}
      <div className="mb-6">
        {selectedFeatureData?.infoMessage ? (
          <InfoBanner 
            message={selectedFeatureData.infoMessage}
            id="prompt-info-banner"
          />
        ) : (
          <PromptInput
            value={prompt}
            onChange={handlePromptChange}
            placeholder={placeholder}
            aria-label={`Enter your prompt for ${selectedFeatureData?.label || 'selected feature'}`}
            aria-describedby="prompt-description"
            id="prompt-input"
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
      {/* Hidden description for screen readers */}
      <div id="prompt-description" className="sr-only">
        {selectedFeatureData?.tooltip?.description || 'Enter a description of what you want to create'}
      </div>
    </section>
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

