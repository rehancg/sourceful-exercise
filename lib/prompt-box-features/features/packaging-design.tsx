import type { FeatureOption } from '../types';
import { PackagingDesignIcon, ChevronRightIcon } from '@/components/ui/icons';

export const packagingDesignFeature: FeatureOption = {
  id: 'packaging-design',
  label: 'Packaging design',
  icon: <PackagingDesignIcon />,
  tooltip: {
    title: 'Packaging design',
    description: 'Design packaging that looks ready for the shelf.',
    variant: 'image',
    image: { src: '/images/prompt-packaging-design.webp', alt: 'Prompt Create Image' },
    position: 'bottom',
  },
  placeholder: 'Describe the ideal packaging vision...',
  showAddButton: true,
  actionButton: {
    text: 'Start packaging design',
    rightIcon: <ChevronRightIcon />,
  },
  addButtonTooltip: {
    title: 'Add logo',
    description: 'Upload your logo and we\'ll add it to your generated packaging design.',
    variant: 'text',
    position: 'bottom',
  },
};

