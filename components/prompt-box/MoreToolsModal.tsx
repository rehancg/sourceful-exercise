'use client';

import { useEffect } from 'react';
import { FeatureOption } from './FeatureOption';
import { PROMPT_BOX_FEATURES } from '@/lib/prompt-box-features';
import { FeatureOptionId } from '@/lib/constants';
import { IconButton } from '@/components/ui/IconButton';

interface MoreToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFeature?: FeatureOptionId;
  onFeatureSelect?: (featureId: FeatureOptionId) => void;
}

export function MoreToolsModal({
  isOpen,
  onClose,
  selectedFeature,
  onFeatureSelect,
}: MoreToolsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFeatureClick = (featureId: FeatureOptionId) => {
    onFeatureSelect?.(featureId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div
        className="relative bg-white rounded-none md:rounded-2xl p-6 w-full h-full md:max-w-2xl md:w-full md:max-h-[90vh] md:h-auto overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <IconButton
            onClick={onClose}
            size="md"
            variant="default"
            className="bg-gray-100 hover:bg-gray-200"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          {PROMPT_BOX_FEATURES.map((feature) => (
            <FeatureOption
              key={feature.id}
              feature={feature}
              isSelected={selectedFeature === feature.id}
              onClick={() => handleFeatureClick(feature.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

