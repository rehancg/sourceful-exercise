import { FeatureOptionId } from '@/lib/constants';
import { AiImagery } from './AiImagery';
import { JSX } from 'react';

export interface FeatureDataProps {
  featureId: FeatureOptionId;
  prompt?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export function FeatureDataDisplay({ featureId, prompt, imageUrl }: FeatureDataProps) {
  const featureDataMap: Record<FeatureOptionId, () => JSX.Element | null> = {
    'ai-imagery': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
    'packaging-design': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
    'logo-design': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
    'edit-image': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
    'ai-photoshoot': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
    'brand-moodboard': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
    'social-ads': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
    'product-mockups': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
    'cards-posters': () => prompt ? <AiImagery prompt={prompt} imageUrl={imageUrl} /> : null,
  };

  const renderData = featureDataMap[featureId];
  
  if (!renderData) {
    return null;
  }

  return renderData();
}
