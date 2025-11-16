'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { FeatureOptionId } from '@/lib/constants';
import { PROMPT_BOX_CONFIG } from '@/lib/constants';
import { useFeatureFromQuery } from '../hooks/useFeatureFromQuery';

interface PromptBoxContextType {
  selectedFeature: FeatureOptionId;
  prompt: string;
  uploadedImage: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onPromptChange: (value: string) => void;
  onFeatureSelect: (featureId: FeatureOptionId) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddClick: () => void;
  onRemoveImage: () => void;
  onActionClick: (imageCount?: number) => void;
}

const PromptBoxContext = createContext<PromptBoxContextType | undefined>(undefined);

interface PromptBoxProviderProps {
  children: ReactNode;
  initialPrompt?: string;
  initialFeature?: FeatureOptionId;
}

export function PromptBoxProvider({
  children,
  initialPrompt = '',
  initialFeature = PROMPT_BOX_CONFIG.defaultSelectedFeature,
}: PromptBoxProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
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

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handlePromptChange = (value: string) => {
    setPrompt(value);
  };

  const handleFeatureSelect = (featureId: FeatureOptionId) => {
    setSelectedFeature(featureId);
    const params = new URLSearchParams(window.location.search);
    params.set('use-case', featureId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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

  const handleActionClick = (imageCount?: number) => {
    if (selectedFeature === 'ai-imagery') {
      // Generate a session ID (in a real app, this would come from the backend)
      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      // Store prompt and image count in sessionStorage to pass to the session page
      if (prompt) {
        sessionStorage.setItem(`session-${sessionId}-prompt`, prompt);
      }
      if (imageCount) {
        sessionStorage.setItem(`session-${sessionId}-imageCount`, imageCount.toString());
      }
      router.push(`/dashboard/session/${sessionId}`);
    }
    // Add other feature handlers here
  };

  return (
    <PromptBoxContext.Provider
      value={{
        selectedFeature,
        prompt,
        uploadedImage,
        fileInputRef,
        onPromptChange: handlePromptChange,
        onFeatureSelect: handleFeatureSelect,
        onFileSelect: handleFileSelect,
        onAddClick: handleAddClick,
        onRemoveImage: handleRemoveImage,
        onActionClick: handleActionClick,
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

