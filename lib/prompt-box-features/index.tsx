import type { FeatureOption } from './types';
import { aiImageryFeature } from './features/ai-imagery';
import { packagingDesignFeature } from './features/packaging-design';
import { logoDesignFeature } from './features/logo-design';
import { editImageFeature } from './features/edit-image';
import { aiPhotoshootFeature } from './features/ai-photoshoot';
import { brandMoodboardFeature } from './features/brand-moodboard';
import { socialAdsFeature } from './features/social-ads';
import { productMockupsFeature } from './features/product-mockups';
import { cardsPostersFeature } from './features/cards-posters';

// Re-export types
export type { FeatureOption, ActionButtonConfig, TooltipConfig } from './types';

// Export all features as a single array
export const PROMPT_BOX_FEATURES: FeatureOption[] = [
  aiImageryFeature,
  packagingDesignFeature,
  logoDesignFeature,
  editImageFeature,
  aiPhotoshootFeature,
  brandMoodboardFeature,
  socialAdsFeature,
  productMockupsFeature,
  cardsPostersFeature,
] as const;

