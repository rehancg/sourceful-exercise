'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { FeatureOptionId } from '@/lib/constants';

interface PromptBoxContextType {
  selectedFeature: FeatureOptionId;
  prompt: string;
  uploadedImage: string | null;
  onPromptChange: (value: string) => void;
  onActionClick: (imageCount?: number) => void;
  onRemoveImage: () => void;
}

const PromptBoxContext = createContext<PromptBoxContextType | undefined>(undefined);

interface PromptBoxProviderProps {
  children: ReactNode;
  selectedFeature: FeatureOptionId;
  prompt: string;
  uploadedImage: string | null;
  onPromptChange: (value: string) => void;
  onActionClick: (imageCount?: number) => void;
  onRemoveImage: () => void;
}

export function PromptBoxProvider({
  children,
  selectedFeature,
  prompt,
  uploadedImage,
  onPromptChange,
  onActionClick,
  onRemoveImage,
}: PromptBoxProviderProps) {
  return (
    <PromptBoxContext.Provider
      value={{
        selectedFeature,
        prompt,
        uploadedImage,
        onPromptChange,
        onActionClick,
        onRemoveImage,
      }}
    >
      {children}
    </PromptBoxContext.Provider>
  );
}

export function usePromptBox() {
  const context = useContext(PromptBoxContext);
  if (context === undefined) {
    throw new Error('usePromptBox must be used within a PromptBoxProvider');
  }
  return context;
}

