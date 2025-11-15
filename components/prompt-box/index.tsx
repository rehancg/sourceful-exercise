'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { FeatureOptionsRow } from './FeatureOptionsRow';
import { PromptInput } from './PromptInput';
import { InfoBanner } from './InfoBanner';
import { PromptActions } from './PromptActions';
import { GenerateButton } from './GenerateButton';
import { PromptBoxProvider } from './PromptBoxContext';
import { useFeatureFromQuery } from './useFeatureFromQuery';
import { PROMPT_BOX_CONFIG, FeatureOptionId } from '@/lib/constants';
import { PROMPT_BOX_FEATURES } from '@/lib/prompt-box-features';
import { cn } from '@/lib/utils';

interface PromptBoxProps {
  className?: string;
  initialPrompt?: string;
  initialFeature?: FeatureOptionId;
}

export function PromptBox({
  className,
  initialPrompt = '',
  initialFeature = PROMPT_BOX_CONFIG.defaultSelectedFeature,
}: PromptBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const featureFromQuery = useFeatureFromQuery(initialFeature);
  const [selectedFeature, setSelectedFeature] = useState<FeatureOptionId>(featureFromQuery);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previousFeatureRef = useRef<FeatureOptionId>(selectedFeature);

  // Sync selected feature with query param when URL changes
  useEffect(() => {
    setSelectedFeature(featureFromQuery);
  }, [featureFromQuery]);

  // Clear uploaded image when feature changes
  useEffect(() => {
    if (previousFeatureRef.current !== selectedFeature && uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
      setUploadedImage(null);
    }
    previousFeatureRef.current = selectedFeature;
  }, [selectedFeature, uploadedImage]);

  const handleFeatureSelect = (featureId: FeatureOptionId) => {
    setSelectedFeature(featureId);
    const params = new URLSearchParams(window.location.search);
    params.set('use-case', featureId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

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
  const addButtonTooltip = selectedFeatureData?.addButtonTooltip;

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);
  };

  const handlePromptChangeValue = (value: string) => {
    setPrompt(value);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Revoke old URL if exists to prevent memory leaks
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
      
      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
      setUploadedImage(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleActionClick = () => {
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    router.push(`/dashboard/session/${sessionId}`);
  };

  const renderCustomActionComponent = () => {
    if (customComponent === 'generate' && selectedFeature === 'ai-imagery') {
      return (
        <GenerateButton
          className="ml-auto"
        />
      );
    }
    return null;
  };

  return (
    <PromptBoxProvider
      selectedFeature={selectedFeature}
      prompt={prompt}
      uploadedImage={uploadedImage}
      onPromptChange={handlePromptChangeValue}
      onActionClick={handleActionClick}
      onRemoveImage={handleRemoveImage}
    >
      <div
        className={cn(
          'bg-white rounded-4xl mx-4 p-4 md:p-8',
          className
        )}
      >
      {/* Feature Options Row */}
      <FeatureOptionsRow
        selectedFeature={selectedFeature}
        onFeatureSelect={handleFeatureSelect}
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
            onClick={handleRemoveImage}
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
        onChange={handleFileSelect}
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
            placeholder={PROMPT_BOX_CONFIG.placeholder}
            aria-label="Enter your prompt"
          />
        )}
      </div>

      {/* Action Buttons */}
      {!isComingSoon && (
        <PromptActions
          onAddClick={handleAddClick}
          onActionClick={() => handleActionClick()}
          actionButtonText={buttonText}
          actionButtonLeftIcon={buttonLeftIcon}
          actionButtonRightIcon={buttonRightIcon}
          addButtonTooltip={addButtonTooltip}
          customActionComponent={renderCustomActionComponent()}
        />
      )}
      </div>
    </PromptBoxProvider>
  );
}

