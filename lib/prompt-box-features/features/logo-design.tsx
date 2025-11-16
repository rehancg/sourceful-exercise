import type { FeatureOption } from '../types';
import { LogoDesignIcon, ChevronRightIcon } from '@/components/ui/icons';

export const logoDesignFeature: FeatureOption = {
  id: 'logo-design',
  label: 'Logo design',
  icon: <LogoDesignIcon />,
  tooltip: {
    title: 'Logo design',
    description: 'Create a logo that feels right, fast.',
    variant: 'image',
    image: { src: '/images/prompt-logo-design.webp', alt: 'Prompt Create Image' },
    position: 'bottom',
  },
  placeholder: 'Describe your brand, target audience and any details about the logo you want...',
  isNew: true,
  actionButton: {
    text: 'Start logo design',
    rightIcon: <ChevronRightIcon />,
  },
};

