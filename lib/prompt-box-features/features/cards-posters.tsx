import type { FeatureOption } from '../types';
import { CardsPostersIcon, ChevronRightIcon } from '@/components/ui/icons';

export const cardsPostersFeature: FeatureOption = {
  id: 'cards-posters',
  label: 'Cards & posters',
  placeholder: 'Describe your cards & posters design...',
  icon: <CardsPostersIcon />,
  tooltip: {
    title: 'Cards & posters',
    description: 'Design stunning cards and posters for any occasion.',
    variant: 'image',
    image: { src: '/images/prompt-cards-and-posters.webp', alt: 'Cards & Posters' },
    position: 'bottom',
  },
  showAddButton: true,
  addButtonTooltip: {
    title: 'Add Logo',
    description: 'Upload your logo and we\'ll add it to your generated cards and posters.',
    variant: 'text',
    position: 'bottom',
  },
  actionButton: {
    text: 'Start cards & posters design',
    rightIcon: <ChevronRightIcon />,
  },
  isNew: true,
};

