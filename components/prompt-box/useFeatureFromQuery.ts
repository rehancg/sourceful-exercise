'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { FeatureOptionId } from '@/lib/constants';
import { PROMPT_BOX_FEATURES } from '@/lib/prompt-box-features';

export function useFeatureFromQuery(defaultFeature?: FeatureOptionId): FeatureOptionId {
  const searchParams = useSearchParams();
  const featureFromQuery = searchParams.get('use-case') as FeatureOptionId | null;
  
  return useMemo(() => {
    // Validate that the feature from query exists in our features list
    if (featureFromQuery && PROMPT_BOX_FEATURES.some(f => f.id === featureFromQuery)) {
      return featureFromQuery;
    }
    return defaultFeature || 'create-image';
  }, [featureFromQuery, defaultFeature]);
}

