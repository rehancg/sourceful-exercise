import type { FeatureOption } from '../types';
import { BrandMoodboardIcon, ChevronRightIcon } from '@/components/ui/icons';

export const brandMoodboardFeature: FeatureOption = {
  id: 'brand-moodboard',
  label: 'Brand moodb',
  placeholder: 'Describe your brand and style details...',
  icon: <BrandMoodboardIcon />,
  tooltip: {
    title: 'Brand moodboard',
    description: 'Create visual moodboards that capture your brand essence.',
    variant: 'image',
    image: { src: '/images/prompt-brand-moodboard.webp', alt: 'Brand Moodboard' },
    position: 'bottom',
  },
  isNew: true,
  infoMessage: 'Click start moodboard brief to add your brand and style details.',
  showAddButton: true,
  addButtonTooltip: {
    title: 'Reference image',
    description: 'Upload your reference image and we\'ll use it in your moodboard brief.',
    variant: 'text',
    position: 'bottom',
  },
  actionButton: {
    text: 'Start moodboard brief',
    rightIcon: <ChevronRightIcon />,
  },
};

