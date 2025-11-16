import type { FeatureOption } from '../types';
import { AiPhotoshootIcon, ChevronRightIcon } from '@/components/ui/icons';

export const aiPhotoshootFeature: FeatureOption = {
  id: 'ai-photoshoot',
  label: 'AI Photoshoot',
  placeholder: 'Describe your specific shot details...',
  icon: <AiPhotoshootIcon />,
  tooltip: {
    title: 'AI Photoshoot',
    description: 'Create professional product photoshoots with AI.',
    variant: 'image',
    image: { src: '/images/prompt-ai-photoshoot.webp', alt: 'AI Photoshoot' },
    position: 'bottom',
  },
  infoMessage: 'Click start photoshoot brief to add your specific shot details.',
  showAddButton: true,
  actionButton: {
    text: 'Start photoshoot brief',
    rightIcon: <ChevronRightIcon />,
  },
  isNew: true,
  addButtonTooltip: {
    title: 'Reference image',
    description: 'Upload your reference image and we\'ll use it in your photoshoot brief.',
    variant: 'text',
    position: 'bottom',
  },
};

