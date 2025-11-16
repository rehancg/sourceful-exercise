import type { FeatureOption } from '../types';
import { ProductMockupsIcon, ChevronRightIcon } from '@/components/ui/icons';

export const productMockupsFeature: FeatureOption = {
  id: 'product-mockups',
  label: 'Product mockups',
  placeholder: 'Describe your product mockup...',
  icon: <ProductMockupsIcon />,
  infoMessage: 'Click start your new product mockup, supply your artwork and choose your desired product type.',
  showAddButton: true,
  addButtonTooltip: {
    title: 'Artwork/Logo',
    description: 'Upload your artwork/logo and we\'ll use it in your product mockup.',
    variant: 'text',
    position: 'bottom',
  },
  tooltip: {
    title: 'Product mockups',
    description: 'Generate realistic product mockups for your designs.',
    variant: 'image',
    image: { src: '/images/prompt-packaging-mockups.webp', alt: 'Product Mockups' },
    position: 'bottom',
  },
  actionButton: {
    text: 'Start your newproduct mockup',
    rightIcon: <ChevronRightIcon />,
  },
  isNew: true,
};

