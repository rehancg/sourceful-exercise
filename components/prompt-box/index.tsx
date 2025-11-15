'use client';
import { useState, useMemo, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FeatureOptionsRow } from './FeatureOptionsRow';
import { PromptInput } from './PromptInput';
import { InfoBanner } from './InfoBanner';
import { PromptActions } from './PromptActions';
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
  const featureFromQuery = useFeatureFromQuery(initialFeature);
  const [selectedFeature, setSelectedFeature] = useState<FeatureOptionId>(featureFromQuery);
  const [prompt, setPrompt] = useState(initialPrompt);

  // Sync selected feature with query param when URL changes
  useEffect(() => {
    setSelectedFeature(featureFromQuery);
  }, [featureFromQuery]);

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
  
  const buttonText = selectedFeatureData?.actionButton?.text;
  const buttonLeftIcon = selectedFeatureData?.actionButton?.leftIcon;
  const buttonRightIcon = selectedFeatureData?.actionButton?.rightIcon;
  const addButtonTooltip = selectedFeatureData?.addButtonTooltip;

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);
  };

  const handleActionClick = () => {
    if (selectedFeature === 'ai-imagery') {
      // Generate a session ID (in a real app, this would come from the backend)
      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      // Store prompt in sessionStorage to pass to the session page
      if (prompt) {
        sessionStorage.setItem(`session-${sessionId}-prompt`, prompt);
      }
      router.push(`/dashboard/session/${sessionId}`);
    }
    // Add other feature handlers here
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
        onFeatureSelect={handleFeatureSelect}
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
          onAddClick={() => {}}
          onActionClick={handleActionClick}
          actionButtonText={buttonText}
          actionButtonLeftIcon={buttonLeftIcon}
          actionButtonRightIcon={buttonRightIcon}
          addButtonTooltip={addButtonTooltip}
        />
      )}
    </div>
  );
}

