import { FeatureOptionId } from '@/lib/constants';
import { AiImageryResult, AiImageryResultItem } from './AiImageryResult';
import { JSX } from 'react';

export interface FeatureResultProps {
  featureId: FeatureOptionId;
  results: unknown[];
}

export function FeatureResultDisplay({ featureId, results }: FeatureResultProps) {
  const featureResultMap: Record<FeatureOptionId, () => JSX.Element | null> = {
    'ai-imagery': () => <AiImageryResult results={results as AiImageryResultItem[]} />,
    'packaging-design': () => null,
    'logo-design': () => null,
    'edit-image': () => null,
    'ai-photoshoot': () => null,
    'brand-moodboard': () => null,
    'social-ads': () => null,
    'product-mockups': () => null,
    'cards-posters': () => null,
  };

  const renderResult = featureResultMap[featureId];
  
  if (!renderResult) {
    return null;
  }

  return renderResult();
}

export type { AiImageryResultItem };

