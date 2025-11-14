export const NAV_LINKS = [
  { href: '#', label: 'Products' },
  { href: '#', label: 'Inspiration' },
  { href: '#', label: 'Blog' },
  { href: '#', label: 'Research' },
  { href: '#', label: 'Pricing' },
] as const;

export type FeatureOptionId = 
  | 'create-image'
  | 'packaging-design'
  | 'logo-design'
  | 'edit-image'
  | 'ai-photoshoot'
  | 'brand-moodboard'
  | 'social-ads'
  | 'product-mockups'
  | 'cards-posters';

export const PROMPT_BOX_CONFIG = {
  defaultSelectedFeature: 'create-image' as FeatureOptionId,
  placeholder: 'Describe what you want to create...',
  showScrollButton: true,
} as const;

