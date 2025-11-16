import type { FeatureOption } from '../types';
import { EditImageIcon } from '@/components/ui/icons';

export const editImageFeature: FeatureOption = {
  id: 'edit-image',
  label: 'Edit image',
  placeholder: 'Describe the image you want to edit...',
  icon: <EditImageIcon />,
  tooltip: {
    title: 'Edit image',
    description: 'Transform and enhance your images with AI-powered editing tools.',
    variant: 'image',
    image: { src: '/images/prompt-edit-image.webp', alt: 'Edit Image' },
    position: 'bottom',
  },
  infoMessage: 'This tool is coming soon! Choose another tool to continue.',
  comingSoon: true,
};

