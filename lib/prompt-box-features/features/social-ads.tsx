import type { FeatureOption } from '../types';
import { SocialAdsIcon } from '@/components/ui/icons';

export const socialAdsFeature: FeatureOption = {
  id: 'social-ads',
  label: 'Social ads',
  placeholder: 'Describe your social ad...',
  icon: <SocialAdsIcon />,
  tooltip: {
    title: 'Social ads',
    description: 'Create engaging social media ads that convert.',
    variant: 'image',
    image: { src: '/images/prompt-social-ads.webp', alt: 'Social Ads' },
    position: 'bottom',
  },
  comingSoon: true,
  infoMessage: 'This tool is coming soon! Choose another tool to continue.',
};

